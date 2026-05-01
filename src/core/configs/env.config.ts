import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const requiredEnvString = z.string().trim().min(1);
const emailRecipients = z
  .string()
  .min(1)
  .transform((value) => value.split(',').map((address) => address.trim()))
  .pipe(z.array(z.email()).min(1));

export const env = createEnv({
  server: {
    ADMIN_CLERK_USER_IDS: z.string().optional(),
    CLERK_SECRET_KEY: z.string().min(1),

    MAIL_FROM_ADDRESS: z.string().min(1),
    MAIL_FROM_NAME: z.string().min(1),
    MAIL_HOST: z.string().optional(),
    MAIL_PASSWORD: z.string().optional(),
    MAIL_PORT: z.coerce.number().optional(),
    MAIL_TO_ADDRESS: emailRecipients,
    MAIL_USER: z.string().optional(),

    RESEND_API_KEY: z.string().optional(),

    NODE_ENV: z.string().min(1),
    VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    ADMIN_CLERK_USER_IDS: process.env.ADMIN_CLERK_USER_IDS,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_TO_ADDRESS: process.env.MAIL_TO_ADDRESS,
    MAIL_USER: process.env.MAIL_USER,

    RESEND_API_KEY: process.env.RESEND_API_KEY,

    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});

if (env.VERCEL_ENV === 'preview' || env.VERCEL_ENV === 'production') {
  if (!requiredEnvString.safeParse(env.RESEND_API_KEY).success) {
    throw new Error(
      'RESEND_API_KEY is required when VERCEL_ENV is preview or production.',
    );
  }
}
