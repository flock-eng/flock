// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
		}
		
		interface Locals {
			user?: {
				id: string;
				username: string;
				firstName: string;
				lastName: string;
			};
		}
		
		interface PageData {
			user?: App.Locals['user'];
		}
		
		interface Platform {}
	}
}

export {};
