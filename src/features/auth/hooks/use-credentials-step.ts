'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type {
  SignInFutureResource,
  SignInSecondFactor,
} from '@clerk/nextjs/types';
import { AUTH_MESSAGES } from '../constants/messages';
import { loginSchema } from '../validators/login';

interface UseCredentialsStepOptions {
  signIn: SignInFutureResource | undefined;
  onComplete: () => Promise<void>;
  onNeedsVerification: (step: 'clientTrust' | 'mfa') => Promise<void>;
}

const hasMfaFactor = (factors: SignInSecondFactor[]) => {
  return factors.some(
    (factor) => factor.strategy === 'totp' || factor.strategy === 'backup_code',
  );
};

export function useCredentialsStep({
  signIn,
  onComplete,
  onNeedsVerification,
}: UseCredentialsStepOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!signIn) return;

    setIsSubmitting(true);
    try {
      const { error } = await signIn.password({
        emailAddress: values.emailAddress,
        password: values.password,
      });

      if (error) {
        toast.error(AUTH_MESSAGES.credentialsFailed);

        return;
      }

      if (signIn.status === 'complete') {
        await onComplete();
      } else if (signIn.status === 'needs_client_trust') {
        setIsSubmitting(false);
        await onNeedsVerification('clientTrust');
      } else if (signIn.status === 'needs_second_factor') {
        setIsSubmitting(false);
        await onNeedsVerification(
          hasMfaFactor(signIn.supportedSecondFactors) ? 'mfa' : 'clientTrust',
        );
      }
    } catch {
      toast.error(AUTH_MESSAGES.unexpected);
    } finally {
      setIsSubmitting(false);
    }
  });

  return { form, handleSubmit, isSubmitting };
}
