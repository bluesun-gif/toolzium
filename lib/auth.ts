import { env } from "@/lib/env";
import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      try {
        const { sendPasswordResetEmail } = await import("@/lib/email");
        // Extract token from URL
        const token = url.split("token=")[1] || url;
        await sendPasswordResetEmail(user.email, token);
      } catch {
        logger.warn(
          { url, email: user.email },
          "Password reset email not sent (email not configured). Reset URL:"
        );
        console.log(`\n🔐 Password Reset Link: ${url}\n`);
      }
    },
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      try {
        const { sendVerificationEmail } = await import("@/lib/email");
        // Extract token from URL
        const token = url.split("token=")[1] || url;
        await sendVerificationEmail(user.email, token);
      } catch {
        logger.warn(
          { url, email: user.email },
          "Verification email not sent (email not configured). Verification URL:"
        );
        console.log(`\n📧 Verification Link: ${url}\n`);
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || env.auth.google.clientId || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || env.auth.google.clientSecret || "",
      enabled: true,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || env.auth.secret || "any2l-dev-secret-change-in-production-32chars-minimum-ok",
  baseURL: process.env.BETTER_AUTH_URL || "https://toolzium.com",
  trustedOrigins: ["https://toolzium.com", "http://localhost:3000"],
});
