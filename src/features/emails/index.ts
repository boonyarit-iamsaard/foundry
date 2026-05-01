import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { z } from 'zod';

import { env } from '@/core/configs/env.config';

export type SendOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

const resendConfigSchema = z.string().trim().min(1);

const smtpConfigSchema = z.object({
  host: z.string().trim().min(1),
  port: z.number(),
  user: z.string().trim().min(1),
  pass: z.string().trim().min(1),
});

type SmtpConfig = z.infer<typeof smtpConfigSchema>;

function createResendMailer(apiKey: string) {
  const resend = new Resend(apiKey);

  async function send({ from, to, subject, html }: SendOptions) {
    return await resend.emails.send({ from, to, subject, html });
  }

  return { send };
}

function createSmtpMailer({ host, pass, port, user }: SmtpConfig) {
  const transporter = nodemailer.createTransport({
    host,
    secure: env.NODE_ENV === 'production',
    port,
    auth: {
      user,
      pass,
    },
  });

  async function send({ from, to, subject, html }: SendOptions) {
    return await transporter.sendMail({ from, to, subject, html });
  }

  return { send };
}

export function createMailer() {
  const parsedResendConfig = resendConfigSchema.safeParse(env.RESEND_API_KEY);
  if (parsedResendConfig.success) {
    return createResendMailer(parsedResendConfig.data);
  }

  const { MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USER } = env;
  const parsedSmtpConfig = smtpConfigSchema.safeParse({
    host: MAIL_HOST,
    port: MAIL_PORT,
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  });
  if (!parsedSmtpConfig.success) {
    throw new Error(
      'Email delivery is not configured. Set RESEND_API_KEY or configure MAIL_HOST, MAIL_PORT, MAIL_USER, and MAIL_PASSWORD.',
    );
  }

  return createSmtpMailer(parsedSmtpConfig.data);
}
