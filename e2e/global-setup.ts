import { execSync } from 'child_process'
import { existsSync, unlinkSync } from 'fs'
import { PrismaClient } from '../lib/prisma'

async function globalSetup() {
  console.log('Setting up E2E test database...')

  // Set the E2E test database URL
  const testDbPath = './prisma/test-e2e.db'
  process.env.DATABASE_URL = `file:${testDbPath}`

  // Remove existing test database if it exists
  if (existsSync(testDbPath)) {
    console.log('Removing existing test database...')
    unlinkSync(testDbPath)
  }

  // Run migrations to create database schema
  console.log('Running database migrations...')
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: `file:${testDbPath}` },
    stdio: 'inherit',
  })

  // Seed test data
  console.log('Seeding test database...')
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${testDbPath}`,
      },
    },
  })

  try {
    // Clear existing data first
    await prisma.sessionPlayer.deleteMany({})
    await prisma.session.deleteMany({})
    await prisma.groupMember.deleteMany({})
    await prisma.group.deleteMany({})
    await prisma.customScoreTemplate.deleteMany({})
    await prisma.game.deleteMany({})
    await prisma.user.deleteMany({})

    console.log('Existing data cleared')

    // Create test users
    const user1 = await prisma.user.create({
      data: { 
        username: 'testuser1',
        name: 'Test User 1', 
        email: 'test1@example.com',
        passwordHash: 'TEST_PLACEHOLDER_HASH',
        isGuest: true
      },
    })

    const user2 = await prisma.user.create({
      data: { 
        username: 'testuser2',
        name: 'Test User 2', 
        email: 'test2@example.com',
        passwordHash: 'TEST_PLACEHOLDER_HASH',
        isGuest: true
      },
    })

    const user3 = await prisma.user.create({
      data: { 
        username: 'testuser3',
        name: 'Test User 3', 
        email: 'test3@example.com',
        passwordHash: 'TEST_PLACEHOLDER_HASH',
        isGuest: true
      },
    })

    // Create test groups
    const group1 = await prisma.group.create({
      data: {
        name: 'Game Night Crew',
        members: {
          create: [
            { userId: user1.id, role: 'ADMIN' },
            { userId: user2.id, role: 'MEMBER' },
            { userId: user3.id, role: 'MEMBER' },
          ],
        },
      },
    })

    await prisma.group.create({
      data: {
        name: 'Weekend Warriors',
        members: {
          create: [
            { userId: user1.id, role: 'ADMIN' },
            { userId: user2.id, role: 'MEMBER' },
          ],
        },
      },
    })

    // Create test games
    const game1 = await prisma.game.create({
      data: {
        name: 'Catan',
        templates: {
          create: {
            name: 'Base Game',
            fields: JSON.stringify([
              { key: 'settlements', label: 'Settlements', type: 'number' },
              { key: 'cities', label: 'Cities', type: 'number' },
              { key: 'longest', label: 'Longest Road', type: 'number' },
              { key: 'largest', label: 'Largest Army', type: 'number' },
            ]),
          },
        },
      },
    })

    await prisma.game.create({
      data: {
        name: 'Ticket to Ride',
        templates: {
          create: {
            name: 'Base Game',
            fields: JSON.stringify([
              { key: 'routes', label: 'Routes', type: 'number' },
              { key: 'stations', label: 'Stations', type: 'number' },
              { key: 'longest', label: 'Longest Route', type: 'number' },
            ]),
          },
        },
      },
    })

    await prisma.game.create({
      data: {
        name: 'Wingspan',
      },
    })

    // Create a test session with some history
    const template1 = await prisma.customScoreTemplate.findFirst({
      where: { gameId: game1.id },
    })

    if (template1) {
      await prisma.session.create({
        data: {
          gameId: game1.id,
          templateId: template1.id,
          groupId: group1.id,
          playedAt: new Date(),
          players: {
            create: [
              {
                userId: user1.id,
                rawScore: 10,
                placement: 1,
                pointsAwarded: 4,
                scoreDetails: JSON.stringify({
                  settlements: 2,
                  cities: 4,
                  longest: 2,
                  largest: 2,
                }),
              },
              {
                userId: user2.id,
                rawScore: 8,
                placement: 2,
                pointsAwarded: 3,
                scoreDetails: JSON.stringify({
                  settlements: 3,
                  cities: 2,
                  longest: 0,
                  largest: 2,
                }),
              },
              {
                userId: user3.id,
                rawScore: 6,
                placement: 3,
                pointsAwarded: 2,
                scoreDetails: JSON.stringify({
                  settlements: 4,
                  cities: 1,
                  longest: 0,
                  largest: 0,
                }),
              },
            ],
          },
        },
      })
    }

    console.log('Test database seeded successfully!')
    console.log(`- ${3} users created`)
    console.log(`- ${2} groups created`)
    console.log(`- ${3} games created`)
    console.log(`- ${1} session created`)
  } catch (error) {
    console.error('Error seeding test database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }

  console.log('E2E test database setup complete!')
}

export default globalSetup
