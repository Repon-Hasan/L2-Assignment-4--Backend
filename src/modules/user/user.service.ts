// backend/src/services/user.service.ts

import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";


export async function getCurrentUser(headers: Record<string, string | string[] | undefined>) {
  // 1️⃣ Get session from Better Auth
  const session = await auth.api.getSession({ headers });

  if (!session) {
    return null; // no session
  }

  // 2️⃣ Fetch full user from Prisma
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  return user;
}
