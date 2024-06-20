import type { Cookie } from '$lib/auth/types';

import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

import { prisma } from '$lib/server/prisma';
import { SESSION_EXPIRY, DEV, SESSION_COOKIE, SESSION_COOKIE_NAME } from '$lib/auth/consts';

export type Auth = typeof auth;

export interface DatabaseUserAttributes {
  id: string;
  email: string;
  avatar: string;
  role: string;
  name: string;
}

declare module 'lucia' {
  interface Register {
    Lucia: Auth;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

const luciaAdapter = new PrismaAdapter(prisma.session, prisma.user);

export const auth = new Lucia(luciaAdapter, {
  sessionExpiresIn: SESSION_EXPIRY,
  sessionCookie: {
    name: SESSION_COOKIE_NAME,
    attributes: {
      secure: !DEV
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      id: attributes.id,
      email: attributes.email,
      avatar: attributes.avatar,
      role: attributes.role,
      name: attributes.name
    };
  }
});

export function createSessionCookie(id: string): Cookie {
  const sessionCookie = auth.createSessionCookie(id);

  return [
    sessionCookie.name,
    sessionCookie.value,
    {
      ...SESSION_COOKIE,
      ...sessionCookie.attributes
    }
  ];
}

export function clearSessionCookie(): Cookie {
  const sessionCookie = auth.createBlankSessionCookie();

  return [
    sessionCookie.name,
    sessionCookie.value,
    {
      path: '.',
      ...sessionCookie.attributes
    }
  ];
}

export async function createSession(id: string) {
  const session = await auth.createSession(id, {});

  return createSessionCookie(session.id);
}

export async function validateSession(sessionId: string) {
  const { session, user } = await auth.validateSession(sessionId);

  return {
    valid: session && session?.fresh,
    id: session?.id || "",
    user,
    session
  }
}

export async function invalidateSession(id: string): Promise<{
  blankSessionCookie: Cookie;
}> {
  await auth.invalidateSession(id);

	const blankSessionCookie = auth.createBlankSessionCookie();

  // TODO are there other things to do upon logout?

  return {
    blankSessionCookie: [
      blankSessionCookie.name,
      blankSessionCookie.value,
      {
        path: '.',
        ...blankSessionCookie.attributes
      }
    ],
  }
}

