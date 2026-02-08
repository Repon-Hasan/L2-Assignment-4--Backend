import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../../generated/prisma/client";


//const connectionString = `${process.env.DATABASE_URL}`
const connectionString = "postgresql://postgres:65641853@localhost:5432/assignment4?schema=public"

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

declare global {
  // Prevent multiple Prisma instances in dev / serverless
  var prisma: PrismaClient | undefined;
}

// export const prisma =
//   global.prisma ||
//   new PrismaClient({
//     adapter,
//     log: ["error"],
//   });

export { prisma }