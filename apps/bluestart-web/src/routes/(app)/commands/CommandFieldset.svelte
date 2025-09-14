<script lang="ts">
	import Dropdown from '$lib/components/base/dropdown/Dropdown.svelte';
	import Input from '$lib/components/base/input/Input.svelte';
	import InputContainer from '$lib/components/base/inputContainer/InputContainer.svelte';
	import Switch from '$lib/components/base/switch/Switch.svelte';
	import { css } from 'styled-system/css';
	import type { FormData } from './FormData';
	import RadioGroup from '$lib/components/base/radiogroup/RadioGroup.svelte';

	type Props = {
		errors?: Map<string, string>;
		formValues?: FormData;
	};

	const { errors, formValues }: Props = $props();

	let name = $state(formValues?.name);
	let day = $state(formValues?.day);
	let time = $state(formValues?.time);
	let thresholdType = $state(
		formValues?.thresholdType === undefined ? 'below' : formValues.thresholdType
	);
	let externalTemp = $state(formValues?.externalTemp);
	let hvacTemp = $state(formValues?.hvacTemp);
	let defrost = $state(formValues?.defrost === undefined ? false : formValues.defrost);
	let heatedSeats = $state(formValues?.heatedSeats === undefined ? false : formValues.heatedSeats);
</script>

<fieldset>
	<InputContainer hasError={errors?.has('name')}>
		<label>
			Name:
			<Input type="text" name="name" hasError={errors?.has('name')} bind:value={name} />
		</label>
		{#if errors?.has('name')}
			<span class={css({ color: 'red.500' })}>{errors.get('name')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('day')}>
		<label>
			Day:
			<Dropdown name="day" bind:value={day} hasError={errors?.has('day')}>
				<option value="0">Sunday</option>
				<option value="1">Monday</option>
				<option value="2">Tuesday</option>
				<option value="3">Wednesday</option>
				<option value="4">Thursday</option>
				<option value="5">Friday</option>
				<option value="6">Saturday</option>
			</Dropdown>
		</label>
		{#if errors?.has('day')}
			<span class={css({ color: 'red.500' })}>{errors.get('day')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('time')}>
		<label>
			Time:
			<Input type="text" name="time" hasError={errors?.has('time')} bind:value={time} />
		</label>
		{#if errors?.has('time')}
			<span class={css({ color: 'red.500' })}>{errors.get('time')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('externalTemp')}>
		<label for="externalTemp"> Outside Temperature: </label>
		<div class={css({ display: 'flex', flexDirection: 'row', gap: 2 })}>
			<Dropdown
				name="thresholdType"
				bind:value={thresholdType}
				class={css({ flexShrink: 1, width: '6rem' })}
			>
				<option value="above">Above</option>
				<option value="below">Below</option>
			</Dropdown>
			<Input
				type="number"
				name="externalTemp"
				id="externalTemp"
				hasError={errors?.has('externalTemp')}
				class={css({ flexGrow: 1 })}
				bind:value={externalTemp}
			/>
		</div>
		{#if errors?.has('externalTemp')}
			<span class={css({ color: 'red.500' })}>{errors.get('externalTemp')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('hvacTemp')}>
		<label>
			Climate Control Temperature:
			<Input
				type="number"
				name="hvacTemp"
				hasError={errors?.has('hvacTemp')}
				bind:value={hvacTemp}
			/>
		</label>
		{#if errors?.has('hvacTemp')}
			<span class={css({ color: 'red.500' })}>{errors.get('hvacTemp')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('defrost')}>
		<Switch
			bind:checked={defrost}
			name="defrost"
			label="Defrost: "
			hasError={errors?.has('defrost')}
		/>
		{#if errors?.has('defrost')}
			<span class={css({ color: 'red.500' })}>{errors.get('defrost')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('heatedSeats')}>
		<Switch
			bind:checked={heatedSeats}
			name="heatedSeats"
			label="Heated Seats: "
			hasError={errors?.has('heatedSeats')}
		/>
		{#if errors?.has('heatedSeats')}
			<span class={css({ color: 'red.500' })}>{errors.get('heatedSeats')}</span>
		{/if}
	</InputContainer>
</fieldset>
