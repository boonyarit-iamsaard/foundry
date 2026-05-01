import { MailIcon } from 'lucide-react';

import { Icons } from '@/common/components/icons';
import { Button } from '@/common/components/ui/button';

import type { IconComponent } from '@/common/components/icons';

interface SocialLink {
  href: string;
  icon: IconComponent;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/boonyarit-iamsaard',
    icon: 'gitHub',
  },
  {
    href: 'https://linkedin.com/in/boonyarit-iamsaard',
    icon: 'linkedIn',
  },
  {
    href: 'mailto:boonyarit.iamsaard@gmail.com',
    icon: MailIcon,
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center">
      {socialLinks.map((link) => {
        const IconComponent: IconComponent =
          typeof link.icon === 'string' ? Icons[link.icon] : link.icon;

        return (
          <Button variant="ghost" size="icon" asChild key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.href}
            >
              <IconComponent className="size-5" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
