<script lang="ts">
	import { css } from 'styled-system/css';
	import CreateMasterAccountFieldset from './CreateMasterAccountFieldset.svelte';
	import Button from '$lib/components/base/button/Button.svelte';

	const { form } = $props();
</script>

<h1
	class={css({
		fontSize: { base: '3xl', lg: '6xl' }
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
	<div
		class={css({
			marginX: { base: '0', lg: '80' }
		})}
	>
		<p
			class={css({
				fontSize: { base: 'xl', lg: '2xl' },
				marginBottom: '4'
			})}
		>
			To get started, please create your master account.
		</p>
		<p
			class={css({
				marginBottom: '4'
			})}
		>
			The master account can create additional accounts and force other accounts to change their
			password. There can only be one master account.
		</p>
		<form method="POST">
			<CreateMasterAccountFieldset formValues={form?.formValues} errors={form?.errors} />
			<div
				class={css({
					display: 'flex',
					justifyContent: 'flex-end'
				})}
			>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	</div>
{/if}
