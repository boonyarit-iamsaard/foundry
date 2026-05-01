import type { Metadata } from 'next';

import Image from 'next/image';

import { Download } from 'lucide-react';

import profile from '@/core/assets/images/profile.webp';
import { Mdx } from '@/common/components/mdx';
import { Button } from '@/common/components/ui/button';

import { about } from '@/velite';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Boonyarit Iamsa-ard',
};

export default function AboutPage() {
  return (
    <div className="container-content py-16">
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 text-center">
        <div className="relative size-24 md:size-32">
          <Image
            src={profile}
            alt="Boonyarit Iamsa-ard"
            fill
            quality={85}
            priority
            sizes="(max-width: 768px) 96px, 128px"
            className="ring-background rounded-full object-cover ring-2"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
          Boonyarit Iamsa-ard
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground font-medium italic sm:text-lg">
            Iterate, learn, and improve along the way.
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <a href="/assets/boonyarit-iamsaard-2025-04-15.pdf" download>
            <Download className="size-4" />
            Resume
          </a>
        </Button>
      </div>
      <div className="bg-muted rounded-lg px-16 py-8">
        <Mdx content={about.content} />
      </div>
    </div>
  );
}
