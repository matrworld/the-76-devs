// Provider used for google auth
import { Google, generateState, generateCodeVerifier } from 'arctic';

import {
  SESSION_COOKIE,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  SESSION_STATE_COOKIE_NAME,
  SESSION_VERIFIER_COOKIE_NAME
} from '$lib/auth/consts';

import type { Cookie } from '$lib/auth/types';

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);

export type CreateAuthorization = {
  url: string;
  cookies: { [key: string]: Cookie };
};

export async function createAuthorization(): Promise<CreateAuthorization> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ['profile', 'email']
  });

  return {
    url: url.href,
    cookies: {
      state: [SESSION_STATE_COOKIE_NAME, state, SESSION_COOKIE],
      verifier: [SESSION_VERIFIER_COOKIE_NAME, codeVerifier, SESSION_COOKIE]
    }
  };
}

export async function validateAuthorization(code: string, verifier: string) {
  try {
    const tokens = await google.validateAuthorizationCode(code, verifier);

    const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    const resolved = await response.json();

    return {
      email: resolved.email,
      name: resolved.name,
      avatar: resolved.picture
    };
  } catch (error) {
    console.log(error);

    return null;
  }
}
