<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './TimeInput.svelte';

	const { Story } = defineMeta({
		title: 'Components/Base/TimeInput',
		component: Input
	});
</script>

<Story name="Default" args={{ placeholder: 'placeholder', type: 'time' }} />

<Story name="Error State" args={{ hasError: true }} />
