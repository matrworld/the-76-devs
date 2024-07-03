import { redirect, type RequestEvent } from '@sveltejs/kit';

import { validateAuthorization } from '$lib/auth/google';
import { createSession } from '$lib/auth/lucia';
import { prisma } from '$lib/server/prisma';
import { OAuth2RequestError } from 'arctic';
import { SESSION_REDIRECT_COOKIE_NAME, SESSION_STATE_COOKIE_NAME, SESSION_VERIFIER_COOKIE_NAME } from '$lib/auth/consts';

export const GET = async (event: RequestEvent) => {
    const { url, cookies } = event;

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
  
    const redirectValue = decodeURIComponent(cookies.get('redirect_url') || '');
    const redirectUrl = redirectValue && redirectValue !== 'null' ? redirectValue : '/';
    const storedState = cookies.get(SESSION_STATE_COOKIE_NAME);
    const storedCodeVerifier = cookies.get(SESSION_VERIFIER_COOKIE_NAME);
  
    if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
      // 400
      throw new Error('Invalid request');
    }
  
    try {
      const user = await validateAuthorization(code, storedCodeVerifier);
  
      if (!user) throw new Error('OAuth callback: unable to validate user');
      
      const updated = await prisma.user.upsert({
        where: {
          email: user?.email
        },
        create: user,
        update: user
      });
  
      const cookie = await createSession(updated.id);
  
      event.cookies.set(...cookie);
    } catch (error) {
      if (error instanceof OAuth2RequestError) {
        console.log('Google OAuth error!', String(error));
      }
  
      console.log('Google auth error!', String(error));
    } finally {
      cookies.set(SESSION_REDIRECT_COOKIE_NAME, '', {
        path: '.'
      });
    }
  
    throw redirect(302, redirectUrl);
};
