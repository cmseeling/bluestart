<script lang="ts">
	import { css } from 'styled-system/css';
	import CreateAccountFieldset from './CreateAccountFieldset.svelte';
	import Button from '$lib/components/base/button/Button.svelte';

	const { form } = $props();
</script>

<div
	class={css({
		display: 'flex',
		flexDirection: { base: 'column', md: 'row' },
		alignItems: 'center',
		justifyContent: { base: 'flex-start', md: 'center' },
		minHeight: '100vh'
	})}
>
	<div
		class={css({
			width: { base: 'full', md: '80' }
		})}
	>
		<h1
			class={css({
				fontSize: { base: '3xl', md: '6xl' },
				textAlign: 'center',
				marginBottom: '8'
			})}
		>
			Welcome to Bluestart!
		</h1>
		{#if form?.success}
			<p>
				Your account has been created. <a
					href="/"
					class={css({
						fontWeight: 'bold',
						textDecoration: 'underline'
					})}>Click here</a
				> to go to the home page.
			</p>
		{:else}
			<p
				class={css({
					fontSize: { base: 'xl', mdDown: '2xl' },
					marginBottom: '4'
				})}
			>
				To get started, please create your account.
			</p>
			<form method="POST">
				<CreateAccountFieldset formValues={form?.formValues} errors={form?.errors} />
				<div
					class={css({
						display: 'flex',
						justifyContent: 'flex-end'
					})}
				>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		{/if}
	</div>
</div>
