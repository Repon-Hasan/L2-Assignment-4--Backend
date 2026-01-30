import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'

//const connectionString = `${process.env.DATABASE_URL}`
const connectionString = "postgresql://postgres:65641853@localhost:5432/assignment4?schema=public"

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }