import type { RequestEvent } from '@sveltejs/kit';
import type { Cookie } from '$lib/auth/types';

import { redirect } from '@sveltejs/kit';
import { createAuthorization } from '$lib/auth/google';

export const GET = async (event: RequestEvent, sveltekitRedirect: any) => {
    const { url, cookies } = await createAuthorization();
  
    const state = cookies.state as Cookie;
    const verifier = cookies.verifier as Cookie;
  
    // store state verifier as cookie
    event.cookies.set(...state);
    event.cookies.set(...verifier);
  
    throw redirect(302, url);
  }