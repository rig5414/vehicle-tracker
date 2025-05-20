import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seed...")

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

  console.log(`Created admin user: ${adminUser.name}`)

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

  console.log(`Created regular user: ${regularUser.name}`)

  console.log("Database seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("Error during database seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
