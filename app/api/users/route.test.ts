import { describe, it, expect, beforeEach, vi } from 'vitest'
import { resetDatabase, createTestUser } from '@/tests/helpers/db-helpers'
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

describe('GET /api/users', () => {
  beforeEach(async () => {
    // Additional setup if needed
  })
  
  it('should return all users ordered by name', async () => {
    // Arrange: Create test users
    await createTestUser({ name: 'Charlie', email: 'charlie@test.com' })
    await createTestUser({ name: 'Alice', email: 'alice@test.com' })
    await createTestUser({ name: 'Bob', email: 'bob@test.com' })
    
    // Act
    const response = await GET()
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toBeInstanceOf(Array)
    expect(result.data).toHaveLength(3)
    // Check alphabetical order
    expect(result.data[0].name).toBe('Alice')
    expect(result.data[1].name).toBe('Bob')
    expect(result.data[2].name).toBe('Charlie')
  })
  
  it('should return empty array when no users exist', async () => {
    // Note: resetDatabase is called in beforeEach, so database should be empty
    
    // Act
    const response = await GET()
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toBeInstanceOf(Array)
    expect(result.data).toHaveLength(0)
  })
  
  it('should include user properties', async () => {
    // Arrange
    await createTestUser({ name: 'Alice', email: 'alice@test.com', isGuest: false })
    
    // Act
    const response = await GET()
    const result = await parseResponse(response)
    
    // Assert
    expect(result.data[0]).toHaveProperty('id')
    expect(result.data[0]).toHaveProperty('name')
    expect(result.data[0]).toHaveProperty('email')
    expect(result.data[0]).toHaveProperty('isGuest')
  })
})

describe('POST /api/users', () => {
  beforeEach(async () => {
    // Additional setup if needed
  })
  
  it('should create a user with name and email', async () => {
    // Arrange
    const request = createMockRequest('POST', {
      name: 'Alice',
      email: 'alice@test.com'
    })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toHaveProperty('id')
    expect(result.data.name).toBe('Alice')
    expect(result.data.email).toBe('alice@test.com')
    
    // Verify in database
    const user = await prismaTest.user.findFirst({
      where: { email: 'alice@test.com' }
    })
    expect(user).toBeDefined()
    expect(user?.name).toBe('Alice')
  })
  
  it('should create a user without email (guest)', async () => {
    // Arrange
    const request = createMockRequest('POST', { name: 'Guest Player' })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data.name).toBe('Guest Player')
    expect(result.data.email).toBeNull()
  })
  
  it('should return 400 when name is missing', async () => {
    // Arrange
    const request = createMockRequest('POST', { email: 'test@test.com' })
    
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
  
  it('should handle duplicate email gracefully', async () => {
    // Arrange: Create user with email
    await createTestUser({ name: 'Alice', email: 'alice@test.com' })
    
    const request = createMockRequest('POST', {
      name: 'Alice 2',
      email: 'alice@test.com'
    })
    
    // Act
    const response = await POST(request)
    const result = await parseResponse(response)
    
    // Assert: Should fail due to unique constraint
    expect(result.status).toBe(500)
    expect(result.data.error).toBe('Failed to create user')
  })
})

