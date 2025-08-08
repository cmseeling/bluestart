<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dropdown from './Dropdown.svelte';

	const { Story } = defineMeta({
		title: 'Components/Base/Dropdown',
		component: Dropdown
	});
</script>

<Story name="Default">
	<option value="Sunday">Sunday</option>
	<option value="Monday">Monday</option>
	<option value="Tuesday">Tuesday</option>
	<option value="Wednesday">Wednesday</option>
	<option value="Thursday">Thursday</option>
	<option value="Friday">Friday</option>
	<option value="Saturday">Saturday</option>
</Story>

<Story name="Error State">
	<option value="above">Above</option>
	<option value="below">Below</option>
</Story>
