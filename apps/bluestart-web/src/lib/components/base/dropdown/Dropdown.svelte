<script lang="ts">
	import { css, cva } from 'styled-system/css';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { inputStyle } from '../input-style';

	type Props = HTMLSelectAttributes & {
		hasError?: boolean;
	};
	let { hasError, value = $bindable(), children, ...props }: Props = $props();

	const style = cva(inputStyle);
</script>

<select class={style({ error: hasError })} bind:value {...props}>
	{#if children}
		{@render children()}
	{/if}
</select>
