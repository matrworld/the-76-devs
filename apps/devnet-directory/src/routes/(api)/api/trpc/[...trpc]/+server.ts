import { trpcServer } from '$lib/trpc';

export const GET = trpcServer.handler;
export const POST = trpcServer.handler;