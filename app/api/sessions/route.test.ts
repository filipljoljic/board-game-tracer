import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  resetDatabase,
  createTestUser,
  createTestGroup,
  createTestGame,
  createTestSession,
} from '@/tests/helpers/db-helpers'
import { createMockRequest, parseResponse } from '@/tests/helpers/api-helpers'
import { prismaTest } from '@/lib/test-db'

// Mock the prisma client to use test database
vi.mock('@/lib/db', async () => {
  const { prismaTest } = await import('@/lib/test-db')
  return {
    prisma: prismaTest,
  }
})

import { GET, POST } from './route'

describe('POST /api/sessions', () => {
  let gameId: string
  let groupId: string
  let user1Id: string
  let user2Id: string
  
  beforeEach(async () => {
    await resetDatabase()
    
    // Setup test data
    const game = await createTestGame({ name: 'Test Game' })
    const group = await createTestGroup({ name: 'Test Group' })
    const user1 = await createTestUser({ name: 'Alice' })
    const user2 = await createTestUser({ name: 'Bob' })
    
    gameId = game.id
    groupId = group.id
    user1Id = user1.id
    user2Id = user2.id
  })
  
  it('should create a session with player scores', async () => {
    // Arrange
    const request = createMockRequest('POST', {
      gameId,
      groupId,
      playedAt: new Date().toISOString(),
      players: [
        { userId: user1Id, rawScore: 100, placement: 1, pointsAwarded: 2 },
        { userId: user2Id, rawScore: 75, placement: 2, pointsAwarded: 1 },
      ],
    })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toHaveProperty('id')
    expect(result.data.gameId).toBe(gameId)
    expect(result.data.groupId).toBe(groupId)
    expect(result.data.players).toHaveLength(2)
    
    // Verify in database
    const session = await prismaTest.session.findFirst({
      where: { id: result.data.id },
      include: { players: true },
    })
    expect(session).toBeDefined()
    expect(session?.players).toHaveLength(2)
  })
  
  it('should handle scoreDetails as object and convert to JSON', async () => {
    // Arrange
    const request = createMockRequest('POST', {
      gameId,
      groupId,
      playedAt: new Date().toISOString(),
      players: [
        {
          userId: user1Id,
          rawScore: 100,
          placement: 1,
          pointsAwarded: 2,
          scoreDetails: { coins: 50, cities: 25 },
        },
      ],
    })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    
    // Verify scoreDetails was stored
    const player = await prismaTest.sessionPlayer.findFirst({
      where: { userId: user1Id },
    })
    expect(player?.scoreDetails).toBeDefined()
    const details = JSON.parse(player!.scoreDetails!)
    expect(details.coins).toBe(50)
    expect(details.cities).toBe(25)
  })
  
  it('should create session with template ID', async () => {
    // Arrange: Create a template
    const template = await prismaTest.customScoreTemplate.create({
      data: {
        gameId,
        name: 'Base Game',
        fields: JSON.stringify([{ key: 'coins', label: 'Coins' }]),
      },
    })
    
    const request = createMockRequest('POST', {
      gameId,
      groupId,
      templateId: template.id,
      playedAt: new Date().toISOString(),
      players: [
        { userId: user1Id, rawScore: 100, placement: 1, pointsAwarded: 1 },
      ],
    })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data.templateId).toBe(template.id)
  })
  
  it('should return 500 when required fields are missing', async () => {
    // Arrange: Missing gameId
    const request = createMockRequest('POST', {
      groupId,
      playedAt: new Date().toISOString(),
      players: [],
    })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to create session')
  })
})

describe('GET /api/sessions', () => {
  let gameId: string
  let group1Id: string
  let group2Id: string
  let userId: string
  
  beforeEach(async () => {
    await resetDatabase()
    
    // Setup test data
    const game = await createTestGame({ name: 'Test Game' })
    const group1 = await createTestGroup({ name: 'Group 1' })
    const group2 = await createTestGroup({ name: 'Group 2' })
    const user = await createTestUser({ name: 'Alice' })
    
    gameId = game.id
    group1Id = group1.id
    group2Id = group2.id
    userId = user.id
    
    // Create sessions for different groups
    await createTestSession({
      gameId,
      groupId: group1Id,
      playedAt: new Date('2024-01-01'),
      players: [
        { userId, rawScore: 100, placement: 1, pointsAwarded: 1 },
      ],
    })
    
    await createTestSession({
      gameId,
      groupId: group2Id,
      playedAt: new Date('2024-01-02'),
      players: [
        { userId, rawScore: 75, placement: 1, pointsAwarded: 1 },
      ],
    })
  })
  
  it('should return all sessions when no filter is provided', async () => {
    // Arrange
    const request = new Request('http://localhost:3000/api/sessions')
    
    // Act
    const response = await GET(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(2)
  })
  
  it('should filter sessions by groupId', async () => {
    // Arrange
    const request = new Request(`http://localhost:3000/api/sessions?groupId=${group1Id}`)
    
    // Act
    const response = await GET(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(1)
    expect(result.data[0].groupId).toBe(group1Id)
  })
  
  it('should order sessions by playedAt descending', async () => {
    // Arrange
    const request = new Request('http://localhost:3000/api/sessions')
    
    // Act
    const response = await GET(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    // Most recent first (2024-01-02 before 2024-01-01)
    const dates = result.data.map((s: any) => new Date(s.playedAt).getTime())
    expect(dates[0]).toBeGreaterThan(dates[1])
  })
  
  it('should include game and player details', async () => {
    // Arrange
    const request = new Request('http://localhost:3000/api/sessions')
    
    // Act
    const response = await GET(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data[0]).toHaveProperty('game')
    expect(result.data[0]).toHaveProperty('players')
    expect(result.data[0].players[0]).toHaveProperty('user')
  })
})

