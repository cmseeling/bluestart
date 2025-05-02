<script>
	import Schedule from '$lib/components/Schedule/Schedule.svelte';
	import { CommandType } from '@bluestart/db/enums';
	import { css } from 'styled-system/css';

	let days = new Map([
		[
			'Monday',
			[
				{
					id: '1',
					name: 'Monday Morning 1',
					day: 'Monday',
					activationTime: '07:25:00',
					settings: {
						id: '1',
						commandType: CommandType.Charging,
						commandId: '1',
						locationId: null,
						tempAbove: null,
						tempBelow: null,
						tempUnits: null,
						hvacTemp: null,
						defrost: null,
						heatedFeatures: null
					},
					pauseDates: [],
					delays: []
				},
				{
					id: '1',
					name: 'Monday Morning 2',
					day: 'Monday',
					activationTime: '07:25:00',
					settings: {
						id: '1',
						commandType: CommandType.Charging,
						commandId: '1',
						locationId: null,
						tempAbove: null,
						tempBelow: null,
						tempUnits: null,
						hvacTemp: null,
						defrost: null,
						heatedFeatures: null
					},
					pauseDates: [],
					delays: []
				},
				{
					id: '1',
					name: 'Monday Afternoon 1',
					day: 'Monday',
					activationTime: '16:25:00',
					settings: {
						id: '1',
						commandType: CommandType.Charging,
						commandId: '1',
						locationId: null,
						tempAbove: null,
						tempBelow: null,
						tempUnits: null,
						hvacTemp: null,
						defrost: null,
						heatedFeatures: null
					},
					pauseDates: [],
					delays: []
				}
			]
		],
		[
			'Tuesday',
			[
				{
					id: '2',
					name: 'Tuesday Morning 1',
					day: 'Tuesday',
					activationTime: '08:00:00',
					settings: {
						id: '2',
						commandType: CommandType.Charging,
						commandId: '2',
						locationId: null,
						tempAbove: null,
						tempBelow: null,
						tempUnits: null,
						hvacTemp: null,
						defrost: null,
						heatedFeatures: null
					},
					pauseDates: [],
					delays: []
				}
			]
		]
	]);
</script>

<h1 class={css({ fontSize: 'lg', fontWeight: 'bold' })}>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Schedule {days} />
