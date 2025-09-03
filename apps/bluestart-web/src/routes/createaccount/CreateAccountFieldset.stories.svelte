<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CreateAccountFieldset from './CreateAccountFieldset.svelte';

	const { Story } = defineMeta({
		title: 'CreateAccount/CreateAccountFieldset',
		component: CreateAccountFieldset
	});
</script>

<Story name="Default" />

<Story
	name="Error State"
	args={{ errors: { username: true, passwordGeneric: true, passwordStrength: true } }}
/>
