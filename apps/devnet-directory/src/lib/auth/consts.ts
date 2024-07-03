import { TimeSpan } from 'lucia';

import {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI
} from "$env/static/private";

export const GOOGLE_CLIENT_ID = GOOGLE_OAUTH_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = GOOGLE_OAUTH_CLIENT_SECRET || '';
export const GOOGLE_REDIRECT_URI = GOOGLE_OAUTH_REDIRECT_URI || '';

export const DEV = process.env.VITE_AUTH_ENVIRONMENT === 'development' ? true : false;

export const SESSION_EXPIRY = new TimeSpan(7, 'd');

export const SESSION_COOKIE = {
  secure: true, // set to false in localhost
  path: '/',
  httpOnly: true,
  maxAge: ((60 * 1) * 60) * 48 // 48 hours
};

const appName = "76_directory";
export const SESSION_COOKIE_NAME = appName + "_session";
export const SESSION_VERIFIER_COOKIE_NAME = appName + '_code_verifier';
export const SESSION_STATE_COOKIE_NAME = appName + '_state';
export const SESSION_REDIRECT_COOKIE_NAME = appName + '_redirect_url';
