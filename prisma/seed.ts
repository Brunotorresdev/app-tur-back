import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'


const prisma = new PrismaClient()

async function seedMainDatabase() {
  // Super Admin user
  const adminEmail = process.env.EMAIL_ADMIN
  const adminPassword = process.env.PASSWORD_ADMIN

  if (!adminEmail || !adminPassword) {
    throw new Error('EMAIL_ADMIN e PASSWORD_ADMIN precisam estar definidos no .env')
  }

  const existingUser = await prisma.users.findUnique({
    where: { email: adminEmail },
  })

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    await prisma.users.create({
      data: {
        full_name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'super-admin',
        is_active: true,
      },
    })

    console.log('Usuário super admin criado com sucesso!')
  } else {
    console.log('Usuário super admin já existe ou role super admin não encontrada.')
  }

  console.log('Seed concluído com sucesso!')
}

async function main() {
  await seedMainDatabase()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
