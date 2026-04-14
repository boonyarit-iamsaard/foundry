import type { ReactNode } from 'react';

import { cache } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';

import { createTRPCContext } from './init';
import { getQueryClient } from './query-client';
import { appRouter } from './routers/_app';

export const getServerQueryClient = cache(getQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  queryClient: getServerQueryClient,
  router: appRouter,
});

export function HydrateClient({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <HydrationBoundary state={dehydrate(getServerQueryClient())}>
      {children}
    </HydrationBoundary>
  );
}
