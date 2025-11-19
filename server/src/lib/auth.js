import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";

const authConfig = {
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  basePath: "/api/auth",
  trustedOrigins: ["http://localhost:3000", "http://localhost:3005"],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
};

console.log("[auth config] trustedOrigins:", authConfig.trustedOrigins);

export const auth = betterAuth(authConfig);
