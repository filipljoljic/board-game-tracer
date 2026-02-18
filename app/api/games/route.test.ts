import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMockRequest, parseResponse } from '@/tests/helpers/api-helpers'

const mockGameFindMany = vi.fn()
const mockGameCreate = vi.fn()
const mockAuth = vi.fn()

vi.mock('@/lib/db', () => ({
  prisma: {
    game: {
      findMany: (...args: unknown[]) => mockGameFindMany(...args),
      create: (...args: unknown[]) => mockGameCreate(...args),
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

describe('GET /api/games', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should return 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(401)
    expect(result.data.error).toBe('Unauthorized')
  })

  it('should return all games with session counts', async () => {
    mockGameFindMany.mockResolvedValue([
      { id: '1', name: 'Catan', _count: { sessions: 5 } },
      { id: '2', name: 'Ticket to Ride', _count: { sessions: 3 } },
    ])

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(2)
    expect(result.data[0].name).toBe('Catan')
    expect(result.data[0]._count.sessions).toBe(5)
  })

  it('should return empty array when no games exist', async () => {
    mockGameFindMany.mockResolvedValue([])

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toEqual([])
  })

  it('should return 500 on database error', async () => {
    mockGameFindMany.mockRejectedValue(new Error('DB connection failed'))

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to fetch games')
  })
})

describe('POST /api/games', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should return 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)
    const request = createMockRequest('POST', { name: 'Catan' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(401)
  })

  it('should create a game with valid name', async () => {
    mockGameCreate.mockResolvedValue({ id: '1', name: 'Catan' })
    const request = createMockRequest('POST', { name: 'Catan' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data.id).toBe('1')
    expect(result.data.name).toBe('Catan')
    expect(mockGameCreate).toHaveBeenCalledWith({ data: { name: 'Catan' } })
  })

  it('should return 400 when name is missing', async () => {
    const request = createMockRequest('POST', {})

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
    expect(result.data.error).toBe('Name is required')
    expect(mockGameCreate).not.toHaveBeenCalled()
  })

  it('should return 400 when name is empty string', async () => {
    const request = createMockRequest('POST', { name: '' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
    expect(result.data.error).toBe('Name is required')
  })

  it('should return 500 on database error', async () => {
    mockGameCreate.mockRejectedValue(new Error('Unique constraint failed'))
    const request = createMockRequest('POST', { name: 'Catan' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to create game')
  })
})
