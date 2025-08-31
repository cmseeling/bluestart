<script lang="ts">
	import { page } from '$app/state';
	import { css, cva } from 'styled-system/css';
	import Button from '../base/button/Button.svelte';

	const menuItemStyle = cva({
		base: {
			paddingX: '4',
			paddingY: '2',
			rounded: 'md',
			textDecoration: 'none',
			'&:hover': {
				backgroundColor: 'surface2',
				textDecoration: 'underline'
			}
		},
		variants: {
			active: {
				true: {
					backgroundColor: 'surface0',
					fontWeight: 'bold'
				},
				false: {}
			}
		},
		defaultVariants: { active: false }
	});
</script>

<div
	class={css({
		flexShrink: 1,
		backgroundColor: 'mantle',
		paddingX: '4',
		display: 'flex',
		flexDirection: 'column',
		borderRight: '1px solid',
		borderColor: 'text'
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
	<div
		class={css({
			flexGrow: 1,
			marginX: '4',
			display: 'flex',
			flexDirection: 'column'
		})}
	>
		<a href="/" class={menuItemStyle({ active: page.url.pathname === '/' })}>Home</a>
		<a href="/settings" class={menuItemStyle({ active: page.url.pathname === '/settings' })}
			>Settings</a
		>
		<div class={css({ flexGrow: 1 })}></div>
		<Button variant="primary">Log Out</Button>
	</div>
</div>
