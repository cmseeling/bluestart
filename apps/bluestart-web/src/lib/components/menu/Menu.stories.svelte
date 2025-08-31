<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Menu from './Menu.svelte';

	const { Story } = defineMeta({
		title: 'Components/Menu',
		component: Menu
	});
</script>

<Story name="Default">
	<div style="height: 50rem">
		<Menu />
	</div>
</Story>
