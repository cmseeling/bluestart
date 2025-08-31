<script lang="ts">
	import '../app.css';
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
	<!-- <div
		class={css({
			minHeight: '100vh',
			height: 'full',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',
			alignContent: 'stretch'
		})}
	>
		<Header />
		<div
			class={css({ flexGrow: 1, display: 'flex', alignItems: 'stretch', alignContent: 'stretch' })}
		>
			<Menu />
			<div class={css({ height: 'full' })}>
				{@render children?.()}
			</div>
		</div>
	</div> -->
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
