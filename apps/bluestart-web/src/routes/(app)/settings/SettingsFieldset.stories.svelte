<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SettingsFieldset from './SettingsFieldset.svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const formValues = {
		location: '',
		temperatureUnits: '',
		precipitationUnits: ''
	};

	const errors: Map<string, string> = new SvelteMap();
	errors.set('location', 'Location is required');
	errors.set('temperatureUnits', 'Temperature units are required.');
	errors.set('precipitationUnits', 'Precipitation units are required.');

	const { Story } = defineMeta({
		title: 'Settings/SettingsFieldset',
		component: SettingsFieldset,
		args: {
			formValues
		}
	});
</script>

<Story name="Default" />

<Story name="Error State" args={{ formValues, errors }} />
