import { PrismaClient } from '@prisma/client';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

const prismaClientSingleton = () => new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 
           process.env.POSTGRES_PRISMA_URL ||
           process.env.VERCEL_POSTGRES_PRISMA_URL
    },
  },
});

const prisma = prismaGlobal.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma;
}

export default prisma;
