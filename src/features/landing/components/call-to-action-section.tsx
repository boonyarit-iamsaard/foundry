import { DownloadIcon } from 'lucide-react';

import { appConfig } from '@/core/configs/app.config';
import { Slot } from '@/common/components/board/slot';
import { SocialLinks } from '@/common/components/social-links';
import { Button } from '@/common/components/ui/button';

import { ContactForm } from './contact-form';

export function CallToActionSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pegboard border-rim border-t"
    >
      <div className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-5">
          <h2 id="contact-heading" className="type-headline">
            Write to me
          </h2>
          <div className="max-w-[44ch] space-y-3 text-lg">
            <p>
              If you&apos;re hiring, tell me about the role and the team. If you
              read something I wrote, tell me what you think, or where I got it
              wrong.
            </p>
            <p className="text-muted-foreground">
              The message comes straight to my inbox.
            </p>
          </div>
          <Button asChild variant="outline">
            <a href={appConfig.resume} download>
              <DownloadIcon aria-hidden="true" />
              Download resume
            </a>
          </Button>
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
