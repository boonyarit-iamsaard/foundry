import type { Metadata } from 'next';

import profile from '@/core/assets/images/profile.webp';
import { JsonLd } from '@/common/components/json-ld';
import { buildMetadata } from '@/common/helpers/metadata';
import { personSchema, websiteSchema } from '@/common/helpers/structured-data';
import { CallToActionSection } from '@/features/landing/components/call-to-action-section';
import { HeroSection } from '@/features/landing/components/hero-section';
import { PathSection } from '@/features/landing/components/path-section';

export const metadata: Metadata = buildMetadata({ path: '/' });

export default function Page() {
  return (
    <>
      <JsonLd data={personSchema({ photo: profile.src })} />
      <JsonLd data={websiteSchema()} />
      <HeroSection />
      <PathSection />
      <CallToActionSection />
    </>
  );
}
