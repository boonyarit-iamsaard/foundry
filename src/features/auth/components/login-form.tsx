'use client';

import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardFooter } from '@/common/components/ui/card';
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
      <form
        onSubmit={handleVerificationSubmit}
        className="w-full max-w-lg space-y-4"
      >
        <Card>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              {step === 'clientTrust'
                ? 'Enter the verification code sent by Clerk to trust this device.'
                : 'Enter your two-factor authentication code.'}
            </p>
            <div className="grid gap-2">
              <Label htmlFor="verification-code">Verification code</Label>
              <InputOTP
                id="verification-code"
                name="code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                autoFocus
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
          <CardFooter className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <Button size="lg" type="submit" disabled={isSubmitting}>
                Verify
              </Button>
              <Button
                variant="ghost"
                type="button"
                disabled={isSubmitting}
                onClick={handleResendVerificationCode}
              >
                Resend code
              </Button>
            </div>
            <Button
              variant="link"
              type="button"
              disabled={isSubmitting}
              onClick={handleStartOver}
            >
              Start over
            </Button>
          </CardFooter>
        </Card>
      </form>
    );
  }

  return (
    <Form {...credentialsForm}>
      <form
        onSubmit={handleCredentialsSubmit}
        className="w-full max-w-lg space-y-4"
      >
        <Card>
          <CardContent className="space-y-4">
            <FormField
              control={credentialsForm.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
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
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button size="lg" type="submit" disabled={isSubmitting}>
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
