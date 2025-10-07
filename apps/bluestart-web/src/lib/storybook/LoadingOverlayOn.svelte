<script>
	import { getContext } from 'svelte';

	const overlayContext = getContext('loadingOverlay');
	const overlayOn = overlayContext.overlayOn;
	overlayOn();
</script>

<div>Overlay On</div>
