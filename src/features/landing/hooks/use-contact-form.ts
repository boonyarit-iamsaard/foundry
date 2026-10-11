import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { toast } from 'sonner';

import { sendMessageAction } from '../actions/send-message-action';
import { sendMessageSchema } from '../validators/send-message';

export function useContactForm() {
  const { action, form, handleSubmitWithAction } = useHookFormAction(
    sendMessageAction,
    zodResolver(sendMessageSchema),
    {
      actionProps: {
        onSuccess: () => {
          toast('Message sent. I’ll reply to the email you gave.');
          form.reset();
        },
        onError: (error) => {
          console.error('Failed to send message:', error);
          // Keep what they wrote so a retry costs nothing.
          toast.error(
            'Your message didn’t send. Try again, or email me directly.',
          );
        },
      },
      formProps: {
        defaultValues: {
          name: '',
          email: '',
          message: '',
        },
      },
    },
  );

  return {
    form,
    handleSubmitWithAction,
    isSending: action.isExecuting,
  };
}
