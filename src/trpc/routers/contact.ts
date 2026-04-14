import { TRPCError } from '@trpc/server';

import { env } from '@/core/configs/env.config';
import { createMailer } from '@/features/emails';
import { renderSendMessageTemplate } from '@/features/emails/templates/send-message';
import { sendMessageSchema } from '@/features/landing/validators/send-message';

import { createTRPCRouter, publicProcedure } from '../init';

export const contactRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(sendMessageSchema)
    .mutation(async ({ input }) => {
      const { email, message, name } = input;

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
          message: 'Message sent successfully',
          success: true,
        };
      } catch (error) {
        console.error(
          'Failed to send message: ',
          JSON.stringify(error, null, 2),
        );

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send message',
        });
      }
    }),
});
