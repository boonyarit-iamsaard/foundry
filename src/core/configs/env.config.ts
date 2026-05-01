import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const requiredEnvString = z.string().trim().min(1);

export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
    RESEND_API_KEY: z.string().optional(),
    MAIL_HOST: z.string().optional(),
    MAIL_PORT: z.coerce.number().optional(),
    MAIL_USER: z.string().optional(),
    MAIL_PASSWORD: z.string().optional(),
    MAIL_FROM_NAME: z.string().min(1),
    MAIL_FROM_ADDRESS: z.string().min(1),
    MAIL_TO_ADDRESS: z.string().min(1),
  },
  client: {
    //
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_TO_ADDRESS: process.env.MAIL_TO_ADDRESS,
  },
});

if (env.VERCEL_ENV === 'preview' || env.VERCEL_ENV === 'production') {
  if (!requiredEnvString.safeParse(env.RESEND_API_KEY).success) {
    throw new Error(
      'RESEND_API_KEY is required when VERCEL_ENV is preview or production.',
    );
  }
}
