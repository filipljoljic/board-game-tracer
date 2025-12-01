import 'dotenv/config'
import { PrismaClient } from '../lib/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Ensure default user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: { 
      username: 'testuser',
      email: 'test@example.com', 
      name: 'Test User',
      passwordHash: 'SEED_PLACEHOLDER_HASH',
      isGuest: true
    },
  })

  // 2. Ensure group exists (idempotent find)
  let group = await prisma.group.findFirst({ where: { name: 'Board Game Night' } })
  if (!group) {
    group = await prisma.group.create({
      data: {
        name: 'Board Game Night',
        members: {
          create: { userId: testUser.id, role: 'ADMIN' },
        },
      },
    })
  }

  // 3. Add new members
  const newMembers = [
    { name: 'Bake', username: 'bake' },
    { name: 'Amar', username: 'amar' },
    { name: 'Mirza', username: 'mirza' },
    { name: 'Filip', username: 'filip' }
  ]
  
  for (const member of newMembers) {
    // Check if a user with this username exists, if not create
    let user = await prisma.user.findFirst({ where: { username: member.username } })
    if (!user) {
      user = await prisma.user.create({ 
        data: { 
          username: member.username,
          name: member.name,
          passwordHash: 'SEED_PLACEHOLDER_HASH',
          isGuest: true
        } 
      })
    }

    // Add to group if not already member
    const membership = await prisma.groupMember.findFirst({
      where: { groupId: group.id, userId: user.id }
    })
    
    if (!membership) {
      await prisma.groupMember.create({
        data: { groupId: group.id, userId: user.id, role: 'MEMBER' }
      })
      console.log(`Added ${member.name} to group`)
    }
  }

  // 4. Ensure Games (Upsert logic roughly)
  // Since games don't have unique names in schema, we check by name
  const games = [
    {
      name: '7 Wonders',
      template: {
        name: 'Base Game',
        fields: [
          { key: 'military', label: 'Military', type: 'number' },
          { key: 'treasury', label: 'Treasury', type: 'number' },
          { key: 'wonders', label: 'Wonders', type: 'number' },
          { key: 'civilian', label: 'Civilian', type: 'number' },
          { key: 'scientific', label: 'Scientific', type: 'number' },
          { key: 'commercial', label: 'Commercial', type: 'number' },
          { key: 'guilds', label: 'Guilds', type: 'number' },
        ]
      }
    },
    {
      name: 'Lost Ruins of Arnak',
      template: {
        name: 'Base Game',
        fields: [
           { key: 'research', label: 'Research', type: 'number' },
           { key: 'temple', label: 'Temple', type: 'number' },
           { key: 'idols', label: 'Idols', type: 'number' },
           { key: 'guardians', label: 'Guardians', type: 'number' },
           { key: 'items', label: 'Items/Artifacts', type: 'number' },
        ]
      }
    }
  ]

  for (const g of games) {
    const existingGame = await prisma.game.findFirst({ where: { name: g.name } })
    if (!existingGame) {
      await prisma.game.create({
        data: {
          name: g.name,
          templates: {
            create: {
              name: g.template.name,
              fields: JSON.stringify(g.template.fields)
            }
          }
        }
      })
      console.log(`Created game ${g.name}`)
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
