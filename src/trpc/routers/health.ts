import { env } from '@/core/configs/env.config';

import { createTRPCRouter, publicProcedure } from '../init';

export const healthRouter = createTRPCRouter({
  check: publicProcedure.query(() => {
    return {
      checkedAtIso: new Date().toISOString(),
      mode: env.NODE_ENV,
      status: 'ok' as const,
    };
  }),
});
