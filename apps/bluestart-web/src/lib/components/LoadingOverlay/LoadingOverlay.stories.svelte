<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingOverlay from './LoadingOverlay.svelte';

	const { Story } = defineMeta({
		title: 'Components/LoadingOverlay',
		component: LoadingOverlay
	});
</script>

<Story name="Default"></Story>

<Story name="With Children">
	<LoadingOverlay>
		<p>This is a child element.</p>
	</LoadingOverlay>
</Story>
