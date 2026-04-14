import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useTRPC } from '@/trpc/client';
import { sendMessageSchema } from '../validators/send-message';

export function useContactForm() {
  const trpc = useTRPC();

  const form = useForm({
    defaultValues: {
      email: '',
      message: '',
      name: '',
    },
    resolver: zodResolver(sendMessageSchema),
  });

  const sendMessageMutation = useMutation(
    trpc.contact.sendMessage.mutationOptions({
      onError: (error) => {
        console.error(
          'Failed to send message: ',
          JSON.stringify(error, null, 2),
        );
        toast.error('Failed to send message.');
        form.reset();
      },
      onSuccess: () => {
        toast('Your message has been sent.');
        form.reset();
      },
    }),
  );

  const handleSubmit = form.handleSubmit(async (values) => {
    await sendMessageMutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isPending: sendMessageMutation.isPending,
  };
}
