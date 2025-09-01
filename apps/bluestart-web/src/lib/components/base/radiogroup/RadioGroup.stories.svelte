<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RadioGroup from './RadioGroup.svelte';

	const items = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' }
	];

	const { Story } = defineMeta({
		title: 'Components/Base/RadioGroup',
		component: RadioGroup
	});
</script>

<Story name="Default" args={{ items }}></Story>

<Story name="Horizontal" args={{ items, orientation: 'horizontal' }} />

<Story name="Error State" args={{ items, hasError: true }} />
