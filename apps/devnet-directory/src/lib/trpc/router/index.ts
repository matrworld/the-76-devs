// lib/trpc/router.ts
import { userRouter } from "$lib/trpc/router/user";
import { t } from '$lib/trpc/t';
import type { inferRouterOutputs } from '@trpc/server';

export const router = t.router({
  user: userRouter
});

export type Router = typeof router;
export type RouterOutputs = inferRouterOutputs<Router>;