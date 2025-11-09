import { emailOTPClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/api/auth",
  plugins: [nextCookies(), emailOTPClient()],
});
