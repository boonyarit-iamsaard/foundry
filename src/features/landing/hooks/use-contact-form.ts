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
          // TODO: log error
          console.error(
            'Failed to send message: ',
            JSON.stringify(error, null, 2),
          );
          // Keep the user's input so they can retry; never wipe a failed send.
          toast.error("Couldn't send your message", {
            description:
              'Your text is still here — try again, or email boonyarit.iamsaard@gmail.com directly.',
          });
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
