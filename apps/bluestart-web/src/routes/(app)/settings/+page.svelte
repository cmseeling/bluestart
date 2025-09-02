<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/base/button/Button.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { css } from 'styled-system/css';
	import type { PageProps } from './$types';
	import SettingsFieldset from './SettingsFieldset.svelte';

	const { data, form }: PageProps = $props();

	// also zodify other forms (login, register)

	let showSuccessMsg = $state(false);
	let showFailureMsg = $state(false);
	let errorMessage = $state('Failed to save settings.');

	const handleForm = () => {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				showSuccessMsg = true;
			} else if (result.type === 'failure') {
				showFailureMsg = true;
				errorMessage = result?.data?.error?.message || 'Failed to save settings.';
			}
			await applyAction(result);
		};
	};
</script>

<div
	class={css({
		marginTop: '4',
		marginX: '6',
		display: 'flex'
	})}
>
	<div class={css({ flex: 1 })}>
		<h2
			class={css({
				fontSize: { base: '2xl', md: '4xl' }
			})}
		>
			Settings
		</h2>
		<form
			method="POST"
			use:enhance={handleForm}
			class={css({ borderTop: '1px solid', paddingTop: '4' })}
		>
			<SettingsFieldset formValues={data.formValues} errors={form?.errors} />
			<div
				class={css({
					display: 'flex',
					justifyContent: 'flex-end'
				})}
			>
				<Button type="submit">Save</Button>
			</div>
		</form>
		{#if showSuccessMsg}
			<p
				class={css({
					marginTop: '8',
					backgroundColor: 'green',
					color: 'text.dark',
					textAlign: 'center',
					rounded: 'md',
					padding: '2'
				})}
			>
				Settings saved successfully!
			</p>
		{/if}
		{#if showFailureMsg}
			<p
				class={css({
					marginTop: '8',
					backgroundColor: 'red',
					color: 'text.dark',
					textAlign: 'center',
					rounded: 'md',
					padding: '2'
				})}
			>
				{errorMessage}
			</p>
		{/if}
	</div>
	<div class={css({ flex: 1 })}></div>
</div>
