import { MailIcon } from 'lucide-react';

import type { IconComponent } from '@/common/components/icons';
import { Icons } from '@/common/components/icons';
import { cn } from '@/common/helpers/cn';

type SocialLink = {
  href: string;
  label: string;
  icon: IconComponent;
};

export const email = 'boonyarit.iamsaard@gmail.com';

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/boonyarit-iamsaard',
    label: 'GitHub',
    icon: 'gitHub',
  },
  {
    href: 'https://www.linkedin.com/in/boonyarit-iamsaard/',
    label: 'LinkedIn',
    icon: 'linkedIn',
  },
  {
    href: `mailto:${email}`,
    label: 'Email',
    icon: MailIcon,
  },
];

export function SocialLinks({ className }: Readonly<{ className?: string }>) {
  return (
    <ul
      className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}
    >
      {socialLinks.map((link) => {
        const IconComponent: IconComponent =
          typeof link.icon === 'string' ? Icons[link.icon] : link.icon;
        const external = link.href.startsWith('http');

        return (
          <li key={link.href}>
            <a
              href={link.href}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="stamp inline-flex items-center gap-2 underline decoration-2 decoration-transparent underline-offset-[6px] transition-colors duration-200 hover:decoration-(--link-line)"
            >
              <IconComponent className="size-4" aria-hidden="true" />
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
