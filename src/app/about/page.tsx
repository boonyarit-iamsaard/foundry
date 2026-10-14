import type { Metadata } from 'next';

import { DownloadIcon } from 'lucide-react';

import { appConfig } from '@/core/configs/app.config';
import { MDX } from '@/common/components/mdx';
import { SocialLinks } from '@/common/components/social-links';
import { Button } from '@/common/components/ui/button';
import { buildMetadata } from '@/common/helpers/metadata';

import { about } from '@/velite';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: about.description,
  path: about.permalink,
});

export default function AboutPage() {
  return (
    <div>
      <section className="container pt-14 pb-12 sm:pt-20">
        <div className="space-y-6">
          <h1 className="type-display">Boonyarit Iamsa-ard</h1>
          <p className="font-medium text-lg text-muted-foreground">
            Software Engineer · Bangkok, Thailand
          </p>
          <p className="max-w-[52ch] text-lg sm:text-xl">
            Aircraft mechanic turned software engineer. I build backend
            services, web apps and mobile apps, and I check my work before it
            leaves my hands.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild size="lg">
              <a href={appConfig.resume} download>
                <DownloadIcon aria-hidden="true" />
                Download resume
              </a>
            </Button>
            <SocialLinks />
          </div>
        </div>
      </section>
      <section className="border-rim border-t py-14">
        <div className="container-content">
          <div className="reading-measure">
            <MDX content={about.content} />
          </div>
        </div>
      </section>
    </div>
  );
}
