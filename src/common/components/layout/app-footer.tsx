import { SocialLinks } from '@/common/components/social-links';

export function AppFooter() {
  return (
    <footer className="bg-muted py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Boonyarit Iamsa-ard. All rights
            reserved.
          </p>
          <p className="text-muted-foreground font-mono text-xs">
            Built with Next.js · color theme tuned with{' '}
            <a
              href="https://tweakcn.com/editor/theme"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline underline-offset-4"
            >
              tweakcn
            </a>
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
