<script lang="ts">
	import { css } from 'styled-system/css';
	import type { FormData } from '../FormData';
	import { DAYS } from '@bluestart/shared/constants';

	type Props = {
		formValues: FormData;
	};

	const { formValues }: Props = $props();

	let name = formValues.name;
	let day = formValues.day;
	let time = formValues.time;
	let thresholdType = formValues.thresholdType;
	let externalTemp = formValues.externalTemp;
	let hvacTemp = formValues.hvacTemp;
	let defrost = formValues.defrost;
	let heatedSeats = formValues.heatedSeats;
</script>

<div>
	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>Name:</div>
		<div class={css({ fontWeight: 'bold' })}>{name}</div>
	</div>

	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>Day:</div>
		<div class={css({ fontWeight: 'bold' })}>{DAYS[day]}</div>
	</div>

	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>Time:</div>
		<div class={css({ fontWeight: 'bold' })}>{time}</div>
	</div>

	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>External Temperature:</div>
		<div class={css({ fontWeight: 'bold' })}>
			<span class={css({ textTransform: 'capitalize' })}>{thresholdType}</span>
			{externalTemp}
		</div>
	</div>

	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>HVAC Temperature:</div>
		<div class={css({ fontWeight: 'bold' })}>{hvacTemp}</div>
	</div>

	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>Defrost:</div>
		<div class={css({ fontWeight: 'bold' })}>{defrost}</div>
	</div>

	<div
		class={css({
			marginTop: 4,
			borderBottom: '1px solid',
			paddingBottom: 2
		})}
	>
		<div>Heated Seats:</div>
		<div class={css({ fontWeight: 'bold' })}>{heatedSeats}</div>
	</div>
</div>
