'use client';

import type { SyntheticEvent } from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { loginSchema } from '../validators/login';

type LoginStep = 'credentials' | 'clientTrust' | 'mfa';
type VerificationStrategy = 'email_code' | 'phone_code';

export function useLoginForm() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>('credentials');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStrategy, setVerificationStrategy] =
    useState<VerificationStrategy>('email_code');

  const credentialsForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
    },
  });

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
      toast.error(error.message ?? 'Failed to finalize sign in');
    }
  };

  const sendVerificationCode = async () => {
    if (!signIn) return;

    const emailCodeFactor = signIn.supportedSecondFactors?.find(
      (factor) => factor.strategy === 'email_code',
    );

    if (emailCodeFactor) {
      setVerificationStrategy('email_code');
      const { error } = await signIn.mfa.sendEmailCode();
      if (error) {
        toast.error(error.message ?? 'Failed to send verification code');
      }

      return;
    }

    const phoneCodeFactor = signIn.supportedSecondFactors?.find(
      (factor) => factor.strategy === 'phone_code',
    );

    if (phoneCodeFactor) {
      setVerificationStrategy('phone_code');
      const { error } = await signIn.mfa.sendPhoneCode();
      if (error) {
        toast.error(error.message ?? 'Failed to send verification code');
      }

      return;
    }

    toast.error('No supported verification method found');
  };

  const handleCredentialsSubmit = async (values: {
    emailAddress: string;
    password: string;
  }) => {
    if (!signIn) return;

    setIsSubmitting(true);
    try {
      const { error } = await signIn.password({
        emailAddress: values.emailAddress,
        password: values.password,
      });

      if (error) {
        toast.error(error.message ?? 'Failed to sign in');

        return;
      }

      if (signIn.status === 'complete') {
        await finalizeSignIn();
      } else if (signIn.status === 'needs_client_trust') {
        await sendVerificationCode();
        setStep('clientTrust');
      } else if (signIn.status === 'needs_second_factor') {
        await sendVerificationCode();
        setStep('mfa');
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!signIn) return;

    const code = verificationCode.trim();
    if (!code) {
      toast.error('Please enter the verification code');

      return;
    }

    setIsSubmitting(true);
    try {
      const { error } =
        verificationStrategy === 'email_code'
          ? await signIn.mfa.verifyEmailCode({ code })
          : await signIn.mfa.verifyPhoneCode({ code });

      if (error) {
        toast.error(error.message ?? 'Verification failed');

        return;
      }

      if (signIn.status === 'complete') {
        await finalizeSignIn();
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerificationCode = async () => {
    if (!signIn) return;

    setIsSubmitting(true);
    try {
      await sendVerificationCode();
      toast.success('Verification code sent');
    } catch {
      toast.error('Failed to send verification code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = async () => {
    await signIn?.reset();
    setVerificationCode('');
    setStep('credentials');
  };

  return {
    step,
    isSubmitting,
    verificationCode,
    setVerificationCode,
    credentialsForm,
    handleCredentialsSubmit: credentialsForm.handleSubmit(
      handleCredentialsSubmit,
    ),
    handleVerificationSubmit,
    handleResendVerificationCode,
    handleStartOver,
  };
}
