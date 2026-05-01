import { ArticlesSection } from '@/features/landing/components/articles-section';
import { CallToActionSection } from '@/features/landing/components/call-to-action-section';
import { HeroSection } from '@/features/landing/components/hero-section';
import { ProjectsSection } from '@/features/landing/components/projects-section';
import { TechStackSection } from '@/features/landing/components/tech-stack-section';

export default function Page() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <ProjectsSection />
      <ArticlesSection />
      <TechStackSection />
      <CallToActionSection />
    </div>
  );
}
