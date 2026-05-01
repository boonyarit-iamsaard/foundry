'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSignIn } from '@clerk/nextjs';
import { toast } from 'sonner';

import { AUTH_MESSAGES } from '../constants/messages';
import { useCredentialsStep } from './use-credentials-step';
import { useVerificationStep } from './use-verification-step';

type LoginStep = 'credentials' | 'clientTrust' | 'mfa';

export function useLoginForm() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>('credentials');

  const finalizeSignIn = async () => {
    const { error } = await signIn!.finalize({
      navigate: ({ decorateUrl }) => {
        const url = decorateUrl('/admin');
        if (url.startsWith('http')) {
          globalThis.location.href = url;
        } else {
          router.push(url);
        }
      },
    });

    if (error) {
      toast.error(AUTH_MESSAGES.finalizeFailed);
    }
  };

  const verificationStep = useVerificationStep({
    signIn,
    onComplete: finalizeSignIn,
    onStartOver: () => setStep('credentials'),
  });

  const credentialsStep = useCredentialsStep({
    signIn,
    onComplete: finalizeSignIn,
    onNeedsVerification: async (nextStep) => {
      await verificationStep.sendCode();
      setStep(nextStep);
    },
  });

  return {
    step,
    isSubmitting: credentialsStep.isSubmitting || verificationStep.isSubmitting,
    verificationCode: verificationStep.verificationCode,
    setVerificationCode: verificationStep.setVerificationCode,
    credentialsForm: credentialsStep.form,
    handleCredentialsSubmit: credentialsStep.handleSubmit,
    handleVerificationSubmit: verificationStep.handleSubmit,
    handleResendVerificationCode: verificationStep.handleResend,
    handleStartOver: verificationStep.handleStartOver,
  };
}
