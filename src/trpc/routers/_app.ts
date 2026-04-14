import { createTRPCRouter } from '../init';
import { contactRouter } from './contact';
import { healthRouter } from './health';

export const appRouter = createTRPCRouter({
  contact: contactRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
