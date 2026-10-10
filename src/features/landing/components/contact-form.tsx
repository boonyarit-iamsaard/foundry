'use client';

import { SocialLinks } from '@/common/components/social-links';
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
import { Textarea } from '@/common/components/ui/textarea';

import { useContactForm } from '../hooks/use-contact-form';

export function ContactForm() {
  const { form, handleSubmitWithAction } = useContactForm();

  return (
    <Form {...form}>
      <form
        id="contact-form"
        onSubmit={handleSubmitWithAction}
        className="w-full max-w-lg space-y-4"
      >
        <Card>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="What should I call you?" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button size="lg" type="submit">
              Message me
            </Button>
          </CardFooter>
        </Card>
        <div className="relative w-full text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or find me on
          </span>
        </div>
        <div className="flex items-center justify-center">
          <SocialLinks />
        </div>
      </form>
    </Form>
  );
}
