import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMockRequest, parseResponse } from '@/tests/helpers/api-helpers'

const mockSessionCreate = vi.fn()
const mockSessionFindMany = vi.fn()
const mockSessionPlayerFindMany = vi.fn()
const mockGroupMemberCount = vi.fn()
const mockUserFindUnique = vi.fn()
const mockAuth = vi.fn()

vi.mock('@/lib/db', () => ({
  prisma: {
    session: {
      create: (...args: unknown[]) => mockSessionCreate(...args),
      findMany: (...args: unknown[]) => mockSessionFindMany(...args),
    },
    sessionPlayer: {
      findMany: (...args: unknown[]) => mockSessionPlayerFindMany(...args),
    },
    groupMember: {
      count: (...args: unknown[]) => mockGroupMemberCount(...args),
    },
    user: {
      findUnique: (...args: unknown[]) => mockUserFindUnique(...args),
    },
  },
}))

vi.mock('@/auth', () => ({
  auth: () => mockAuth(),
}))

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

import { GET, POST } from './route'

function setupAchievementMocks() {
  mockSessionPlayerFindMany.mockResolvedValue([])
  mockGroupMemberCount.mockResolvedValue(1)
  mockUserFindUnique.mockResolvedValue({ seenAchievements: null })
}

describe('POST /api/sessions', () => {
  const validPayload = {
    gameId: 'game-1',
    groupId: 'group-1',
    playedAt: '2024-06-15T10:00:00.000Z',
    players: [
      { userId: 'user-1', rawScore: 100, placement: 1, pointsAwarded: 2 },
      { userId: 'user-2', rawScore: 75, placement: 2, pointsAwarded: 1 },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
    setupAchievementMocks()
  })

  it('should return 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)
    const request = createMockRequest('POST', validPayload)

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(401)
    expect(result.data.error).toBe('Unauthorized')
  })

  it('should create a session with player scores', async () => {
    mockSessionCreate.mockResolvedValue({
      id: 'session-1',
      gameId: 'game-1',
      groupId: 'group-1',
      playedAt: '2024-06-15T10:00:00.000Z',
      players: [
        { id: 'sp-1', userId: 'user-1', rawScore: 100, placement: 1, pointsAwarded: 2, user: { id: 'user-1', name: 'Alice' } },
        { id: 'sp-2', userId: 'user-2', rawScore: 75, placement: 2, pointsAwarded: 1, user: { id: 'user-2', name: 'Bob' } },
      ],
      game: { id: 'game-1', name: 'Catan' },
    })
    const request = createMockRequest('POST', validPayload)

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data.id).toBe('session-1')
    expect(result.data.players).toHaveLength(2)
    expect(result.data.game.name).toBe('Catan')
  })

  it('should convert scoreDetails object to JSON string', async () => {
    mockSessionCreate.mockResolvedValue({ id: 'session-1', players: [], game: {} })
    const payload = {
      ...validPayload,
      players: [{
        userId: 'user-1',
        rawScore: 100,
        placement: 1,
        pointsAwarded: 2,
        scoreDetails: { coins: 50, cities: 25 },
      }],
    }
    const request = createMockRequest('POST', payload)

    await POST(request)

    const createCall = mockSessionCreate.mock.calls[0][0]
    const playerCreate = createCall.data.players.create[0]
    expect(playerCreate.scoreDetails).toBe(JSON.stringify({ coins: 50, cities: 25 }))
  })

  it('should pass string scoreDetails as-is', async () => {
    mockSessionCreate.mockResolvedValue({ id: 'session-1', players: [], game: {} })
    const payload = {
      ...validPayload,
      players: [{
        userId: 'user-1',
        rawScore: 100,
        placement: 1,
        pointsAwarded: 2,
        scoreDetails: '{"coins":50}',
      }],
    }
    const request = createMockRequest('POST', payload)

    await POST(request)

    const createCall = mockSessionCreate.mock.calls[0][0]
    const playerCreate = createCall.data.players.create[0]
    expect(playerCreate.scoreDetails).toBe('{"coins":50}')
  })

  it('should create session with optional templateId', async () => {
    mockSessionCreate.mockResolvedValue({ id: 'session-1', templateId: 'tmpl-1', players: [], game: {} })
    const payload = { ...validPayload, templateId: 'tmpl-1' }
    const request = createMockRequest('POST', payload)

    await POST(request)

    const createCall = mockSessionCreate.mock.calls[0][0]
    expect(createCall.data.templateId).toBe('tmpl-1')
  })

  it('should return 500 on database error', async () => {
    mockSessionCreate.mockRejectedValue(new Error('Foreign key constraint'))
    const request = createMockRequest('POST', validPayload)

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to create session')
  })
})

describe('GET /api/sessions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
    setupAchievementMocks()
  })

  it('should return 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)
    const request = new Request('http://localhost:3000/api/sessions')

    const response = await GET(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(401)
  })

  it('should return all sessions when no filter', async () => {
    mockSessionFindMany.mockResolvedValue([
      { id: 's1', gameId: 'game-1', game: { name: 'Catan' }, players: [] },
      { id: 's2', gameId: 'game-1', game: { name: 'Catan' }, players: [] },
    ])
    const request = new Request('http://localhost:3000/api/sessions')

    const response = await GET(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(2)
    expect(mockSessionFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: {} })
    )
  })

  it('should filter sessions by groupId', async () => {
    mockSessionFindMany.mockResolvedValue([
      { id: 's1', groupId: 'group-1', game: { name: 'Catan' }, players: [] },
    ])
    const request = new Request('http://localhost:3000/api/sessions?groupId=group-1')

    const response = await GET(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(1)
    expect(mockSessionFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { groupId: 'group-1' } })
    )
  })

  it('should order sessions by playedAt descending', async () => {
    mockSessionFindMany.mockResolvedValue([])
    const request = new Request('http://localhost:3000/api/sessions')

    await GET(request)

    expect(mockSessionFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { playedAt: 'desc' } })
    )
  })

  it('should return 500 on database error', async () => {
    mockSessionFindMany.mockRejectedValue(new Error('DB error'))
    const request = new Request('http://localhost:3000/api/sessions')

    const response = await GET(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to fetch sessions')
  })
})
