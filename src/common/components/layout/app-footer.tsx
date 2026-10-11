import Link from 'next/link';

import { appConfig } from '@/core/configs/app.config';
import { SocialLinks } from '@/common/components/social-links';

export function AppFooter() {
  return (
    <footer className="border-paint border-t-2 bg-board">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-display font-extrabold text-lg uppercase tracking-[0.03em]">
            Boonyarit Iamsa-ard
          </p>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} · Software engineer in Bangkok,
            Thailand
          </p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/#contact" className="stamp tape-link">
                Write to me
              </Link>
            </li>
            <li>
              <a href={appConfig.resume} download className="stamp tape-link">
                Download resume
              </a>
            </li>
          </ul>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
