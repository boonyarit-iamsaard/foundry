import { z } from 'zod';

export const loginSchema = z.object({
  emailAddress: z.email('Please enter a valid email'),
  password: z.string().min(1, 'Please enter your password'),
});

export const verificationCodeSchema = z.object({
  code: z.string().min(1, 'Please enter the verification code'),
});
