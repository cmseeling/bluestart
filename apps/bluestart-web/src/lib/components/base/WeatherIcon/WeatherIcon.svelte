<script lang="ts">
	import { css } from 'styled-system/css';
	import type { WeatherConditions } from '@bluestart/weather-api';
	import ClearDayFill from 'virtual:icons/meteocons/clear-day-fill';
	import CloudyFill from 'virtual:icons/meteocons/cloudy-fill';
	import PartlyCloudyFill from 'virtual:icons/meteocons/partly-cloudy-day-fill';
	import Fog from 'virtual:icons/game-icons/fog';
	import RainFill from 'virtual:icons/meteocons/rain-fill';
	import SleetFill from 'virtual:icons/meteocons/sleet-fill';
	import SnowFill from 'virtual:icons/meteocons/snow-fill';
	import ThunderstormFill from 'virtual:icons/meteocons/thunderstorms-fill';
	import ThunderstormSnowFill from 'virtual:icons/meteocons/thunderstorms-snow-fill';
	import RaindropFill from 'virtual:icons/meteocons/raindrop-fill';
	import SnowflakeFill from 'virtual:icons/meteocons/snowflake-fill';

	type Props = {
		weatherCondition: WeatherConditions;
	};

	let { weatherCondition }: Props = $props();

	const cloudySet = ['Cloudy', 'VeryCloudy'];
	const partlyCloudySet = ['PartlyCloudy'];
	const fogSet = ['Fog'];
	const lightRainSet = ['LightRain', 'LightShowers'];
	const heavyRainSet = ['HeavyRain', 'HeavyShowers'];
	const sleetSet = ['LightSleet', 'LightSleetShowers'];
	const lightSnowSet = ['LightSnow', 'LightSnowShowers'];
	const heavySnowSet = ['HeavySnow', 'HeavySnowShowers'];
	const thunderstormSet = ['ThunderyHeavyRain', 'ThunderyShowers'];
	const thunderstormSnowSet = ['ThunderySnowShowers'];
	const clearSet = ['Sunny'];

	const containerStyle = css.raw({
		maxW: '12rem',
		maxH: '12rem'
	});
</script>

{#if cloudySet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<CloudyFill style="font-size: 10rem" />
	</div>
{:else if partlyCloudySet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<PartlyCloudyFill style="font-size: 10rem" />
	</div>
{:else if fogSet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<Fog style="font-size: 10rem" />
	</div>
{:else if lightRainSet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<RainFill style="font-size: 8rem;" />
		<RaindropFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '3rem', left: '4rem' })}
		/>
	</div>
{:else if heavyRainSet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<RainFill style="font-size: 7rem;" />
		<RaindropFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '3rem', left: '3rem' })}
		/>
        <RaindropFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '6rem', left: '2rem' })}
		/>
	</div>
{:else if sleetSet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<SleetFill style="font-size: 7rem" />
        <RaindropFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '3rem', left: '4rem' })}
		/>
        <SnowflakeFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '6rem', left: '2rem' })}
		/>
	</div>
{:else if lightSnowSet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<SnowFill style="font-size: 7rem" />
        <SnowflakeFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '3rem', left: '4rem' })}
		/>
	</div>
{:else if heavySnowSet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<SnowFill style="font-size: 7rem" />
        <SnowflakeFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '3rem', left: '4rem' })}
		/>
        <SnowflakeFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '6rem', left: '2rem' })}
		/>
	</div>
{:else if thunderstormSet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<ThunderstormFill style="font-size: 10rem" />
	</div>
{:else if thunderstormSnowSet.includes(weatherCondition)}
	<div class={css(containerStyle)}>
		<ThunderstormSnowFill style="font-size: 7rem" />
        <SnowflakeFill
			style="font-size: 3rem;"
			class={css({ position: 'relative', bottom: '3rem', left: '4rem' })}
		/>
	</div>
{:else}
	<div class={css(containerStyle)}>
		<ClearDayFill style="font-size: 10rem" />
	</div>
{/if}
