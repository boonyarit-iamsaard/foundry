import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendMessageAction } from './send-message-action';

const { mailerSend } = vi.hoisted(() => ({ mailerSend: vi.fn() }));

vi.mock('@/features/emails', () => ({
  createMailer: () => ({ send: mailerSend }),
}));

vi.mock('@/features/emails/templates/send-message', () => ({
  renderSendMessageTemplate: async () => '<p>Hello</p>',
}));

vi.mock('@/core/configs/env.config', () => ({
  env: {
    MAIL_FROM_NAME: 'boonyarit.me',
    MAIL_FROM_ADDRESS: 'hello@example.com',
    MAIL_TO_ADDRESS: ['me@example.com'],
  },
}));

const input = {
  name: 'Visitor',
  email: 'visitor@example.com',
  message: 'Hello there, I would like to talk about a project.',
};

describe('sendMessageAction', () => {
  beforeEach(() => {
    mailerSend.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('reports a failure when the mailer fails', async () => {
    mailerSend.mockRejectedValue(new Error('Invalid `from` field.'));

    const result = await sendMessageAction(input);

    expect(result.data).toBeUndefined();
    expect(result.serverError).toBe('Failed to send message');
  });

  it('logs the underlying error, not an empty object', async () => {
    mailerSend.mockRejectedValue(new Error('Invalid `from` field.'));

    await sendMessageAction(input);

    expect(console.error).toHaveBeenCalledWith(
      'Failed to send message:',
      expect.objectContaining({ message: 'Invalid `from` field.' }),
    );
  });

  it('sends from the site name and replies to the visitor', async () => {
    mailerSend.mockResolvedValue(undefined);

    const result = await sendMessageAction(input);

    expect(result.data?.success).toBe(true);
    expect(mailerSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'boonyarit.me <hello@example.com>',
        replyTo: 'visitor@example.com',
      }),
    );
  });
});
