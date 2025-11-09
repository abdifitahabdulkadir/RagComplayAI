import { emailOTPClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  basePath: "/api/auth",
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [nextCookies(), emailOTPClient()],
});
