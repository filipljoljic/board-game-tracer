import { describe, it, expect, beforeEach, vi } from 'vitest'
import { resetDatabase, createTestGroup } from '@/tests/helpers/db-helpers'
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

// Reset database before each test in this file
beforeEach(async () => {
  await resetDatabase()
})

describe('GET /api/groups', () => {
  beforeEach(async () => {
    // Additional setup if needed
  })
  
  it('should return all groups', async () => {
    // Arrange: Create test groups
    await createTestGroup({ name: 'Weekly Game Night' })
    await createTestGroup({ name: 'Family Games' })
    
    // Act
    const response = await GET()
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toBeInstanceOf(Array)
    expect(result.data).toHaveLength(2)
    expect(result.data[0]).toHaveProperty('name')
    expect(result.data[0]).toHaveProperty('id')
  })
  
  it('should return empty array when no groups exist', async () => {
    // Act
    const response = await GET()
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toEqual([])
  })
})

describe('POST /api/groups', () => {
  beforeEach(async () => {
    // Additional setup if needed
  })
  
  it('should create a group with valid name', async () => {
    // Arrange
    const request = createMockRequest('POST', { name: 'Test Group' })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toHaveProperty('id')
    expect(result.data.name).toBe('Test Group')
    
    // Verify in database
    const group = await prismaTest.group.findFirst({
      where: { name: 'Test Group' }
    })
    expect(group).toBeDefined()
    expect(group?.name).toBe('Test Group')
  })
  
  it('should return 400 when name is missing', async () => {
    // Arrange
    const request = createMockRequest('POST', {})
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(400)
    expect(result.data.error).toBe('Name is required')
  })
  
  it('should return 400 when name is empty string', async () => {
    // Arrange
    const request = createMockRequest('POST', { name: '' })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(400)
    expect(result.data.error).toBe('Name is required')
  })
  
  it('should handle long group names', async () => {
    // Arrange
    const longName = 'A'.repeat(100)
    const request = createMockRequest('POST', { name: longName })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data.name).toBe(longName)
  })
})

