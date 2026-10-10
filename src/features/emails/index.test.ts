import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createMailer } from '@/features/emails';

const { resendSend } = vi.hoisted(() => ({ resendSend: vi.fn() }));

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: resendSend };
  },
}));

vi.mock('@/core/configs/env.config', () => ({
  env: { RESEND_API_KEY: 're_test_key' },
}));

const message = {
  from: 'boonyarit.me <hello@example.com>',
  to: ['me@example.com'],
  replyTo: 'visitor@example.com',
  subject: 'Message from Visitor',
  html: '<p>Hello</p>',
};

describe('createMailer with Resend', () => {
  beforeEach(() => {
    resendSend.mockReset();
  });

  it('rejects when Resend returns an error', async () => {
    resendSend.mockResolvedValue({
      data: null,
      error: { name: 'validation_error', message: 'Invalid `from` field.' },
    });

    await expect(createMailer().send(message)).rejects.toThrow(
      'Invalid `from` field.',
    );
  });

  it('passes the reply-to address through to Resend', async () => {
    resendSend.mockResolvedValue({ data: { id: 'email_1' }, error: null });

    await createMailer().send(message);

    expect(resendSend).toHaveBeenCalledWith(
      expect.objectContaining({ replyTo: 'visitor@example.com' }),
    );
  });
});
