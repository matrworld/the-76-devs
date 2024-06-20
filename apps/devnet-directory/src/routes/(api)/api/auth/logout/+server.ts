// endpoint to consume and hash username password and make lucia session
import { redirect, type RequestEvent } from '@sveltejs/kit';

import { invalidateSession } from '$lib/auth/lucia';
import { SESSION_REDIRECT_COOKIE_NAME, SESSION_STATE_COOKIE_NAME, SESSION_VERIFIER_COOKIE_NAME } from '$lib/auth/consts';

export async function GET(event: RequestEvent) {
	const { id = '' } = event.locals.session || {};
	const redirectUrl = decodeURIComponent(event.cookies.get('redirect_url') || '');
	
	const { blankSessionCookie } = await invalidateSession(id);

	// Wipe session
	event.cookies.set(...blankSessionCookie);

	// Cleanup other cookies
	event.cookies.delete(
		SESSION_VERIFIER_COOKIE_NAME,
		{
			path: '/'
		}
	);
	event.cookies.delete(
		SESSION_STATE_COOKIE_NAME,
		{
			path: '/'
		}
	);
	event.cookies.delete(
		SESSION_REDIRECT_COOKIE_NAME,
		{
			path: '/'
		}
	);

	throw redirect(302, redirectUrl || '/login');
}
