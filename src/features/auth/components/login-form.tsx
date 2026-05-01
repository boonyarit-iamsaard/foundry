'use client';

import { useState } from 'react';

import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/common/components/ui/input-otp';
import { Label } from '@/common/components/ui/label';

import { useLoginForm } from '../hooks/use-login-form';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    step,
    isSubmitting,
    verificationCode,
    setVerificationCode,
    credentialsForm,
    handleCredentialsSubmit,
    handleVerificationSubmit,
    handleResendVerificationCode,
    handleStartOver,
  } = useLoginForm();

  if (step === 'clientTrust' || step === 'mfa') {
    return (
      <form onSubmit={handleVerificationSubmit} className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your identity</CardTitle>
            <CardDescription>
              {step === 'clientTrust'
                ? 'Enter the verification code sent to your email.'
                : 'Enter your two-factor code.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="grid gap-2">
              <Label htmlFor="verification-code" className="sr-only">
                Verification code
              </Label>
              <InputOTP
                id="verification-code"
                name="code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                autoFocus
                // Keep this controlled by plain state. Even with explicit props,
                // react-hook-form integration has broken input-otp typing here.
                // input-otp owns a hidden input ref and custom selection/value
                // synchronization, so avoid routing this field through RHF.
                value={verificationCode}
                onChange={setVerificationCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              Verify
            </Button>
            <p className="text-muted-foreground text-sm">
              {"Didn't receive a code? "}
              <Button
                variant="link"
                size="sm"
                type="button"
                disabled={isSubmitting}
                onClick={handleResendVerificationCode}
                className="h-auto p-0 text-sm"
              >
                Resend
              </Button>
            </p>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              disabled={isSubmitting}
              onClick={handleStartOver}
              className="text-muted-foreground w-full"
            >
              Back to sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    );
  }

  return (
    <Form {...credentialsForm}>
      <form onSubmit={handleCredentialsSubmit} className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Owner access</CardTitle>
            <CardDescription>
              Enter your credentials to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={credentialsForm.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={credentialsForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Your password"
                        autoComplete="current-password"
                        className="pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 flex items-center transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              Continue
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
