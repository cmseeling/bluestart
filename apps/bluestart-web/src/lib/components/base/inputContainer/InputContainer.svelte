<script lang='ts'>
    import { css, cva } from 'styled-system/css';
	import type { Snippet } from 'svelte';

    type Props = {
        hasError?: boolean;
        children: Snippet<[]>;
    }

    let { hasError, children }: Props = $props();

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

<div class={fieldStyle({ error: hasError })}>
    {@render children()}
</div>