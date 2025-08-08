<script lang="ts">
	import { cellStyle } from '$lib/styles/cell';
	import type { CommandWithAllData } from '@bluestart/database/types';
	import { css } from 'styled-system/css';
	import DayCommands from './DayCommands.svelte';

	type Props = {
		days: Map<string, CommandWithAllData[]>;
		// startHour: number;
		// endHour: number;
		// format: '12' | '24';
	};

	const {
		days
		// startHour = 0,
		// endHour = 24,
		// format = '24'
	}: Props = $props();
	const dayNames = days.keys();
	const allTimes = Array.from(days.values())
		.flatMap((day) => day.map((command) => command.activationTime))
		.sort();
	const activationTimes = [...new Set(allTimes)]; // Remove duplicates
	console.log(activationTimes);
</script>

<div
	data-componentName="schedule"
	class={css({
		border: '1px solid black',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	})}
>
	<div
		class={css({
			display: 'fex',
			flexDirection: 'column',
			flexGrow: 1
		})}
	>
		<div class={css(cellStyle)}>Times</div>
		{#each activationTimes as time}
			<div class={css(cellStyle)}>{time}</div>
		{/each}
	</div>
	{#each dayNames as dayName}
		<DayCommands name={dayName} commands={days.get(dayName) || []} timeSlots={activationTimes} />
	{/each}
</div>
