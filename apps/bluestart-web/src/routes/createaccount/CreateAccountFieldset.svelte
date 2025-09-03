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

<fieldset
	class={css({
		display: 'flex',
		flexDirection: 'column'
	})}
>
	<InputContainer hasError={errors?.has('username')}>
		<label>
			Username:
			<Input
				type="text"
				name="username"
				required
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
			<Input type="password" name="password" required hasError={errors?.has('password')} />
		</label>
		{#if errors?.has('password')}
			<span class={css({ color: 'red.500' })}>{errors.get('password')}</span>
		{/if}
	</InputContainer>
	<InputContainer hasError={errors?.has('confirmPassword')}>
		<label>
			Re-type Password:
			<Input
				type="password"
				name="confirmPassword"
				required
				hasError={errors?.has('confirmPassword')}
			/>
		</label>
		{#if errors?.has('confirmPassword')}
			<span class={css({ color: 'red.500' })}>{errors.get('confirmPassword')}</span>
		{/if}
	</InputContainer>
</fieldset>
