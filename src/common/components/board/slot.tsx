import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/common/helpers/cn';

/**
 * How a slot's outline is drawn. Projects use it to carry their project
 * status, so state reads from the line itself and never from colour.
 */
export type SlotLine = 'solid' | 'dashed' | 'heavy' | 'dashdot';

// Thin lines in rim grey; heavy is the one clearly thicker line. Dashed and
// dash-dot get half a pixel more so their breaks still read at 1x.
const lineClasses: Record<SlotLine, string> = {
  solid: 'border border-solid',
  dashed: 'border-[1.5px] border-dashed',
  heavy: 'border-[3px] border-solid',
  // CSS borders have no chain line; DashDotOutline draws it over a clear border.
  dashdot: 'border-[1.5px] border-transparent',
};

// The chain line as an SVG dash pattern: long dash, gap, dot, gap.
const chainStrokeWidth = 1.5;
const chainDash = `12 4 ${chainStrokeWidth} 4`;

// A short sample of each line, drawn with the same widths as the outline.
const sampleClasses: Record<Exclude<SlotLine, 'dashdot'>, string> = {
  solid: 'border-t border-solid',
  dashed: 'border-t-[1.5px] border-dashed',
  heavy: 'border-t-[3px] border-solid',
};

type SlotProps = Readonly<
  Omit<ComponentProps<'div'>, 'children'> & {
    /**
     * Position code stencilled on the slot's label tape, e.g. "P-01". Only
     * articles and projects carry one; any other slot is plain: outline and
     * plate, no tape.
     */
    code?: string;
    line?: SlotLine;
    /**
     * Lift the plate off its painted shadow on hover and focus. Only for a
     * slot that is one link: its title link carries `data-slot-link` and
     * stretches over the whole plate.
     */
    lift?: boolean;
    plateClassName?: string;
    children: ReactNode;
  }
>;

/**
 * One outlined place on the board. The item (the plate) sits inside its
 * painted shadow; lifting it shows exactly where it belongs.
 */
export function Slot({
  code,
  line = 'solid',
  lift = false,
  className,
  plateClassName,
  children,
  ...props
}: SlotProps) {
  return (
    <div
      data-slot-code={code}
      className={cn(
        'group/slot relative rounded-lg border-rim p-1.5 has-[[data-slot-link]:focus-visible]:outline-2 has-[[data-slot-link]:focus-visible]:outline-ring has-[[data-slot-link]:focus-visible]:outline-offset-4',
        lineClasses[line],
        className,
      )}
      {...props}
    >
      {line === 'dashdot' ? <DashDotOutline /> : null}
      {code ? (
        <span className="tape absolute -top-3 left-4 z-20">{code}</span>
      ) : null}
      {/* The code sits 2px off the bottom so the plate's 20px lift uncovers it. */}
      <div
        aria-hidden="true"
        className="absolute inset-1.5 flex items-end justify-end rounded-md bg-paint px-2 pb-0.5"
      >
        {code ? (
          <span className="code-stencil text-paint-ink">{code}</span>
        ) : null}
      </div>
      <div
        className={cn(
          'relative z-10 h-full rounded-md bg-plate text-card-foreground',
          lift &&
            'transition-[translate,box-shadow] duration-500 ease-lift group-hover/slot:shadow-(--lift-shadow) group-has-[[data-slot-link]:focus-visible]/slot:shadow-(--lift-shadow) motion-safe:group-has-[[data-slot-link]:focus-visible]/slot:-translate-x-1 motion-safe:group-has-[[data-slot-link]:focus-visible]/slot:-translate-y-5 motion-safe:group-hover/slot:-translate-x-1 motion-safe:group-hover/slot:-translate-y-5',
          plateClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** A chain line (long dash, dot) drawn on the centre of the slot's border. */
function DashDotOutline() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute top-[-0.75px] left-[-0.75px] h-[calc(100%+1.5px)] w-[calc(100%+1.5px)] overflow-visible"
    >
      <rect
        width="100%"
        height="100%"
        rx="8"
        fill="none"
        strokeWidth={chainStrokeWidth}
        strokeDasharray={chainDash}
        className="stroke-rim"
      />
    </svg>
  );
}

/** A 24px sample of a slot line, for a status key or a status label. */
export function SlotLineSample({ line }: Readonly<{ line: SlotLine }>) {
  if (line === 'dashdot') {
    return (
      <svg aria-hidden="true" className="h-[1.5px] w-6 overflow-visible">
        <line
          x1="0"
          y1={chainStrokeWidth / 2}
          x2="24"
          y2={chainStrokeWidth / 2}
          strokeWidth={chainStrokeWidth}
          strokeDasharray={chainDash}
          className="stroke-rim"
        />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn('inline-block w-6 border-rim', sampleClasses[line])}
    />
  );
}

/**
 * An outline whose item is missing: the silhouette shows, no plate on it.
 */
export function EmptySlot({
  code,
  className,
  children,
}: Readonly<{ code?: string; className?: string; children?: ReactNode }>) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-rim border-solid p-1.5',
        className,
      )}
    >
      {code ? (
        <span className="tape absolute -top-3 left-4 z-20">{code}</span>
      ) : null}
      <div className="flex h-full items-center justify-center rounded-md bg-paint p-6 text-paint-ink">
        {children}
      </div>
    </div>
  );
}
