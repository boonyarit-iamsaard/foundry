import { CallToActionSection } from '@/features/landing/components/call-to-action-section';
import { HeroSection } from '@/features/landing/components/hero-section';
import { PathSection } from '@/features/landing/components/path-section';

export default function Page() {
  return (
    <>
      <HeroSection />
      <PathSection />
      <CallToActionSection />
    </>
  );
}
