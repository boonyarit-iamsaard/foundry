import type { SlotLine } from '@/common/components/board/slot';
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

const lineSample: Record<Exclude<SlotLine, 'dashdot'>, string> = {
  solid: 'border-t-2 border-solid',
  dashed: 'border-t-2 border-dashed',
  heavy: 'border-t-[3.5px] border-solid',
};

export function ProjectStatusLine({
  status,
  className,
}: Readonly<{ status: Project['status']; className?: string }>) {
  const line = projectStatusLine[status];

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {line === 'dashdot' ? (
        <svg aria-hidden="true" className="h-[3px] w-6 overflow-visible">
          <line
            x1="0"
            y1="1.5"
            x2="24"
            y2="1.5"
            strokeWidth="2.5"
            strokeDasharray="12 4 2.5 4"
            className="stroke-paint"
          />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className={cn('inline-block w-6 border-paint', lineSample[line])}
        />
      )}
      <span className="stamp text-xs">{projectStatusLabel[status]}</span>
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
        <dd key={status}>
          <ProjectStatusLine status={status} />
        </dd>
      ))}
    </dl>
  );
}
