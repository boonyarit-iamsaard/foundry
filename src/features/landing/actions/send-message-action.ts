'use server';

import { env } from '@/core/configs/env.config';
import { actionClient } from '@/core/safe-action';
import { createMailer } from '@/features/emails';
import { renderSendMessageTemplate } from '@/features/emails/templates/send-message';

import { sendMessageSchema } from '../validators/send-message';

export const sendMessageAction = actionClient
  .inputSchema(sendMessageSchema)
  .action(async ({ parsedInput }) => {
    const { name, email, message } = parsedInput;

    const mailer = createMailer();
    const html = await renderSendMessageTemplate({ email, name, message });
    try {
      await mailer.send({
        // TODO: reconsider from email format
        from: env.MAIL_FROM_ADDRESS,
        to: env.MAIL_TO_ADDRESS,
        subject: `Message from ${name}`,
        html,
      });

      return {
        success: true,
        message: 'Message sent successfully',
      };
    } catch (error) {
      // TODO: log error
      console.error('Failed to send message: ', JSON.stringify(error, null, 2));

      throw new Error('Failed to send message');
    }
  });
