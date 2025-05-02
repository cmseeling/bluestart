<script lang="ts">
	import Input from '$lib/components/base/input/Input.svelte';
	import { css, cva } from 'styled-system/css';

	type Props = {
		errors?: {
			username: boolean;
			passwordGeneric: boolean;
            passwordStrength: boolean;
		};
		formValues?: {
			username?: FormDataEntryValue | null;
		};
	};

	const { errors, formValues }: Props = $props();
	console.log(errors);

	let username = $state(formValues?.username);
	
	const fieldStyle = cva({
		base: {
			marginBottom: '4'
		},
		variants: {
			error: {
				true: { color: 'red.500' },
				false: {}
			}
		},
		defaultVariants: {
			error: false
		}
	});
</script>

<fieldset
	class={css({
		display: 'flex',
		flexDirection: 'column'
	})}
>
	<div class={fieldStyle({ error: errors?.username })}>
		<label>
			Username:
			<Input
				type="text"
				name="username"
				required
				hasError={errors?.username}
				bind:value={username}
			/>
		</label>
		{#if errors?.username}
			<span class={css({ color: 'red.500' })}>Username cannot be empty.</span>
		{/if}
	</div>
	<div class={fieldStyle({ error: errors?.passwordGeneric || errors?.passwordStrength })}>
		<label>
			Password:
			<Input
				type="password"
				name="password"
				required
				hasError={errors?.passwordGeneric || errors?.passwordStrength}
			/>
		</label>
		{#if errors?.passwordGeneric}
			<span class={css({ color: 'red.500' })}>Password cannot be empty.</span>
		{/if}
        {#if errors?.passwordStrength}
			<span class={css({ color: 'red.500' })}>Password must be greater than 8 characters.</span>
		{/if}
	</div>
	<div class={fieldStyle({ error: errors?.passwordGeneric })}>
		<label>
			Re-type Password:
			<Input
				type="password"
				name="confirmPassword"
				required
				hasError={errors?.passwordGeneric}
			/>
		</label>
		{#if errors?.passwordGeneric}
			<span class={css({ color: 'red.500' })}>Passwords must match.</span>
		{/if}
	</div>
</fieldset>
