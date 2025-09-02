<script lang="ts">
	import Input from '$lib/components/base/input/Input.svelte';
	import InputContainer from '$lib/components/base/inputContainer/InputContainer.svelte';
	import RadioGroup from '$lib/components/base/radiogroup/RadioGroup.svelte';
	import { css } from 'styled-system/css';

	type Props = {
		formValues: {
			location?: string;
			temperatureUnits: string;
			precipitationUnits: string;
		};
		errors?: Map<string, string>;
	};

	const { formValues, errors }: Props = $props();

	let location = $state(formValues.location);
	let temperatureUnits = $state(formValues.temperatureUnits);
	let precipitationUnits = $state(formValues.precipitationUnits);
</script>

<fieldset>
	<InputContainer hasError={errors?.has('location')}>
		<label>
			Location:
			<Input
				type="text"
				name="location"
				placeholder="location"
				required
				hasError={errors?.has('location')}
				bind:value={location}
			/>
		</label>
		{#if errors?.has('location')}
			<span class={css({ color: 'red.500' })}>{errors.get('location')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('temperatureUnits')}>
		<label>
			Temperature Units:
			<RadioGroup
				items={[
					{ label: 'Celsius', value: 'celsius' },
					{ label: 'Fahrenheit', value: 'fahrenheit' }
				]}
				bind:value={temperatureUnits}
				name="temperatureUnits"
				required
				hasError={errors?.has('temperatureUnits')}
				orientation="horizontal"
			/>
		</label>
		{#if errors?.has('temperatureUnits')}
			<span class={css({ color: 'red.500' })}>{errors.get('temperatureUnits')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('precipitationUnits')}>
		<label>
			Precipitation Units:
			<RadioGroup
				items={[
					{ label: 'Millimeters', value: 'mm' },
					{ label: 'Inches', value: 'inch' }
				]}
				bind:value={precipitationUnits}
				name="precipitationUnits"
				required
				hasError={errors?.has('precipitationUnits')}
				orientation="horizontal"
			/>
		</label>
		{#if errors?.has('precipitationUnits')}
			<span class={css({ color: 'red.500' })}>{errors.get('precipitationUnits')}</span>
		{/if}
	</InputContainer>
</fieldset>
