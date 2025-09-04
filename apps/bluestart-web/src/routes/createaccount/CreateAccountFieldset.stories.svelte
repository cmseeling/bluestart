<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CreateAccountFieldset from './CreateAccountFieldset.svelte';

	const { Story } = defineMeta({
		title: 'CreateAccount/CreateAccountFieldset',
		component: CreateAccountFieldset
	});

	const errors: Map<string, string> = new Map();
	errors.set('username', 'Username cannot be empty.');
	errors.set('password', 'Password must be at least 8 characters long.');
	errors.set('confirmPassword', 'Passwords do not match.');
</script>

<Story name="Default" />

<Story name="Error State" args={{ errors }} />
