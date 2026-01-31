// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { prisma } from "./prisma";
// import { hashPassword, verifyPassword } from "./password";
// // If your Prisma file is located elsewhere, you can change the path

// export const auth = betterAuth({
//     database: prismaAdapter(prisma, {
//         provider: "postgresql", // or "mysql", "postgresql", ...etc
//     }),
//     trustedOrigins:["http://localhost:3000"],
//       emailAndPassword: { 
//     enabled: true, 
//   }, password: {
//       hash: hashPassword,
//       verify: verifyPassword,
//     },
//     user: {
//     additionalFields: {
//       role: true, // ✅ tell the adapter that role can be set
//     },
//       cookies: {
//     secure: false,      
//     sameSite: "lax",     
//   },
//   },
// });

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./password";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: ["http://localhost:3000"], // your frontend
  emailAndPassword: { enabled: true },
  password: {
    hash: hashPassword,
    verify: verifyPassword,
  },
  user: {
    additionalFields: {
      role: true,
    },
  },
  cookies: {
    secure: false, // must be false for localhost HTTP
    sameSite: "lax", // allow browser to send cookies
  },
});
