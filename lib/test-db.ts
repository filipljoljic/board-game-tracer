import { PrismaClient } from '@/lib/prisma'

// Test database configuration
const DATABASE_URL = process.env.DATABASE_URL || 'file:./prisma/test.db'

// Create a singleton instance for tests
const globalForPrisma = globalThis as unknown as {
  prismaTest: PrismaClient | undefined
}

export const prismaTest =
  globalForPrisma.prismaTest ??
  new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaTest = prismaTest
}

// Enable foreign key constraints for SQLite
// This is critical for data integrity in tests
prismaTest.$executeRawUnsafe('PRAGMA foreign_keys = ON')

export default prismaTest

