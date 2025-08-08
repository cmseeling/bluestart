<script lang="ts">
	// import Input from '$lib/components/base/input/Input.svelte';
	// import InputContainer from '$lib/components/base/inputContainer/InputContainer.svelte';
	// import { css } from 'styled-system/css';

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
	console.log(errors)

	let username = $state(formValues?.username);
</script>

<fieldset>
	<div>
		<label>
			Username:
			<input
				type="text"
				name="username"
				autocomplete="username"
				required
				placeholder="username"
				bind:value={username}
			/>
		</label>
		{#if errors?.username}
			<span>Username cannot be empty.</span>
		{/if}
	</div>
	<div>
		<label>
			Password:
			<input type="password" name="password" autocomplete="current-password" required />
		</label>
		{#if errors?.password}
			<span>Incorrect password.</span>
		{/if}
	</div>
</fieldset>
