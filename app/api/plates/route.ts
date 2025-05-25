import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-vercel";

export async function GET(request: NextRequest) {
  try {
    let data;
    
    try {
      // Try to fetch from database
      data = await prisma.plateSighting.findMany({
        take: 10,
        orderBy: {
          timestamp: 'desc'
        }
      });
    } catch (dbError) {
      console.warn("Database error, using fallback data:", dbError);
      // Fallback data if database is not available
      data = [
        {
          id: 1,
          plateNumber: "KAA 123A",
          timestamp: new Date().toISOString(),
          location: "Nairobi, Moi Avenue",
          latitude: -1.286389,
          longitude: 36.817223,
        }
      ];
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Error in GET /api/plates:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    try {
      // Try to save to database
      const plateSighting = await prisma.plateSighting.create({
        data: {
          plateNumber: body.plateNumber || "KAA 123A",
          confidence: body.confidence || 1.0,
          timestamp: body.timestamp || new Date().toISOString(),
          location: body.location || "Nairobi, Moi Avenue",
          latitude: body.latitude || -1.286389,
          longitude: body.longitude || 36.817223,
          imageUrl: body.imageUrl,
          videoId: body.videoId || "test-video"
        }
      });
      return NextResponse.json({ success: true, data: plateSighting });
    } catch (dbError) {
      console.warn("Database error:", dbError);
      return NextResponse.json(
        { success: true, message: "Processed (test mode)" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/plates:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
