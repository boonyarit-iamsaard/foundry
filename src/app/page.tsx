import type { Metadata } from 'next';

import { buildMetadata } from '@/common/helpers/metadata';
import { CallToActionSection } from '@/features/landing/components/call-to-action-section';
import { HeroSection } from '@/features/landing/components/hero-section';
import { PathSection } from '@/features/landing/components/path-section';

export const metadata: Metadata = buildMetadata({ path: '/' });

export default function Page() {
  return (
    <>
      <HeroSection />
      <PathSection />
      <CallToActionSection />
    </>
  );
}
