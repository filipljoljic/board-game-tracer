import { vi } from 'vitest'

export function createMockPrismaModel() {
  return {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  }
}

export function createMockPrisma() {
  return {
    game: createMockPrismaModel(),
    user: createMockPrismaModel(),
    group: createMockPrismaModel(),
    session: createMockPrismaModel(),
    sessionPlayer: createMockPrismaModel(),
    groupMember: createMockPrismaModel(),
    customScoreTemplate: createMockPrismaModel(),
    $executeRawUnsafe: vi.fn(),
    $transaction: vi.fn(),
  }
}

export const mockPrisma = createMockPrisma()
