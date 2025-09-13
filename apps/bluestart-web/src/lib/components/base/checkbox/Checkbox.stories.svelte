<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Components/Base/Checkbox',
		component: Checkbox,
		args: {
			label: 'Checkbox'
		}
	});
</script>

<Story name="Default" />

<Story name="Error State" args={{ hasError: true }} />
