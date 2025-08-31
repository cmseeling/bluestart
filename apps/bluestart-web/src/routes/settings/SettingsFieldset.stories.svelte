<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SettingsFieldset from './SettingsFieldset.svelte';

	const { Story } = defineMeta({
		title: 'Settings/SettingsFieldset',
		component: SettingsFieldset
	});
</script>

<Story name="Default" />
