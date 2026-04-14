'use client';

import { useQuery } from '@tanstack/react-query';

import { cn } from '@/common/helpers/cn';

import { useTRPC } from '@/trpc/client';

const HEALTH_CHECK_UI = {
  pending: {
    indicatorClassName: 'bg-amber-500',
    label: 'tRPC checking',
  },
  error: {
    indicatorClassName: 'bg-red-500',
    label: 'tRPC unavailable',
  },
  success: {
    indicatorClassName: 'bg-emerald-500',
    label: 'tRPC healthy',
  },
} as const;
type HealthCheckStatus = keyof typeof HEALTH_CHECK_UI;

function getHealthCheckStatus(
  isPending: boolean,
  isError: boolean,
  status?: 'ok',
): HealthCheckStatus {
  if (isPending) {
    return 'pending';
  }

  if (isError || status !== 'ok') {
    return 'error';
  }

  return 'success';
}

export function TRPCHealthCheck() {
  const trpc = useTRPC();
  const { isPending, isError, data } = useQuery(
    trpc.health.check.queryOptions(undefined, {
      refetchOnWindowFocus: false,
      retry: false,
    }),
  );

  const status = getHealthCheckStatus(isPending, isError, data?.status);
  const { indicatorClassName, label } = HEALTH_CHECK_UI[status];

  return (
    <div className="text-muted-foreground inline-flex items-center gap-2 text-xs">
      <span
        aria-hidden="true"
        className={cn('size-2 rounded-full', indicatorClassName)}
      />
      <span>{label}</span>
    </div>
  );
}
