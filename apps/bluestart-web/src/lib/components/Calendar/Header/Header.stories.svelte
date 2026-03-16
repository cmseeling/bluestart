<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Header from './Header.svelte';

	const { Story } = defineMeta({
		title: 'Components/Calendar/Header',
		component: Header
	});
</script>

<Story name="Default" />
