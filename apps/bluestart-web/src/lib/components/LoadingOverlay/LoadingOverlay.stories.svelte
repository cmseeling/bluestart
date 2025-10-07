<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingOverlay from './LoadingOverlay.svelte';

	const { Story } = defineMeta({
		title: 'Components/LoadingOverlay',
		component: LoadingOverlay
	});
</script>

<Story name="Default"></Story>
