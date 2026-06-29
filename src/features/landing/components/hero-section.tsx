import Link from 'next/link';

import { DownloadIcon } from 'lucide-react';

import { SocialLinks } from '@/common/components/social-links';
import { Button } from '@/common/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 -z-10"
      />
      <div className="container flex min-h-[80svh] flex-col justify-center gap-6 py-16">
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground font-mono text-sm tracking-tight">
            Full-Stack Developer · Bangkok, Thailand
          </p>
          <h1 className="max-w-3xl text-[clamp(2rem,1rem+4vw,3.25rem)] leading-[1.05] font-black tracking-tight text-balance">
            Boonyarit Iamsa-ard
          </h1>
          <p className="text-foreground/90 max-w-2xl text-xl font-semibold tracking-tight sm:text-2xl">
            Aircraft mechanic turned full-stack engineer.
          </p>
        </div>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-pretty">
          I spent years as an aircraft mechanic, where precision wasn&apos;t
          optional. When the pandemic changed everything, I taught myself to
          ship production software — and now build scalable, maintainable
          applications across the React and Node.js stack.
        </p>
        <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center">
          <div className="flex gap-2">
            <Button asChild size="lg">
              <Link href="#contact-form">Get in touch</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="/assets/boonyarit-iamsaard-2025-04-15.pdf" download>
                <DownloadIcon className="size-4" />
                Resume
              </a>
            </Button>
          </div>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
