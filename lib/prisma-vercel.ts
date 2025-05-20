/**
 * This file contains a workaround for Prisma Client initialization on Vercel.
 * It ensures that Prisma Client is properly generated and initialized before use.
 */

import { PrismaClient } from "@prisma/client"

// Check if we're running on Vercel
const isVercel = process.env.VERCEL === "1"

// Create a new PrismaClient instance with appropriate logging
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })
}

// Define the global type for PrismaClient
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// Use the existing PrismaClient instance if it exists, otherwise create a new one
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// In development, attach PrismaClient to the global object to prevent multiple instances
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma
}

// If running on Vercel, force a connection test to ensure Prisma Client is properly initialized
if (isVercel) {
  // This will trigger Prisma Client initialization
  prisma
    .$connect()
    .then(() => {
      console.log("Prisma Client successfully connected")
    })
    .catch((e) => {
      console.error("Failed to connect to database:", e)
    })
}

export default prisma
