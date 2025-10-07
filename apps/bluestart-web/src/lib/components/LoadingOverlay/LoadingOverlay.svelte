<script lang="ts">
	import { setContext } from 'svelte';
	import { css } from 'styled-system/css';
	import CircleSpinner from '../base/circleSpinner/circleSpinner.svelte';

	let { children } = $props();

	let showOverlay = $state(false);

	function toggleOverlay() {
		showOverlay = !showOverlay;
	}

	function overlayOn() {
		showOverlay = true;
	}

	function overlayOff() {
		showOverlay = false;
	}

	setContext('loadingOverlay', { toggleOverlay, overlayOn, overlayOff });
</script>

{#if showOverlay}
	<div
		class={css({
			top: '0',
			left: '0',
			display: 'flex',
			alignItems: 'center',
			height: '100vh',
			width: 'full',
			backgroundColor: 'surface0',
			zIndex: '1000'
		})}
		style="position: absolute; justify-content: center; opacity: 0.7;"
	>
		<CircleSpinner />
	</div>
{/if}
{@render children?.()}
