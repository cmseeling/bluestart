<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoginFieldset from './LoginFieldset.svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const errors: Map<string, string> = new SvelteMap();
	errors.set('username', 'Username is required');
	errors.set('password', 'Password is required');

	const { Story } = defineMeta({
		title: 'Login/LoginFieldset',
		component: LoginFieldset
	});
</script>

<Story name="Default" />

<Story name="Error State" args={{ errors }} />
