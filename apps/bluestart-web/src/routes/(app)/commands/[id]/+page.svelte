<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { css } from 'styled-system/css';
	import CommandFieldset from '../CommandFieldset.svelte';
	import Button from '$lib/components/base/button/Button.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import type { PageProps } from './$types';
	import CommandView from './CommandView.svelte';
	import { page } from '$app/stores';

	const { data, form }: PageProps = $props();

	let viewData = $state(data.formValues);

	let isEditing = $state(false);

	let showSuccessMsg = $state(false);
	let showFailureMsg = $state(false);

	showSuccessMsg = $page.url.searchParams.get('created') === 'success';

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
				errorMessage = result?.data?.error?.message || 'Failed to save settings.';
				showFailureMsg = true;
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
		<h2 class={css({ fontSize: { base: '2xl', md: '4xl' } })}>
			{isEditing ? 'Edit' : 'View'} Command
		</h2>
		{#if isEditing}
			<form method="POST" use:enhance={handleForm}>
				<CommandFieldset errors={form?.errors} />
				<div
					class={css({
						display: 'flex',
						justifyContent: 'flex-end',
						gap: '4'
					})}
				>
					<Button type="submit">Save</Button>
				</div>
			</form>
		{:else}
			<div class={css({ marginBottom: 4 })}>
				<CommandView formValues={viewData} />
			</div>
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
				Command saved successfully!
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
