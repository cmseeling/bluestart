import 'unplugin-icons/types/svelte';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		// interface PageData {}
		interface PageState {
			showSuccessMsg?: boolean;
			showFailureMsg?: boolean;
		}
		// interface Platform {}
	}
}

export {};
