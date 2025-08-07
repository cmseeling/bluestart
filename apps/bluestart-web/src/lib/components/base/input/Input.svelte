<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { inputStyle } from '../input-style';

	type Props = HTMLInputAttributes & {
		hasError?: boolean;
	};
	let { hasError, value = $bindable(), ...props }: Props = $props();
	console.log(hasError)
</script>

<input bind:value {...props} class={inputStyle({ error: hasError })} />
