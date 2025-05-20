import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database setup...")

  // Create a test admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: "$2a$10$GmQDEZBXCXbxuWBGxkK5S.6Zz4rWzWkZCQKvzZgDQgJiZZDQUUqIe", // hashed 'password123'
      role: "ADMIN",
    },
  })

  // Create a test regular user
  const regularUser = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Regular User",
      password: "$2a$10$GmQDEZBXCXbxuWBGxkK5S.6Zz4rWzWkZCQKvzZgDQgJiZZDQUUqIe", // hashed 'password123'
      role: "USER",
    },
  })

  // Create a sample video
  const video = await prisma.video.upsert({
    where: { id: "clm1234567890" },
    update: {},
    create: {
      id: "clm1234567890",
      title: "Sample Traffic Footage",
      description: "Sample video for testing purposes",
      filePath: "/videos/sample.mp4",
      status: "COMPLETED",
      userId: adminUser.id,
      location: "Main St & 5th Ave",
    },
  })

  // Create some sample plate sightings
  await prisma.plateSighting.createMany({
    skipDuplicates: true,
    data: [
      {
        plateNumber: "ABC123",
        confidence: 0.98,
        timestamp: new Date(2023, 10, 15, 14, 30),
        location: "Main St & 5th Ave",
        latitude: 40.7128,
        longitude: -74.006,
        videoId: video.id,
      },
      {
        plateNumber: "XYZ789",
        confidence: 0.95,
        timestamp: new Date(2023, 10, 14, 9, 15),
        location: "Park Rd & Oak St",
        latitude: 40.7328,
        longitude: -73.986,
        videoId: video.id,
      },
      {
        plateNumber: "DEF456",
        confidence: 0.92,
        timestamp: new Date(2023, 10, 12, 17, 45),
        location: "River Blvd & Pine Ave",
        latitude: 40.7228,
        longitude: -74.026,
        videoId: video.id,
      },
    ],
  })

  console.log("Database setup completed successfully!")
}

main()
  .catch((e) => {
    console.error("Error during database setup:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
