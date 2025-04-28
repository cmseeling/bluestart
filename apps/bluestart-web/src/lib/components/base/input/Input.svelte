<script lang='ts'>
    import { css } from 'styled-system/css';
	import type { HTMLInputAttributes } from 'svelte/elements';

    const props: HTMLInputAttributes = $props();
</script>

<input class={css({})} {...props} />