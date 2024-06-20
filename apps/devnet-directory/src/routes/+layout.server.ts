import { trpcServer } from '$lib/trpc/';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { request, locals } = event;
	

	return {
		user: locals.user,
		trpc: await trpcServer.hydrateToClient(event),
	}
};
