import type { ComponentProps } from 'react';

import { DownloadIcon } from 'lucide-react';

import { appConfig } from '@/core/configs/app.config';
import { Button } from '@/common/components/ui/button';

type ResumeDownloadButtonProps = Readonly<
  Pick<ComponentProps<typeof Button>, 'variant' | 'size' | 'className'>
>;

/** The resume download as a button, worded the same everywhere it appears. */
export function ResumeDownloadButton({
  variant = 'outline',
  size,
  className,
}: ResumeDownloadButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={appConfig.resume} download>
        <DownloadIcon aria-hidden="true" />
        Download resume
      </a>
    </Button>
  );
}
