<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switch from './Switch.svelte';

	const { Story } = defineMeta({
		title: 'Components/Base/Switch',
		component: Switch,
		args: {
			label: 'Switch'
		}
	});
</script>

<Story name="Default" />

<Story name="Error State" args={{ hasError: true }} />
