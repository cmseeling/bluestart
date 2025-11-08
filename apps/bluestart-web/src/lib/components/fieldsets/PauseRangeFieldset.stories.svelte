<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PauseRangeFieldset from './PauseRangeFieldset.svelte';

	const { Story } = defineMeta({
		title: 'Components/PauseRangeFieldset',
		component: PauseRangeFieldset
	});
</script>

<Story name="Default" />
