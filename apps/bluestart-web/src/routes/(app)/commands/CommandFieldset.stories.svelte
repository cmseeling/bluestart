<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CommandFieldset from './CommandFieldset.svelte';

	const { Story } = defineMeta({
		title: 'Commands/CommandFieldset',
		component: CommandFieldset
	});
</script>

<Story name="Default" />

<Story name="Error State" args={{ errors: { username: true, password: true } }} />
