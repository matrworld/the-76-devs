import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { createSessionCookie, clearSessionCookie, validateSession } from '$lib/auth/lucia';
import { SESSION_COOKIE_NAME } from "$lib/auth/consts";

const authHandle: Handle = async ({ event, resolve }) => {
    const sessionCookie = event.cookies.get(SESSION_COOKIE_NAME);
  
    if (!sessionCookie) {
      event.locals.user = null;
      event.locals.session = null;
  
      console.log('No session found, skipping validation');
  
      return resolve(event);
    }
  
    const { session, id, user } = await validateSession(sessionCookie);
    
    if (session && session?.fresh) {
      event.cookies.set(...createSessionCookie(id));
    }
    
    if(!session) {
      event.cookies.set(...clearSessionCookie());
    }
  
    event.locals.user = user;
    event.locals.session = session;
  
    return resolve(event);
};

export const handle: Handle = sequence(authHandle);
