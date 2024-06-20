import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth/lucia';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url, cookies }) => {
	if (locals?.session) {
		const { session } = await auth.validateSession(locals?.session?.id || "");
		if (session) {
			throw redirect(302, '/');
		}
	}
};
