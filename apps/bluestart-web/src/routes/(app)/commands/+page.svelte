<script lang="ts">
	import { css } from 'styled-system/css';

	let mode = $state('New');
</script>

<div class={css({
		marginTop: '4',
		marginX: '6',
		display: 'flex'
	})}
>
	<div class={css({ flex: 1 })}>
		<h2 class={css({ fontSize: { base: '2xl', md: '4xl' } })}>
			{mode} Command
		</h2>
	</div>
</div>
