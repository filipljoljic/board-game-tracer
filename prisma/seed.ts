import 'dotenv/config'
import { PrismaClient } from '../lib/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Ensure default user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: { email: 'test@example.com', name: 'Test User' },
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
  const newMembers = ['Bake', 'Amar', 'Mirza', 'Filip']
  
  for (const name of newMembers) {
    // Create user if not exists (using name as email-like identifier since email is unique but nullable? No, email is optional)
    // Actually, schema says email is optional unique. We can just use name.
    // But to avoid duplicates on re-seed, we need a unique identifier. 
    // Let's check if a user with this name exists, if not create.
    // Note: This is simple seeding logic. In prod, use emails.
    
    let user = await prisma.user.findFirst({ where: { name } })
    if (!user) {
      user = await prisma.user.create({ data: { name } })
    }

    // Add to group if not already member
    const membership = await prisma.groupMember.findFirst({
      where: { groupId: group.id, userId: user.id }
    })
    
    if (!membership) {
      await prisma.groupMember.create({
        data: { groupId: group.id, userId: user.id, role: 'MEMBER' }
      })
      console.log(`Added ${name} to group`)
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
