/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			username: string;
			avatar: string;
			roles: string[];
			name: string;
			email: string;
			id: string;
		};
		type DatabaseSessionAttributes = object;
	}

	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
