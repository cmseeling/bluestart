<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Schedule from './Schedule.svelte';
	import { CommandType } from '@bluestart/database/enums';

	const { Story } = defineMeta({
		title: 'Components/Schedule',
		component: Schedule,
		args: {
			days: new Map([
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
			])
		}
	});
</script>

<Story name="Default" />
