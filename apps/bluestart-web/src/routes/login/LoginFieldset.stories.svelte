<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoginFieldset from './LoginFieldset.svelte';

	const { Story } = defineMeta({
		title: 'Login/LoginFieldset',
		component: LoginFieldset
	});

	const errors: Map<string, string> = new Map();
	errors.set('username', 'Username is required');
	errors.set('password', 'Password is required');
</script>

<Story name="Default" />

<Story name="Error State" args={{ errors }} />
