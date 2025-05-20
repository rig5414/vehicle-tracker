import { PrismaClient } from "@prisma/client"

// Prevent multiple instances of Prisma Client in development
declare global {
  var prismaInstance: PrismaClient | undefined
}

// Create a new PrismaClient instance or use the existing one
export const prisma =
  global.prismaInstance ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

// In development, attach PrismaClient to the global object to prevent multiple instances
if (process.env.NODE_ENV !== "production") {
  global.prismaInstance = prisma
}

export default prisma
