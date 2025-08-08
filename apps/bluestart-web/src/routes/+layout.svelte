<script lang="ts">
	import '../app.css';
	import { css } from 'styled-system/css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class={css({
		minHeight: '100vh',
		marginX: {
			base: '1rem',
			md: '8rem'
		}
	})}
>
	{@render children?.()}
</div>
