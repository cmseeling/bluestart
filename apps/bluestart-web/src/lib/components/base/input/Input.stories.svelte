<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';

	const { Story } = defineMeta({
		title: 'Components/Base/Input',
		component: Input
	});
</script>

<Story name="Default" args={{ placeholder: 'placeholder' }} />

<Story name="Error State" args={{ hasError: true }} />
