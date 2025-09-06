<script lang="ts">
	import { css } from 'styled-system/css';
	import type { Geolocation } from '@bluestart/database/types';

	type Props = {
		formValues: {
			location?: string;
			geolocation?: Geolocation;
			temperatureUnits?: string;
			precipitationUnits?: string;
		};
	};

	const { formValues }: Props = $props();

	let location = formValues.location;
	let geolocation = formValues.geolocation;
	let temperatureUnits = formValues.temperatureUnits;
	let precipitationUnits = formValues.precipitationUnits;
</script>

<div>
	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>Location:</div>
		<div class={css({ fontWeight: 'bold' })}>{location}</div>
		<div>
			<span class={css({ fontSize: 'xs', marginRight: 4 })}>Lat: {geolocation?.latitude}</span>
			<span class={css({ fontSize: 'xs' })}>Lon: {geolocation?.longitude}</span>
		</div>
	</div>

	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>Temperature Units:</div>
		<div class={css({ fontWeight: 'bold', textTransform: 'capitalize' })}>{temperatureUnits}</div>
	</div>

	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>Precipitation Units:</div>
		<div class={css({ fontWeight: 'bold', textTransform: 'capitalize' })}>{precipitationUnits}</div>
	</div>
</div>
