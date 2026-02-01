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

export const userService = {
  updateCurrentUser: async (id: string, payload: any) => {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  },
};
