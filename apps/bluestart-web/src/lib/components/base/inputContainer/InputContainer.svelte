<script lang="ts">
	import { cva, cx } from 'styled-system/css';
	import type { Snippet } from 'svelte';

	export type Props = {
		class?: string;
		hasError?: boolean;
		children: Snippet<[]>;
	};

	let { hasError, children, class: className }: Props = $props();

	const fieldStyle = cva({
		base: {
			marginBottom: '4'
		},
		variants: {
			error: {
				true: { color: 'red.500' },
				false: {}
			}
		},
		defaultVariants: {
			error: false
		}
	});
</script>

<div class={cx(fieldStyle({ error: hasError }), className)}>
	{@render children()}
</div>
