<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	// import { inputStyle } from '../input-style';
	// import { cx } from 'styled-system/css';
	import Input from '$lib/components/base/input/Input.svelte';

	type Props = HTMLInputAttributes & {
		class?: string;
		hasError?: boolean;
	};

	let { value = $bindable(), ...props }: Props = $props();
</script>

<Input bind:value {...props} type="time" />
