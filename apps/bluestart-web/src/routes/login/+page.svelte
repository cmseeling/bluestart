<script lang="ts">
	import { css } from 'styled-system/css';
	import LoginFieldset from './LoginFieldset.svelte';
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
				fontSize: { base: '3xl', md: '6xl' }
			})}
		>
			Bluestart
		</h1>
		<form method="POST">
			<LoginFieldset formValues={form?.formValues} errors={form?.errors} />
			<div
				class={css({
					display: 'flex',
					justifyContent: 'flex-end'
				})}
			>
				<Button type="submit">Log In</Button>
			</div>
		</form>
	</div>
</div>
