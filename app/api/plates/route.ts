import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma-vercel"
import { z } from "zod"

// Schema for plate sighting creation
const createPlateSightingSchema = z.object({
  plateNumber: z.string().min(2),
  confidence: z.number().min(0).max(1),
  timestamp: z.string().datetime(),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  imageUrl: z.string().url().optional(),
  videoId: z.string(),
})

// Schema for plate sighting update
const updatePlateSightingSchema = z.object({
  plateNumber: z.string().min(2).optional(),
  confidence: z.number().min(0).max(1).optional(),
  timestamp: z.string().datetime().optional(),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  imageUrl: z.string().url().optional(),
  videoId: z.string().optional(),
})

// GET /api/plates - Get all plate sightings with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const plateNumber = searchParams.get("plateNumber")
    const location = searchParams.get("location")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Build filter conditions
    const where: any = {}

    if (plateNumber) {
      where.plateNumber = {
        contains: plateNumber,
        mode: "insensitive",
      }
    }

    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive",
      }
    }

    if (startDate || endDate) {
      where.timestamp = {}

      if (startDate) {
        where.timestamp.gte = new Date(startDate)
      }

      if (endDate) {
        where.timestamp.lte = new Date(endDate)
      }
    }

    // Get total count for pagination
    const total = await prisma.plateSighting.count({ where })

    // Get plate sightings with pagination
    const plateSightings = await prisma.plateSighting.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        timestamp: "desc",
      },
    })

    return NextResponse.json({ plateSightings, total })
  } catch (error) {
    console.error("Error in GET /api/plates:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST /api/plates - Create a new plate sighting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = createPlateSightingSchema.parse(body)

    // Create plate sighting
    const plateSighting = await prisma.plateSighting.create({
      data: {
        plateNumber: validatedData.plateNumber,
        confidence: validatedData.confidence,
        timestamp: new Date(validatedData.timestamp),
        location: validatedData.location,
        latitude: validatedData.latitude,
        longitude: validatedData.longitude,
        imageUrl: validatedData.imageUrl,
        videoId: validatedData.videoId,
      },
    })

    return NextResponse.json(plateSighting, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/plates:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
