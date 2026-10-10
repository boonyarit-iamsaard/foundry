import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { toast } from 'sonner';

import { sendMessageAction } from '../actions/send-message-action';
import { sendMessageSchema } from '../validators/send-message';

export function useContactForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    sendMessageAction,
    zodResolver(sendMessageSchema),
    {
      actionProps: {
        onSuccess: () => {
          toast('Your message has been sent.');
          form.reset();
        },
        onError: (error) => {
          console.error('Failed to send message:', error);
          toast.error('Failed to send message.');
          form.reset();
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
  };
}
