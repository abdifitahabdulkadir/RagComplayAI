import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { sendVerificationOTPEmail } from "./actions/send.action";
import { prisma } from "./prisma";
export const auth = betterAuth({
  basePath: "/api/auth",
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    },
  },
  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    nextCookies(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ otp, email, type }) {
        if (type === "forget-password") {
          await sendVerificationOTPEmail({
            to: email,
            otp,
          });
        }
      },
    }),
  ],
});
