import { prismaTest } from '@/lib/test-db'
import type { User, Group, Game } from '@/lib/prisma'

/**
 * Reset the entire test database by deleting all records
 */
export async function resetDatabase() {
  // Delete in correct order to respect foreign key constraints
  // Must delete child records before parent records
  try {
    // Delete SessionPlayer first (has FK to Session and User)
    await prismaTest.sessionPlayer.deleteMany({})
    
    // Delete Session (has FK to Game, Group, and CustomScoreTemplate)
    await prismaTest.session.deleteMany({})
    
    // Delete CustomScoreTemplate (has FK to Game)
    await prismaTest.customScoreTemplate.deleteMany({})
    
    // Delete GroupMember (has FK to Group and User)
    await prismaTest.groupMember.deleteMany({})
    
    // Now safe to delete parent tables
    await prismaTest.game.deleteMany({})
    await prismaTest.group.deleteMany({})
    await prismaTest.user.deleteMany({})
  } catch (error) {
    console.error('Error resetting database:', error)
    throw error
  }
}

/**
 * Seed basic test data (optional - only call when needed)
 */
export async function seedTestData() {
  // Create test users
  const alice = await createTestUser({ name: 'Alice', email: 'alice@test.com', username: 'alice' })
  const bob = await createTestUser({ name: 'Bob', email: 'bob@test.com', username: 'bob' })
  const charlie = await createTestUser({ name: 'Charlie', email: 'charlie@test.com', username: 'charlie' })
  
  // Create test group
  const group = await createTestGroup({ name: 'Test Group' })
  
  // Create test game
  const game = await createTestGame({ name: 'Test Game' })
  
  return { alice, bob, charlie, group, game }
}

/**
 * Factory: Create a test user
 */
export async function createTestUser(data: Partial<User> & { username?: string } = {}) {
  const timestamp = Date.now()
  return await prismaTest.user.create({
    data: {
      username: data.username || `testuser_${timestamp}`,
      name: data.name || 'Test User',
      email: data.email || `test-${timestamp}@example.com`,
      passwordHash: 'TEST_PLACEHOLDER_HASH',
      isGuest: data.isGuest || false,
    },
  })
}

/**
 * Factory: Create a test group
 */
export async function createTestGroup(data: Partial<Group> = {}) {
  return await prismaTest.group.create({
    data: {
      name: data.name || 'Test Group',
    },
  })
}

/**
 * Factory: Create a test game
 */
export async function createTestGame(data: Partial<Game> = {}) {
  return await prismaTest.game.create({
    data: {
      name: data.name || 'Test Game',
    },
  })
}

/**
 * Factory: Add a user to a group
 */
export async function addUserToGroup(userId: string, groupId: string, role: string = 'MEMBER') {
  return await prismaTest.groupMember.create({
    data: {
      userId,
      groupId,
      role,
    },
  })
}

/**
 * Factory: Create a test session
 */
export async function createTestSession(data: {
  gameId: string
  groupId: string
  templateId?: string
  playedAt?: Date
  players: Array<{
    userId: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string
  }>
}) {
  return await prismaTest.session.create({
    data: {
      gameId: data.gameId,
      groupId: data.groupId,
      templateId: data.templateId,
      playedAt: data.playedAt || new Date(),
      players: {
        create: data.players,
      },
    },
    include: {
      players: true,
    },
  })
}

/**
 * Factory: Create a custom score template
 */
export async function createTestTemplate(data: {
  gameId: string
  name: string
  fields: string
}) {
  return await prismaTest.customScoreTemplate.create({
    data: {
      gameId: data.gameId,
      name: data.name,
      fields: data.fields,
    },
  })
}

/**
 * Run a function within a transaction that rolls back
 */
export async function withTransaction<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await prismaTest.$transaction(async () => {
      const result = await fn()
      // Force rollback by throwing
      throw new Error('ROLLBACK')
    })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'ROLLBACK') {
      return {} as T // Return empty result on intentional rollback
    }
    throw error
  }
}
