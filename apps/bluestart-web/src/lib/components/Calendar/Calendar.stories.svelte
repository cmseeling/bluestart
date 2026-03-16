<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Calendar from './Calendar.svelte';

	const { Story } = defineMeta({
		title: 'Components/Calendar/Calendar',
		component: Calendar
	});
</script>

<Story name="Default" />
