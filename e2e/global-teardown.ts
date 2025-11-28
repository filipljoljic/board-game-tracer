import { existsSync, unlinkSync } from 'fs'

async function globalTeardown() {
  console.log('Cleaning up E2E test database...')

  const testDbPath = './prisma/test-e2e.db'

  // Optionally remove test database after tests complete
  // Comment out if you want to inspect the database after tests
  if (existsSync(testDbPath)) {
    try {
      unlinkSync(testDbPath)
      console.log('Test database removed successfully')
    } catch (error) {
      console.error('Error removing test database:', error)
    }
  }

  console.log('E2E test cleanup complete!')
}

export default globalTeardown


