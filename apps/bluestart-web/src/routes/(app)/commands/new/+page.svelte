<script lang="ts">
	import { css } from 'styled-system/css';
	import CommandFieldset from '../CommandFieldset.svelte';
	import Button from '$lib/components/base/button/Button.svelte';

	const { form }: PageProps = $props();
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
		<form method="POST">
			<CommandFieldset formValues={form?.formValues} errors={form?.errors} />
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
						// hideStatusMessages();
						// isEditing = false;
						console.log('cancel clicked');
					}}>Cancel</Button
				>
				<Button type="submit">Save</Button>
			</div>
		</form>
	</div>
	<div class={css({ flex: 1 })}></div>
</div>
