<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { inputStyle } from '../input-style';

	type Props = HTMLSelectAttributes & {
		hasError?: boolean;
	};
	let { hasError, value = $bindable(), children, ...props }: Props = $props();
</script>

<select class={inputStyle({ error: hasError })} bind:value {...props}>
	{#if children}
		{@render children()}
	{/if}
</select>
