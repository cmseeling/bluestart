<script lang="ts">
	// import { css } from 'styled-system/css';
	import LoginFieldset from './LoginFieldset.svelte';
	// import Button from '$lib/components/base/button/Button.svelte';

	const { form } = $props();
</script>

<div
	
>
	<div
		
	>
		<h1
			
		>
			Bluestart
		</h1>
		<form method="POST">
			<LoginFieldset formValues={form?.formValues} errors={form?.errors} />
			<div
				
			>
				<button type="submit">Log In</button>
			</div>
		</form>
	</div>
</div>
