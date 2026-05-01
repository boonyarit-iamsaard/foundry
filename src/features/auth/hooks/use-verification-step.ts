'use client';

import type { SyntheticEvent } from 'react';

import { useState } from 'react';

import { toast } from 'sonner';

import type { SignInFutureResource } from '@clerk/nextjs/types';
import { AUTH_MESSAGES } from '../constants/messages';

type VerificationStrategy = 'email_code' | 'phone_code';

interface UseVerificationStepOptions {
  signIn: SignInFutureResource | undefined;
  onComplete: () => Promise<void>;
  onStartOver: () => void;
}

export function useVerificationStep({
  signIn,
  onComplete,
  onStartOver,
}: UseVerificationStepOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [strategy, setStrategy] = useState<VerificationStrategy>('email_code');

  const sendCode = async () => {
    if (!signIn) return;

    const emailFactor = signIn.supportedSecondFactors?.find(
      (factor) => factor.strategy === 'email_code',
    );
    if (emailFactor) {
      setStrategy('email_code');
      const { error } = await signIn.mfa.sendEmailCode();
      if (error) {
        toast.error(AUTH_MESSAGES.codeSendFailed);
      }

      return;
    }

    const phoneFactor = signIn.supportedSecondFactors?.find(
      (factor) => factor.strategy === 'phone_code',
    );
    if (phoneFactor) {
      setStrategy('phone_code');
      const { error } = await signIn.mfa.sendPhoneCode();
      if (error) {
        toast.error(AUTH_MESSAGES.codeSendFailed);
      }

      return;
    }

    toast.error(AUTH_MESSAGES.noVerificationMethod);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!signIn) return;

    const code = verificationCode.trim();
    if (!code) {
      toast.error(AUTH_MESSAGES.codeRequired);

      return;
    }

    setIsSubmitting(true);
    try {
      const { error } =
        strategy === 'email_code'
          ? await signIn.mfa.verifyEmailCode({ code })
          : await signIn.mfa.verifyPhoneCode({ code });

      if (error) {
        toast.error(AUTH_MESSAGES.codeVerificationFailed);

        return;
      }

      if (signIn.status === 'complete') {
        await onComplete();
      }
    } catch {
      toast.error(AUTH_MESSAGES.unexpected);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!signIn) return;

    setIsSubmitting(true);
    try {
      await sendCode();
      toast.success(AUTH_MESSAGES.codeSent);
    } catch {
      toast.error(AUTH_MESSAGES.codeSendFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = async () => {
    await signIn?.reset();
    setVerificationCode('');
    onStartOver();
  };

  return {
    verificationCode,
    setVerificationCode,
    handleSubmit,
    handleResend,
    handleStartOver,
    isSubmitting,
    sendCode,
  };
}
