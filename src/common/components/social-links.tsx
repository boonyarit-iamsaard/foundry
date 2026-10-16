import { MailIcon } from 'lucide-react';

import { appConfig } from '@/core/configs/app.config';
import type { IconComponent } from '@/common/components/icons';
import { Icons } from '@/common/components/icons';
import { cn } from '@/common/helpers/cn';

type SocialLink = {
  href: string;
  label: string;
  icon: IconComponent;
};

export const email = 'boonyarit.iamsaard@gmail.com';

const gitHubLink: SocialLink = {
  href: appConfig.links.github,
  label: 'GitHub',
  icon: 'gitHub',
};

const socialLinks: SocialLink[] = [
  gitHubLink,
  {
    href: appConfig.links.linkedIn,
    label: 'LinkedIn',
    icon: 'linkedIn',
  },
  {
    href: `mailto:${email}`,
    label: 'Email',
    icon: MailIcon,
  },
];

type SocialLinksProps = Readonly<{ className?: string }>;

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul
      className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}
    >
      {socialLinks.map((link) => (
        <li key={link.href}>
          <SocialLinkAnchor link={link} />
        </li>
      ))}
    </ul>
  );
}

type GitHubLinkProps = Readonly<{ className?: string }>;

/** GitHub on its own, for a slot that pairs it with another action. */
export function GitHubLink({ className }: GitHubLinkProps) {
  return <SocialLinkAnchor link={gitHubLink} className={className} />;
}

type SocialLinkAnchorProps = Readonly<{
  link: SocialLink;
  className?: string;
}>;

function SocialLinkAnchor({ link, className }: SocialLinkAnchorProps) {
  const IconComponent: IconComponent =
    typeof link.icon === 'string' ? Icons[link.icon] : link.icon;
  const external = link.href.startsWith('http');

  return (
    <a
      href={link.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'stamp inline-flex items-center gap-2 underline decoration-2 decoration-transparent underline-offset-[6px] transition-colors duration-200 hover:decoration-(--link-line)',
        className,
      )}
    >
      <IconComponent className="size-4" aria-hidden="true" />
      {link.label}
    </a>
  );
}
