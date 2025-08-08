<script lang="ts">
	import Input from '$lib/components/base/input/Input.svelte';
	import InputContainer from '$lib/components/base/inputContainer/InputContainer.svelte';
	import { css } from 'styled-system/css';
	import Dropdown from '../base/dropdown/Dropdown.svelte';

	type Props = {
		errors?: {
			name: boolean;
			day: boolean;
			time: boolean;
			externalTemp: boolean;
			hvacTemp: boolean;
		};
		formValues?: {
			name?: string;
			day?: string;
			time?: string;
			thresholdType?: 'above' | 'below';
			externalTemp?: number;
			hvacTemp?: number;
			defrost?: boolean;
			heatedSeats?: boolean;
		};
	};

	const { errors, formValues }: Props = $props();

	let name = $state(formValues?.name);
	let day = $state(formValues?.day);
	let time = $state(formValues?.time);
	let thresholdType = $state(formValues?.thresholdType);
	let externalTemp = $state(formValues?.externalTemp);
	let hvacTemp = $state(formValues?.hvacTemp);
	let defrost = $state(formValues?.defrost);
	let heatedSeats = $state(formValues?.heatedSeats);
</script>

<fieldset>
	<InputContainer hasError={errors?.name}>
		<label>
			Name:
			<Input type="text" name="name" required hasError={errors?.name} bind:value={name} />
		</label>
		{#if errors?.name}
			<span class={css({ color: 'red.500' })}>Name cannot be empty.</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.day}>
		<label>
			Day:
			<Dropdown name="day" bind:value={day} required>
				<option value="Sunday">Sunday</option>
				<option value="Monday">Monday</option>
				<option value="Tuesday">Tuesday</option>
				<option value="Wednesday">Wednesday</option>
				<option value="Thursday">Thursday</option>
				<option value="Friday">Friday</option>
				<option value="Saturday">Saturday</option>
			</Dropdown>
		</label>
		{#if errors?.day}
			<span class={css({ color: 'red.500' })}>Day cannot be empty.</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.time}>
		<label>
			Time:
			<Input type="text" name="time" required hasError={errors?.time} bind:value={time} />
		</label>
		{#if errors?.time}
			<span class={css({ color: 'red.500' })}>Time cannot be empty.</span>
		{/if}
	</InputContainer>
	<InputContainer>
		<label>
			Threshold Type:
			<Dropdown name="thresholdType" bind:value={thresholdType} required>
				<option value="above">Above</option>
				<option value="below">Below</option>
			</Dropdown>
		</label>
	</InputContainer>
	<InputContainer hasError={errors?.externalTemp}>
		<label>
			Temperature:
			<Input
				type="number"
				name="externalTemp"
				required
				hasError={errors?.externalTemp}
				bind:value={externalTemp}
			/>
		</label>
		{#if errors?.externalTemp}
			<span class={css({ color: 'red.500' })}>External temperature is required.</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.hvacTemp}>
		<label>
			Climate Control Temperature:
			<Input
				type="number"
				name="hvacTemp"
				required
				hasError={errors?.hvacTemp}
				bind:value={hvacTemp}
			/>
		</label>
		{#if errors?.hvacTemp}
			<span class={css({ color: 'red.500' })}>HVAC temperature is required.</span>
		{/if}
	</InputContainer>
	<InputContainer>
		<label>
			Defrost:
			<input type="checkbox" name="defrost" bind:checked={defrost} />
		</label>
	</InputContainer>
	<InputContainer>
		<label>
			Heated Seats:
			<input type="checkbox" name="heatedSeats" bind:checked={heatedSeats} />
		</label>
	</InputContainer>
</fieldset>
