<script lang="ts">
	import Input from '$lib/components/base/input/Input.svelte';
	import InputContainer from '$lib/components/base/inputContainer/InputContainer.svelte';
	import { css } from 'styled-system/css';

	type Props = {
		errors?: Map<string, string>;
		formValues?: {
			username?: FormDataEntryValue | null;
		};
	};

	const { errors, formValues }: Props = $props();

	let username = $state(formValues?.username);
</script>

<fieldset>
	<InputContainer hasError={errors?.has('username')}>
		<label>
			Username:
			<Input
				type="text"
				name="username"
				autocomplete="username"
				placeholder="username"
				hasError={errors?.has('username')}
				bind:value={username}
			/>
		</label>
		{#if errors?.has('username')}
			<span class={css({ color: 'red.500' })}>{errors.get('username')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('password')}>
		<label>
			Password:
			<Input
				type="password"
				name="password"
				autocomplete="current-password"
				hasError={errors?.has('password')}
			/>
		</label>
		{#if errors?.has('password')}
			<span class={css({ color: 'red.500' })}>{errors.get('password')}</span>
		{/if}
	</InputContainer>
</fieldset>
