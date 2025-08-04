<script lang="ts">
	import { css, cva } from 'styled-system/css';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { inputStyle } from '../input-style';

	type Props = HTMLInputAttributes & {
		hasError?: boolean;
	};
	let { hasError, value = $bindable(), ...props }: Props = $props();

	const style = cva(inputStyle);
</script>

<input class={style({ error: hasError })} bind:value {...props} />
