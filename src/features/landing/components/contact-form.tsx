'use client';

import { SendIcon } from 'lucide-react';

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
  const { form, handleSubmitWithAction, isSending } = useContactForm();

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
