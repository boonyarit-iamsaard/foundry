import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

export async function createTRPCContext() {
  return {};
}

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
