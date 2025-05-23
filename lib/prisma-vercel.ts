/**
 * This file contains a workaround for Prisma Client initialization on Vercel.
 * It ensures that Prisma Client is properly generated and initialized before use.
 */

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
