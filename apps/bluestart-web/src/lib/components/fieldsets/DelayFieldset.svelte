<script lang="ts">
	import { TimeField } from 'bits-ui';
	import { css } from 'styled-system/css';
</script>

<TimeField.Root>
	<div
		class={css({
			display: 'flex',
			width: 'full',
			maxWidth: '280px',
			flexDirection: 'column',
			gap: '0.375rem'
		})}
	>
		<TimeField.Label
			class={css({
				display: 'block',
				userSelect: 'none',
				fontSize: '0.875rem',
				fontWeight: 500
			})}
		>
			Appointment Time
		</TimeField.Label>
		<TimeField.Input
			name="hello"
			class={css({
				display: 'flex',
				width: 'full',
				alignItems: 'center',
				userSelect: 'none',
				paddingX: '0.5rem',
				paddingY: '0.75rem',
				fontSize: '0.875rem',
				letterSpacing: '0.01em',
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: 'var(--border-input)',
				borderRadius: '6px',
				bg: 'var(--background)',
				color: 'var(--foreground)',
				'&:hover': { borderColor: 'var(--border-input-hover)' },
				'&:focus-within': {
					borderColor: 'var(--border-input-hover)',
					boxShadow: 'var(--shadow-date-field-focus)'
				},
				'[data-invalid]': { borderColor: 'var(--destructive)' }
			})}
		>
			{#snippet children({ segments })}
				{#each segments as { part, value }, i (part + i)}
					<div class={css({ display: 'inline-block', userSelect: 'none' })}>
						{#if part === 'literal'}
							<TimeField.Segment
								{part}
								class={css({ color: 'var(--muted-foreground)', padding: '0.25rem' })}
							>
								{value}
							</TimeField.Segment>
						{:else}
							<TimeField.Segment
								{part}
								class={css({
									borderRadius: '5px',
									paddingX: '0.25rem',
									paddingY: '0.25rem',
									'&:hover': { backgroundColor: 'var(--muted)' },
									'&:focus': { backgroundColor: 'var(--muted)', color: 'var(--foreground)' },
									'[aria-valuetext="Empty"]': { color: 'var(--muted-foreground)' },
									'[data-invalid]': { color: 'var(--destructive)' },
									':focus-visible': { boxShadow: 'none', outline: 'none' }
								})}
							>
								{value}
							</TimeField.Segment>
						{/if}
					</div>
				{/each}
			{/snippet}
		</TimeField.Input>
	</div>
</TimeField.Root>
