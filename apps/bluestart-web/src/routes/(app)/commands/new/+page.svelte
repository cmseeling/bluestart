<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { css } from 'styled-system/css';
	import CommandFieldset from '../CommandFieldset.svelte';
	import Button from '$lib/components/base/button/Button.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import type { PageProps } from './$types';

	const { form }: PageProps = $props();

	let showFailureMsg = $state(false);

	const hideStatusMessages = () => {
		showFailureMsg = false;
	};

	let errorMessage = $state('Failed to save command.');

	const handleForm = () => {
		hideStatusMessages();
		return async ({ result }: { result: ActionResult }) => {
			console.log(result);
			if (result.type === 'failure') {
				errorMessage = result?.data?.error?.message || 'Failed to save command.';
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
		<h2 class={css({ fontSize: { base: '2xl', md: '4xl' } })}>New Command</h2>
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
