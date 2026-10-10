'use client';

import { ContactForm } from './contact-form';

export function CallToActionSection() {
  return (
    <section
      data-section="call-to-action"
      className="container flex flex-col items-center justify-center gap-8 py-16"
    >
      <div className="space-y-4 text-center">
        <h2 className="font-bold text-2xl tracking-tight sm:text-4xl">
          Want to work together?
        </h2>
        <p className="text-lg text-muted-foreground">
          Let&apos;s connect and discuss your next project.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
