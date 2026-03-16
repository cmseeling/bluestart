<script lang="ts">
	import { css } from 'styled-system/css';
	import { days } from '../days';

	const headerRow = css({
		display: 'grid',
		gridTemplateColumns: 'repeat(8, 1fr)',
		borderBottomWidth: '1px',
		bg: 'gray.50'
	});

	const headerCell = css({
		p: '4',
		textAlign: 'center',
		borderRightWidth: '1px',
		_last: {
			borderRightWidth: '0'
		}
	});

	const headerDayText = css({
		fontSize: 'sm',
		fontWeight: 'medium',
		color: 'gray.500'
	});
</script>

<div class={headerRow}>
	<div class={css({ borderRightWidth: '1px' })}></div>
	{#each (days) as day (day.id)}
		<div class={headerCell}>
			<div class={headerDayText}>{day.name}</div>
		</div>
	{/each}
</div>
