import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMockRequest, parseResponse } from '@/tests/helpers/api-helpers'

const mockGroupFindMany = vi.fn()
const mockGroupCreate = vi.fn()
const mockAuth = vi.fn()

vi.mock('@/lib/db', () => ({
  prisma: {
    group: {
      findMany: (...args: unknown[]) => mockGroupFindMany(...args),
      create: (...args: unknown[]) => mockGroupCreate(...args),
    },
  },
}))

vi.mock('@/auth', () => ({
  auth: () => mockAuth(),
}))

import { GET, POST } from './route'

describe('GET /api/groups', () => {
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

  it('should return all groups for the user', async () => {
    mockGroupFindMany.mockResolvedValue([
      { id: '1', name: 'Weekly Game Night' },
      { id: '2', name: 'Family Games' },
    ])

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(2)
    expect(result.data[0].name).toBe('Weekly Game Night')
    expect(mockGroupFindMany).toHaveBeenCalledWith({
      where: { members: { some: { userId: 'user-1' } } },
    })
  })

  it('should return empty array when user has no groups', async () => {
    mockGroupFindMany.mockResolvedValue([])

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toEqual([])
  })

  it('should return 500 on database error', async () => {
    mockGroupFindMany.mockRejectedValue(new Error('DB error'))

    const response = await GET()
    const result = await parseResponse(response)

    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to fetch groups')
  })
})

describe('POST /api/groups', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should return 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)
    const request = createMockRequest('POST', { name: 'Test Group' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(401)
  })

  it('should create a group with creator as admin', async () => {
    mockGroupCreate.mockResolvedValue({
      id: '1',
      name: 'Test Group',
      members: [
        { id: 'm1', userId: 'user-1', role: 'ADMIN', user: { id: 'user-1', name: 'Creator' } },
      ],
    })
    const request = createMockRequest('POST', { name: 'Test Group' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data.name).toBe('Test Group')
    expect(result.data.members[0].role).toBe('ADMIN')
    expect(mockGroupCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: 'Test Group',
          members: expect.objectContaining({
            create: expect.arrayContaining([
              { userId: 'user-1', role: 'ADMIN' },
            ]),
          }),
        }),
      })
    )
  })

  it('should create a group with additional members', async () => {
    mockGroupCreate.mockResolvedValue({
      id: '1',
      name: 'Game Night',
      members: [
        { id: 'm1', userId: 'user-1', role: 'ADMIN', user: { id: 'user-1', name: 'Creator' } },
        { id: 'm2', userId: 'user-2', role: 'MEMBER', user: { id: 'user-2', name: 'Alice' } },
      ],
    })
    const request = createMockRequest('POST', { name: 'Game Night', memberIds: ['user-2'] })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data.members).toHaveLength(2)
  })

  it('should deduplicate creator from memberIds', async () => {
    mockGroupCreate.mockResolvedValue({ id: '1', name: 'Group', members: [] })
    const request = createMockRequest('POST', { name: 'Group', memberIds: ['user-1', 'user-2'] })

    await POST(request)

    const createCall = mockGroupCreate.mock.calls[0][0]
    const memberCreates = createCall.data.members.create
    const adminEntries = memberCreates.filter((m: { role: string }) => m.role === 'ADMIN')
    expect(adminEntries).toHaveLength(1)
  })

  it('should return 400 when name is missing', async () => {
    const request = createMockRequest('POST', {})

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
    expect(result.data.error).toBe('Name is required')
    expect(mockGroupCreate).not.toHaveBeenCalled()
  })

  it('should return 400 when name is empty string', async () => {
    const request = createMockRequest('POST', { name: '' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
    expect(result.data.error).toBe('Name is required')
  })

  it('should return 500 on database error', async () => {
    mockGroupCreate.mockRejectedValue(new Error('DB error'))
    const request = createMockRequest('POST', { name: 'Test' })

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to create group')
  })
})
