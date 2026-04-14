'use client';

import type { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import superjson from 'superjson';

import type { AppRouter } from './routers/_app';
import { getQueryClient } from './query-client';

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

function makeTRPCClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        transformer: superjson,
        url: '/api/trpc',
      }),
    ],
  });
}

let browserTRPCClient: ReturnType<typeof makeTRPCClient> | undefined;

function getTRPCClient() {
  browserTRPCClient ??= makeTRPCClient();

  return browserTRPCClient;
}

export function TRPCReactProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  const trpcClient = getTRPCClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
