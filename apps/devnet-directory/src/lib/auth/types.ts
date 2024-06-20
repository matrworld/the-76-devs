// From "cookie" lib
export interface CookieSerializeOptions {
  domain?: string | undefined;
  encode?(value: string): string;
  expires?: Date | undefined;
  httpOnly?: boolean | undefined;
  maxAge?: number | undefined;
  partitioned?: boolean | undefined;
  path?: string | undefined;
  priority?: 'low' | 'medium' | 'high' | undefined;
  sameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean | undefined;
}

export type Cookie = [string, string, CookieSerializeOptions & { path: string }];
