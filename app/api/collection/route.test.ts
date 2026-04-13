import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMockRequest, parseResponse } from '@/tests/helpers/api-helpers'

const mockCollectionFindMany = vi.fn()
const mockCollectionUpsert = vi.fn()
const mockCollectionDeleteMany = vi.fn()
const mockAuth = vi.fn()

vi.mock('@/lib/db', () => ({
  prisma: {
    gameCollection: {
      findMany: (...args: unknown[]) => mockCollectionFindMany(...args),
      upsert: (...args: unknown[]) => mockCollectionUpsert(...args),
      deleteMany: (...args: unknown[]) => mockCollectionDeleteMany(...args),
    },
  },
}))

vi.mock('@/auth', () => ({
  auth: () => mockAuth(),
}))

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

import { GET, PUT } from './route'

describe('GET /api/collection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should return 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)
    const response = await GET()
    const result = await parseResponse(response)
    expect(result.status).toBe(401)
  })

  it('should return user collection', async () => {
    mockCollectionFindMany.mockResolvedValue([
      { gameId: 'g1', status: 'OWNED' },
      { gameId: 'g2', status: 'WISHLIST' },
    ])
    const response = await GET()
    const result = await parseResponse(response)
    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(2)
    expect(mockCollectionFindMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      select: { gameId: true, status: true },
    })
  })

  it('should return empty array when user has no collection', async () => {
    mockCollectionFindMany.mockResolvedValue([])
    const response = await GET()
    const result = await parseResponse(response)
    expect(result.data).toEqual([])
  })

  it('should return 500 on database error', async () => {
    mockCollectionFindMany.mockRejectedValue(new Error('DB error'))
    const response = await GET()
    const result = await parseResponse(response)
    expect(result.status).toBe(500)
  })
})

describe('PUT /api/collection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should return 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)
    const request = createMockRequest('PUT', { gameId: 'g1', status: 'OWNED' })
    const response = await PUT(request)
    const result = await parseResponse(response)
    expect(result.status).toBe(401)
  })

  it('should return 400 when gameId is missing', async () => {
    const request = createMockRequest('PUT', { status: 'OWNED' })
    const response = await PUT(request)
    const result = await parseResponse(response)
    expect(result.status).toBe(400)
  })

  it('should return 400 for invalid status', async () => {
    const request = createMockRequest('PUT', { gameId: 'g1', status: 'INVALID' })
    const response = await PUT(request)
    const result = await parseResponse(response)
    expect(result.status).toBe(400)
  })

  it('should upsert collection entry for OWNED status', async () => {
    mockCollectionUpsert.mockResolvedValue({})
    const request = createMockRequest('PUT', { gameId: 'g1', status: 'OWNED' })
    const response = await PUT(request)
    const result = await parseResponse(response)
    expect(result.status).toBe(200)
    expect(mockCollectionUpsert).toHaveBeenCalledWith({
      where: { userId_gameId: { userId: 'user-1', gameId: 'g1' } },
      update: { status: 'OWNED' },
      create: { userId: 'user-1', gameId: 'g1', status: 'OWNED' },
    })
  })

  it('should accept WISHLIST status', async () => {
    mockCollectionUpsert.mockResolvedValue({})
    const request = createMockRequest('PUT', { gameId: 'g1', status: 'WISHLIST' })
    const response = await PUT(request)
    const result = await parseResponse(response)
    expect(result.status).toBe(200)
  })

  it('should accept WANT_TO_PLAY status', async () => {
    mockCollectionUpsert.mockResolvedValue({})
    const request = createMockRequest('PUT', { gameId: 'g1', status: 'WANT_TO_PLAY' })
    const response = await PUT(request)
    const result = await parseResponse(response)
    expect(result.status).toBe(200)
  })

  it('should remove entry when status is null', async () => {
    mockCollectionDeleteMany.mockResolvedValue({})
    const request = createMockRequest('PUT', { gameId: 'g1', status: null })
    const response = await PUT(request)
    const result = await parseResponse(response)
    expect(result.status).toBe(200)
    expect(mockCollectionDeleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', gameId: 'g1' },
    })
    expect(mockCollectionUpsert).not.toHaveBeenCalled()
  })

  it('should return 500 on database error', async () => {
    mockCollectionUpsert.mockRejectedValue(new Error('DB error'))
    const request = createMockRequest('PUT', { gameId: 'g1', status: 'OWNED' })
    const response = await PUT(request)
    const result = await parseResponse(response)
    expect(result.status).toBe(500)
  })
})
