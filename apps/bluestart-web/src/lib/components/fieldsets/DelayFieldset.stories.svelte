<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DelayFieldset from './DelayFieldset.svelte';

	const { Story } = defineMeta({
		title: 'Components/DelayFieldset',
		component: DelayFieldset
	});
</script>

<Story name="Default" />
