import { env } from '@/core/configs/env.config';
import { SocialLinks } from '@/common/components/social-links';
import { TRPCHealthCheck } from '@/features/landing/components/trpc-health-check';

import { getServerQueryClient, HydrateClient, trpc } from '@/trpc/server';

export async function AppFooter() {
  const isDevelopment = env.NODE_ENV === 'development';
  if (isDevelopment) {
    await getServerQueryClient().prefetchQuery(
      trpc.health.check.queryOptions(undefined, {
        refetchOnWindowFocus: false,
        retry: false,
      }),
    );
  }

  return (
    <footer className="bg-muted py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Boonyarit Iamsa-ard. All rights
            reserved.
          </p>
          {isDevelopment ? (
            <HydrateClient>
              <TRPCHealthCheck />
            </HydrateClient>
          ) : null}
          <p className="text-muted-foreground text-xs">
            Awesome color theme from&nbsp;
            <a
              href="https://tweakcn.com/editor/theme"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline underline-offset-4"
            >
              tweakcn.com
            </a>
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
