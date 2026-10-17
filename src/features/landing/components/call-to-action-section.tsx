import { Slot } from '@/common/components/board/slot';
import { ResumeDownloadButton } from '@/common/components/resume-download-button';
import { SocialLinks } from '@/common/components/social-links';

import { ContactForm } from './contact-form';

export function CallToActionSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-rim border-t"
    >
      <div className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-5">
          <h2 id="contact-heading" className="type-headline">
            Write to me
          </h2>
          <p className="max-w-[44ch] text-lg text-muted-foreground">
            The message comes straight to my inbox.
          </p>
          <ResumeDownloadButton />
          <SocialLinks className="pt-2" />
        </div>
        <Slot
          className="lg:col-span-6 lg:col-start-7"
          plateClassName="p-6 sm:p-8"
        >
          <ContactForm />
        </Slot>
      </div>
    </section>
  );
}
