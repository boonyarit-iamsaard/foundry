'use client';

import { ContactForm } from './contact-form';

export function CallToActionSection() {
  return (
    <section
      data-section="call-to-action"
      className="container flex flex-col items-center justify-center gap-8 py-16"
    >
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Have a system that needs steady hands?
        </h2>
        <p className="text-muted-foreground text-lg text-pretty">
          Whether you&apos;re shipping the next version or untangling something
          that&apos;s grown complicated, tell me about it — I read every
          message.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
