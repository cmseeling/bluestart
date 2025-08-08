<script lang="ts">
	import { css } from 'styled-system/css';
	import WeatherIcon from '$lib/components/base/WeatherIcon/WeatherIcon.svelte';
	// import type { CurrentCondition } from '@bluestart/weather-api/wttr';
	import { TemparatureUnits } from '@bluestart/database/enums';
	// import { WWWOCodes } from '@bluestart/weather-api';

	type Props = {
		currentConditions: CurrentCondition;
		temperatureUnits: TemparatureUnits;
	};

	let { currentConditions, temperatureUnits }: Props = $props();

	const code = parseInt(currentConditions.weatherCode, 10);
	const weatherCondition = WWWOCodes.get(code) ?? 'Sunny';
</script>

<div
	class={css({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	})}
>
	<WeatherIcon {weatherCondition} />
	<div>
		{#if temperatureUnits === TemparatureUnits.Celsius}
			{currentConditions.temp_C}&deg;C
		{:else}
			{currentConditions.temp_F}&deg;F
		{/if}
	</div>
	<div>
		{currentConditions.weatherDesc[0].value}
	</div>
</div>
