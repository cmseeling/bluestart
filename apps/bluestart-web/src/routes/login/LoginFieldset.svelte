<script lang="ts">
	import Input from '$lib/components/base/input/Input.svelte';
	import InputContainer from '$lib/components/base/inputContainer/InputContainer.svelte';
	import { css } from 'styled-system/css';

	type Props = {
		errors?: {
			username: boolean;
			password: boolean;
		};
		formValues?: {
			username?: FormDataEntryValue | null;
		};
	};

	const { errors, formValues }: Props = $props();

	let username = $state(formValues?.username);
</script>

<fieldset>
	<InputContainer hasError={errors?.username}>
		<label>
			Username:
			<Input
				type="text"
				name="username"
				autocomplete="username"
				required
				placeholder="username"
				hasError={errors?.username}
				bind:value={username}
			/>
		</label>
		{#if errors?.username}
			<span class={css({ color: 'red.500' })}>Username cannot be empty.</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.password}>
		<label>
			Password:
			<Input
				type="password"
				name="password"
				autocomplete="current-password"
				required
				hasError={errors?.password}
			/>
		</label>
		{#if errors?.password}
			<span class={css({ color: 'red.500' })}>Incorrect password.</span>
		{/if}
	</InputContainer>
</fieldset>
