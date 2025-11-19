import { createAuthClient } from "better-auth/react";

const BASE = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3005";

export const authClient = createAuthClient({
  baseURL: BASE,
});
