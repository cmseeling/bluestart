<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/base/button/Button.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { css } from 'styled-system/css';
	import type { PageProps } from './$types';
	import SettingsFieldset from './SettingsFieldset.svelte';
	import SettingsView from './SettingsView.svelte';

	const { data, form }: PageProps = $props();

	let viewData = $state(data.formValues);

	let isEditing = $state(false);

	let showSuccessMsg = $state(false);
	let showFailureMsg = $state(false);

	const hideStatusMessages = () => {
		showSuccessMsg = false;
		showFailureMsg = false;
	};

	let errorMessage = $state('Failed to save settings.');

	const handleForm = () => {
		return async ({ result }: { result: ActionResult }) => {
			console.log(result);
			if (result.type === 'success') {
				viewData = result.data?.formValues;
				isEditing = false;
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
		{#if isEditing}
			<form
				method="POST"
				use:enhance={handleForm}
				class={css({ borderTop: '1px solid', paddingTop: '4' })}
			>
				<SettingsFieldset formValues={data.formValues} errors={form?.errors} />
				<div
					class={css({
						display: 'flex',
						justifyContent: 'flex-end',
						gap: '4'
					})}
				>
					<Button
						type="button"
						onclick={() => {
							hideStatusMessages();
							isEditing = false;
						}}>Cancel</Button
					>
					<Button type="submit">Save</Button>
				</div>
			</form>
		{:else}
			<div class={css({ marginBottom: 4 })}>
				<SettingsView formValues={viewData} />
			</div>
			<Button
				onclick={() => {
					hideStatusMessages();
					isEditing = true;
				}}>Edit</Button
			>
		{/if}
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
