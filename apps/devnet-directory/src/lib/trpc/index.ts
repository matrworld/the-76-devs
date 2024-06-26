import { createTRPCSvelte,  httpBatchLink } from 'trpc-svelte-query';
import { router, type Router } from '$lib/server/router/';
import type { RequestEvent } from '@sveltejs/kit';
import { createTRPCSvelteServer } from 'trpc-svelte-query/server';

export async function createContext(
  event: RequestEvent | null,
  isSystemOperation: boolean = false
) {
  if (isSystemOperation) {
    return {
      user: null,
      isSystemOperation: true
    };
  }

  const user = event?.locals?.user;

  return {
    user,
    isSystemOperation: false
  };
}

export async function createSystemContext() {
  return await createContext(null, true);
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = createTRPCSvelte<Router>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
});

export const trpcServer = createTRPCSvelteServer({
  endpoint: '/api/trpc',
  router: router,
  createContext,
});