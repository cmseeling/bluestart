<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { inputStyle } from '../input-style';
	import { cx } from 'styled-system/css';

	type Props = HTMLSelectAttributes & {
		class?: string;
		hasError?: boolean;
	};

	let { hasError, value = $bindable(), children, class: className, ...props }: Props = $props();
</script>

<select class={cx(inputStyle({ error: hasError }), className)} bind:value {...props}>
	{#if children}
		{@render children()}
	{/if}
</select>
