<script lang="ts">
	import Dropdown from '$lib/components/base/dropdown/Dropdown.svelte';
	import Input from '$lib/components/base/input/Input.svelte';
	import InputContainer from '$lib/components/base/inputContainer/InputContainer.svelte';
	import Switch from '$lib/components/base/switch/Switch.svelte';
	import { css } from 'styled-system/css';

	type Props = {
		errors?: Map<string, string>;
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
	let defrost = $state(formValues?.defrost === undefined ? false : formValues.defrost);
	let heatedSeats = $state(formValues?.heatedSeats === undefined ? false : formValues.heatedSeats);
</script>

<fieldset>
	<InputContainer hasError={errors?.has('name')}>
		<label>
			Name:
			<Input type="text" name="name" required hasError={errors?.has('name')} bind:value={name} />
		</label>
		{#if errors?.has('name')}
			<span class={css({ color: 'red.500' })}>{errors.get('name')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('day')}>
		<label>
			Day:
			<Dropdown name="day" bind:value={day} required hasError={errors?.has('day')}>
				<option value="Sunday">Sunday</option>
				<option value="Monday">Monday</option>
				<option value="Tuesday">Tuesday</option>
				<option value="Wednesday">Wednesday</option>
				<option value="Thursday">Thursday</option>
				<option value="Friday">Friday</option>
				<option value="Saturday">Saturday</option>
			</Dropdown>
		</label>
		{#if errors?.has('day')}
			<span class={css({ color: 'red.500' })}>{errors.get('day')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('time')}>
		<label>
			Time:
			<Input type="text" name="time" required hasError={errors?.has('time')} bind:value={time} />
		</label>
		{#if errors?.has('time')}
			<span class={css({ color: 'red.500' })}>{errors.get('time')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('thresholdType')}>
		<label>
			Threshold Type:
			<Dropdown
				name="thresholdType"
				bind:value={thresholdType}
				required
				hasError={errors?.has('thresholdType')}
			>
				<option value="above">Above</option>
				<option value="below">Below</option>
			</Dropdown>
		</label>
		{#if errors?.has('thresholdType')}
			<span class={css({ color: 'red.500' })}>{errors.get('thresholdType')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('externalTemp')}>
		<label>
			Temperature:
			<Input
				type="number"
				name="externalTemp"
				required
				hasError={errors?.has('externalTemp')}
				bind:value={externalTemp}
			/>
		</label>
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
				required
				hasError={errors?.has('hvacTemp')}
				bind:value={hvacTemp}
			/>
		</label>
		{#if errors?.has('hvacTemp')}
			<span class={css({ color: 'red.500' })}>{errors.get('hvacTemp')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('defrost')}>
		<Switch bind:checked={defrost} label="Defrost: " hasError={errors?.has('defrost')} />
		{#if errors?.has('defrost')}
			<span class={css({ color: 'red.500' })}>{errors.get('defrost')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('heatedSeats')}>
		<Switch
			bind:checked={heatedSeats}
			label="Heated Seats: "
			hasError={errors?.has('heatedSeats')}
		/>
		{#if errors?.has('heatedSeats')}
			<span class={css({ color: 'red.500' })}>{errors.get('heatedSeats')}</span>
		{/if}
	</InputContainer>
</fieldset>
