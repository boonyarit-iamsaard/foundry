import { z } from 'zod';

export const sendMessageSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z
    .string()
    .min(1, 'Please enter your email')
    .email('Please enter a valid email'),
  message: z.string().min(1, 'Please enter a message'),
});
