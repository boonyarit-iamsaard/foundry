'use server';

import { actionClient } from '@/core/safe-action';

import { submitContactMessage } from '../contact-intake';
import { sendMessageSchema } from '../validators/send-message';

export const sendMessageAction = actionClient
  .schema(sendMessageSchema)
  .action(async ({ parsedInput }) => submitContactMessage(parsedInput));
