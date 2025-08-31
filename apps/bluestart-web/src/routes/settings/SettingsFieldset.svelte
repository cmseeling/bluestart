<script lang="ts">
	import Dropdown from '$lib/components/base/dropdown/Dropdown.svelte';
	import Input from '$lib/components/base/input/Input.svelte';
	import InputContainer from '$lib/components/base/inputContainer/InputContainer.svelte';
	import { css } from 'styled-system/css';

	type Props = {
		errors?: Map<string, string>;
		formValues?: {
			location?: FormDataEntryValue | null;
			temperatureUnits?: FormDataEntryValue | null;
			precipitationUnits?: FormDataEntryValue | null;
		};
	};

	const { errors, formValues }: Props = $props();
	console.log(errors);
	// console.log(formValues);

	let location = $state(formValues?.location);
	let temperatureUnits = $state(formValues?.temperatureUnits);
	let precipitationUnits = $state(formValues?.precipitationUnits);
</script>

<fieldset>
	<InputContainer hasError={errors?.has('location')}>
		<label>
			Location:
			<Input
				type="text"
				name="location"
				placeholder="location"
				hasError={errors?.has('location')}
				bind:value={location}
			/>
		</label>
		{#if errors?.has('location')}
			<span class={css({ color: 'red.500' })}>Location cannot be empty.</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('temperatureUnits')}>
		<label>
			Temperature Units:
			<Dropdown name="temperatureUnits" bind:value={temperatureUnits}>
				<option value=""></option>
				<option value="celsius">Celsius</option>
				<option value="fahrenheit">Fahrenheit</option>
			</Dropdown>
		</label>
		{#if errors?.has('temperatureUnits')}
			<span class={css({ color: 'red.500' })}>Temperature units cannot be empty.</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('precipitationUnits')}>
		<label>
			Precipitation Units:
			<Dropdown name="precipitationUnits" bind:value={precipitationUnits}>
				<option value=""></option>
				<option value="mm">Millimeters</option>
				<option value="inch">Inches</option>
			</Dropdown>
		</label>
		{#if errors?.has('precipitationUnits')}
			<span class={css({ color: 'red.500' })}>Precipitation units cannot be empty.</span>
		{/if}
	</InputContainer>
</fieldset>
