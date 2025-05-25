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
        plateNumber: "KAA 123A",
        confidence: 0.98,
        timestamp: new Date(2023, 10, 15, 14, 30),
        location: "Nairobi, Moi Avenue",
        latitude: -1.286389,
        longitude: 36.817223,
        videoId: video.id,
      },
      {
        plateNumber: "KBC 456B",
        confidence: 0.95,
        timestamp: new Date(2023, 10, 14, 9, 15),
        location: "Mombasa, Moi Avenue",
        latitude: -4.043477,
        longitude: 39.668206,
        videoId: video.id,
      },
      {
        plateNumber: "KDA 789C",
        confidence: 0.92,
        timestamp: new Date(2023, 10, 12, 17, 45),
        location: "Kisumu, Main Market",
        latitude: -0.091702,
        longitude: 34.768016,
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
