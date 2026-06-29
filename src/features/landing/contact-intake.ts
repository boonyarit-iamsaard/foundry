import { env } from '@/core/configs/env.config';
import { createMailer } from '@/features/emails';
import { renderSendMessageTemplate } from '@/features/emails/templates/send-message';

import type { SendMessageInput } from './validators/send-message';

export async function submitContactMessage({
  email,
  message,
  name,
}: SendMessageInput) {
  const mailer = createMailer();
  const html = await renderSendMessageTemplate({ email, name, message });

  try {
    await mailer.send({
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
}
