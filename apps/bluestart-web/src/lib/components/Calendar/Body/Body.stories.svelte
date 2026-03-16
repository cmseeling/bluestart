<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Body from './Body.svelte';

	const { Story } = defineMeta({
		title: 'Components/Calendar/Body',
		component: Body
	});
</script>

<Story name="Default" />
