import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMockRequest, parseResponse } from '@/tests/helpers/api-helpers'

const mockUserFindMany = vi.fn()
const mockUserFindUnique = vi.fn()
const mockUserCreate = vi.fn()
const mockAuth = vi.fn()

vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findMany: (...args: unknown[]) => mockUserFindMany(...args),
      findUnique: (...args: unknown[]) => mockUserFindUnique(...args),
      create: (...args: unknown[]) => mockUserCreate(...args),
    },
  },
}))

vi.mock('@/auth', () => ({
  auth: () => mockAuth(),
}))

import { GET, POST } from './route'

describe('GET /api/users', () => {
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

  it('should return all users when admin', async () => {
    mockUserFindUnique.mockResolvedValue({ isAdmin: true })
    mockUserFindMany.mockResolvedValue([
      { id: '1', username: 'alice', name: 'Alice', email: 'alice@test.com', isGuest: false, createdAt: new Date() },
      { id: '2', username: 'bob', name: 'Bob', email: 'bob@test.com', isGuest: false, createdAt: new Date() },
    ])

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(2)
    expect(mockUserFindUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      select: { isAdmin: true },
    })
  })

  it('should return scoped users when not admin', async () => {
    mockUserFindUnique.mockResolvedValue({ isAdmin: false })
    mockUserFindMany.mockResolvedValue([
      { id: 'user-1', username: 'self', name: 'Self', email: 'self@test.com', isGuest: false, createdAt: new Date() },
    ])

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(1)
  })

  it('should return 500 on database error', async () => {
    mockUserFindUnique.mockRejectedValue(new Error('DB error'))

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to fetch users')
  })
})

describe('POST /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
    mockUserFindUnique.mockResolvedValue({ isAdmin: true })
  })

  it('should return 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)
    const request = createMockRequest('POST', { name: 'Alice' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(401)
  })

  it('should return 403 when not admin', async () => {
    mockUserFindUnique.mockResolvedValue({ isAdmin: false })
    const request = createMockRequest('POST', { name: 'Alice' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(403)
    expect(result.data.error).toBe('Forbidden: Admin access required')
  })

  it('should create a guest user with name', async () => {
    mockUserCreate.mockResolvedValue({
      id: '2',
      username: 'guest_abc123',
      name: 'Guest Player',
      email: null,
      isGuest: true,
    })
    const request = createMockRequest('POST', { name: 'Guest Player' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data.name).toBe('Guest Player')
    expect(result.data.isGuest).toBe(true)
    expect(mockUserCreate).toHaveBeenCalled()
  })

  it('should create a guest user with email', async () => {
    mockUserCreate.mockResolvedValue({
      id: '2',
      username: 'guest_abc123',
      name: 'Alice',
      email: 'alice@test.com',
      isGuest: true,
    })
    const request = createMockRequest('POST', { name: 'Alice', email: 'alice@test.com' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data.email).toBe('alice@test.com')
  })

  it('should return 400 when name is missing', async () => {
    const request = createMockRequest('POST', { email: 'test@test.com' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
    expect(result.data.error).toBe('Name is required')
    expect(mockUserCreate).not.toHaveBeenCalled()
  })

  it('should return 400 when name is empty string', async () => {
    const request = createMockRequest('POST', { name: '' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
    expect(result.data.error).toBe('Name is required')
  })

  it('should return 500 on database error', async () => {
    mockUserCreate.mockRejectedValue(new Error('Unique constraint'))
    const request = createMockRequest('POST', { name: 'Alice', email: 'alice@test.com' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to create user')
  })
})
