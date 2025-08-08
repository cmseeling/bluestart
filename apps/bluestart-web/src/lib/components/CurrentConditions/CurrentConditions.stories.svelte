<script module>
	import { TemparatureUnits } from '@bluestart/database/enums';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CurrentConditions from './CurrentConditions.svelte';

	const currentConditions = {
		FeelsLikeC: '16',
		FeelsLikeF: '60',
		cloudcover: '25',
		humidity: '44',
		localObsDateTime: '2025-05-03 01:51 PM',
		observation_time: '06:51 PM',
		precipInches: '0.0',
		precipMM: '0.0',
		pressure: '1018',
		pressureInches: '30',
		temp_C: '15',
		temp_F: '59',
		uvIndex: '7',
		visibility: '16',
		visibilityMiles: '9',
		weatherCode: '113',
		weatherDesc: [
			{
				value: 'Sunny'
			}
		],
		weatherIconUrl: [
			{
				value: ''
			}
		],
		winddir16Point: 'W',
		winddirDegree: '277',
		windspeedKmph: '4',
		windspeedMiles: '2'
	};

	const { Story } = defineMeta({
		title: 'Components/CurrentConditions',
		component: CurrentConditions,
		args: {
			currentConditions,
			temperatureUnits: TemparatureUnits.Fahrenheit
		}
	});
</script>

<Story name="Default" />
