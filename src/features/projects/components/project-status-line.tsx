import type { SlotLine } from '@/common/components/board/slot';
import { SlotLineSample } from '@/common/components/board/slot';
import { cn } from '@/common/helpers/cn';

import type { Project } from '@/velite';

/**
 * Project status is drawn as the slot's outline: a finished project gets a
 * plain line, work still landing a heavy one, an experiment a broken one.
 */
export const projectStatusLine: Record<Project['status'], SlotLine> = {
  experimental: 'dashed',
  active: 'heavy',
  stable: 'solid',
  maintenance: 'dashdot',
};

export const projectStatusLabel: Record<Project['status'], string> = {
  experimental: 'Experimental',
  active: 'Active',
  stable: 'Stable',
  maintenance: 'Maintenance',
};

export function ProjectStatusLine({
  status,
  className,
}: Readonly<{ status: Project['status']; className?: string }>) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <SlotLineSample line={projectStatusLine[status]} />
      <span className="font-medium text-sm">{projectStatusLabel[status]}</span>
    </span>
  );
}

const projectStatuses: Project['status'][] = [
  'active',
  'stable',
  'experimental',
  'maintenance',
];

export function ProjectStatusKey({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <dl
      className={cn('flex flex-wrap items-center gap-x-6 gap-y-2', className)}
    >
      <dt className="sr-only">Project status outline key</dt>
      {projectStatuses.map((status) => (
        <dd key={status} className="flex">
          <ProjectStatusLine status={status} />
        </dd>
      ))}
    </dl>
  );
}
