<script lang="ts">
	import { css } from 'styled-system/css';
	import Button from '../base/button/Button.svelte';
</script>

<header
	class={css({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	})}
>
	<h1
		class={css({
			flexShrink: 1,
			fontSize: { base: '3xl', md: '6xl' }
		})}
	>
		Bluestart
	</h1>
	<div class={css({ flexGrow: 1 })}></div>
	<div
		class={css({
			flexShrink: 1
		})}
	>
		<Button>Sign Out</Button>
	</div>
</header>
