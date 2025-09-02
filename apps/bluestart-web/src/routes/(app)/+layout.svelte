<script lang="ts">
	import '../../app.css';
	import { css } from 'styled-system/css';
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/menu/Menu.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class={css({
		minHeight: '100vh'
	})}
>
	<div
		class={css({
			height: '100vh',
			display: 'flex'
		})}
	>
		<Menu />
		<div class={css({ flexGrow: 1 })}>
			{@render children?.()}
		</div>
	</div>
</div>
