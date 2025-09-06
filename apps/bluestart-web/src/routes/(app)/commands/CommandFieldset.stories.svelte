<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CommandFieldset from './CommandFieldset.svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const errors: Map<string, string> = new SvelteMap();
	errors.set('name', 'Name cannot be empty.');
	errors.set('day', 'Day cannot be empty.');
	errors.set('time', 'Time cannot be empty.');
	errors.set('thresholdType', 'Threshold type cannot be empty.');
	errors.set('externalTemp', 'External temperature cannot be empty.');
	errors.set('hvacTemp', 'HVAC temperature cannot be empty.');
	errors.set('defrost', 'Error parsing defrost setting');
	errors.set('heatedSeats', 'Error parsing heated seats setting');

	const { Story } = defineMeta({
		title: 'Commands/CommandFieldset',
		component: CommandFieldset
	});
</script>

<Story name="Default" />

<Story name="Error State" args={{ errors }} />
