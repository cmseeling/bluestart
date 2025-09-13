<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { inputStyle } from '../input-style';
	import { cx } from 'styled-system/css';

	type Props = HTMLInputAttributes & {
		class?: string;
		hasError?: boolean;
	};
	let { hasError, value = $bindable(), class: className, ...props }: Props = $props();
</script>

<input bind:value {...props} class={cx(inputStyle({ error: hasError }), className)} />
