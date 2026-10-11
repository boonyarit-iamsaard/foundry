'use client';

import { useEffect, useRef } from 'react';

import { CheckIcon, SendIcon } from 'lucide-react';

import { Button } from '@/common/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import { Textarea } from '@/common/components/ui/textarea';

import { useContactForm } from '../hooks/use-contact-form';

const labelClassName = 'stamp text-foreground text-xs';

export function ContactForm() {
  const { form, handleSubmitWithAction, isSending, sentTo, startOver } =
    useContactForm();
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  // The form is replaced by the confirmation, so move focus with it.
  useEffect(() => {
    if (sentTo) {
      confirmationRef.current?.focus();
    }
  }, [sentTo]);

  if (sentTo) {
    return (
      <div role="status" className="flex min-h-80 flex-col items-start gap-5">
        <CheckIcon className="size-8" aria-hidden="true" />
        <div className="space-y-3">
          <h3
            ref={confirmationRef}
            tabIndex={-1}
            className="font-bold font-display text-[1.875rem] uppercase leading-[0.95] focus:outline-none"
          >
            Message sent
          </h3>
          <p className="max-w-[44ch] text-lg">
            It&apos;s in my inbox. I&apos;ll reply to{' '}
            <span className="font-semibold">{sentTo}</span>.
          </p>
        </div>
        <Button variant="outline" className="mt-auto" onClick={startOver}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        id="contact-form"
        onSubmit={handleSubmitWithAction}
        className="space-y-5"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClassName}>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The role, or the project you have in mind"
                  className="min-h-40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="lg"
          type="submit"
          className="w-full sm:w-auto"
          disabled={isSending}
        >
          <SendIcon aria-hidden="true" />
          {isSending ? 'Sending…' : 'Send message'}
        </Button>
      </form>
    </Form>
  );
}
