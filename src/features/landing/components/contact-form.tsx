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

const labelClassName = 'font-semibold text-foreground text-sm';

export function ContactForm() {
  const { form, handleSubmitWithAction, isSending, sentTo, startOver } =
    useContactForm();
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const isStartingOverRef = useRef(false);

  // The form and the confirmation replace each other, so move focus with them.
  useEffect(() => {
    if (sentTo) {
      confirmationRef.current?.focus();
    } else if (isStartingOverRef.current) {
      isStartingOverRef.current = false;
      form.setFocus('name');
    }
  }, [sentTo, form]);

  function handleStartOver() {
    isStartingOverRef.current = true;
    startOver();
  }

  if (sentTo) {
    return (
      <div className="flex min-h-80 flex-col items-start gap-5">
        <CheckIcon className="size-8" aria-hidden="true" />
        <div className="space-y-3">
          <h3
            ref={confirmationRef}
            tabIndex={-1}
            className="font-bold font-display text-[1.875rem] uppercase leading-[0.95] focus:outline-none"
          >
            Message sent
          </h3>
          <output className="block max-w-[44ch] text-lg">
            It&apos;s in my inbox. I&apos;ll reply to{' '}
            <span className="font-semibold">{sentTo}</span>.
          </output>
        </div>
        <Button variant="outline" className="mt-auto" onClick={handleStartOver}>
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClassName}>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" required {...field} />
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
                <Input type="email" autoComplete="email" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClassName}>Message</FormLabel>
              <FormControl>
                <Textarea className="min-h-40" required {...field} />
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
