<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingOverlay from './LoadingOverlay.svelte';
	import LoadingOverlayOn from '$lib/storybook/LoadingOverlayOn.svelte';

	const { Story } = defineMeta({
		title: 'Components/LoadingOverlay',
		component: LoadingOverlay,
		args: {
			children: LoadingOverlayOn
		}
	});
</script>

<Story name="Default"></Story>
