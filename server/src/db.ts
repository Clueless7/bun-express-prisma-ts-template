import { PrismaClient } from '@prisma/client'
import pc from 'picocolors'

export const prisma = new PrismaClient()

prisma
  .$connect()
  .then(() => {
    console.log(pc.green(`Prisma connected`))
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
