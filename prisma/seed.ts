import 'dotenv/config'
import { PrismaClient } from '../lib/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create a default user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  })

  // Create a group
  const group = await prisma.group.create({
    data: {
      name: 'Board Game Night',
      members: {
        create: {
          userId: user.id,
          role: 'ADMIN',
        },
      },
    },
  })

  // Create Games
  const sevenWonders = await prisma.game.create({
    data: {
      name: '7 Wonders',
      templates: {
        create: {
          name: 'Base Game',
          fields: JSON.stringify([
            { key: 'military', label: 'Military', type: 'number' },
            { key: 'treasury', label: 'Treasury', type: 'number' },
            { key: 'wonders', label: 'Wonders', type: 'number' },
            { key: 'civilian', label: 'Civilian', type: 'number' },
            { key: 'scientific', label: 'Scientific', type: 'number' },
            { key: 'commercial', label: 'Commercial', type: 'number' },
            { key: 'guilds', label: 'Guilds', type: 'number' },
          ]),
        },
      },
    },
  })

  const arnak = await prisma.game.create({
    data: {
      name: 'Lost Ruins of Arnak',
      templates: {
        create: {
          name: 'Base Game',
          fields: JSON.stringify([
             { key: 'research', label: 'Research', type: 'number' },
             { key: 'temple', label: 'Temple', type: 'number' },
             { key: 'idols', label: 'Idols', type: 'number' },
             { key: 'guardians', label: 'Guardians', type: 'number' },
             { key: 'items', label: 'Items/Artifacts', type: 'number' },
          ])
        }
      }
    },
  })

  console.log({ user, group, sevenWonders, arnak })
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
