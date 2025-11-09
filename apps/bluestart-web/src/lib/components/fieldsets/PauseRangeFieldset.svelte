<script lang="ts">
	import { DateRangePicker } from 'bits-ui';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';
	import { css } from 'styled-system/css';
</script>

<DateRangePicker.Root
	weekdayFormat="short"
	fixedWeeks={true}
	class={css({
		display: 'flex',
		width: '100%',
		maxWidth: '340px',
		flexDirection: 'column',
		gap: '0.375rem'
	})}
>
	<DateRangePicker.Label class="block select-none text-sm font-medium"
		>Rental Days</DateRangePicker.Label
	>
	<div
		class={css({
			display: 'flex',
			width: '100%',
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
			}
		})}
	>
		{#each ['start', 'end'] as const as type (type)}
			<DateRangePicker.Input {type}>
				{#snippet children({ segments })}
					{#each segments as { part, value }, i (part + i)}
						<div class={css({ display: 'inline-block', userSelect: 'none' })}>
							{#if part === 'literal'}
								<DateRangePicker.Segment
									{part}
									class={css({ color: 'var(--muted-foreground)', padding: '0.25rem' })}
								>
									{value}
								</DateRangePicker.Segment>
							{:else}
								<DateRangePicker.Segment
									{part}
									class={css({
										borderRadius: '5px',
										paddingX: '0.25rem',
										paddingY: '0.25rem',
										'&:hover': { backgroundColor: 'var(--muted)' },
										'&:focus': { backgroundColor: 'var(--muted)', color: 'var(--foreground)' },
										'[aria-valuetext="Empty"]': { color: 'var(--muted-foreground)' },
										':focus-visible': { boxShadow: 'none', outline: 'none' }
									})}
								>
									{value}
								</DateRangePicker.Segment>
							{/if}
						</div>
					{/each}
				{/snippet}
			</DateRangePicker.Input>
			{#if type === 'start'}
				<div
					aria-hidden="true"
					class={css({ color: 'var(--muted-foreground)', paddingX: '0.25rem' })}
				>
					–⁠⁠⁠⁠⁠
				</div>
			{/if}
		{/each}

		<DateRangePicker.Trigger
			class={css({
				color: 'var(--foreground)',
				opacity: 0.6,
				'&:hover': { backgroundColor: 'var(--muted)' },
				'&:active': { backgroundColor: 'var(--dark-10)' },
				marginLeft: 'auto',
				display: 'inline-flex',
				width: '2rem',
				height: '2rem',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '5px',
				transition: 'all 150ms ease'
			})}
		>
			<CalendarBlank class={css({ width: '1.5rem', height: '1.5rem' })} />
		</DateRangePicker.Trigger>
	</div>
	<DateRangePicker.Content sideOffset={6} class={css({ zIndex: 50 })}>
		<DateRangePicker.Calendar
			class={css({
				borderRadius: '15px',
				borderColor: 'var(--dark-10)',
				background: 'var(--background-alt)',
				boxShadow: 'var(--shadow-popover)',
				marginTop: '1.5rem',
				borderWidth: '1px',
				padding: '22px'
			})}
		>
			{#snippet children({ months, weekdays })}
				<DateRangePicker.Header
					class={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}
				>
					<DateRangePicker.PrevButton
						class={css({
							borderRadius: '9px',
							background: 'var(--background-alt)',
							'&:hover': { backgroundColor: 'var(--muted)' },
							display: 'inline-flex',
							width: '2.5rem',
							height: '2.5rem',
							alignItems: 'center',
							justifyContent: 'center',
							transition: 'all 150ms ease',
							'&:active': { transform: 'scale(0.98)' }
						})}
					>
						<CaretLeft class={css({ width: '1.5rem', height: '1.5rem' })} />
					</DateRangePicker.PrevButton>
					<DateRangePicker.Heading class={css({ fontSize: '15px', fontWeight: 500 })} />
					<DateRangePicker.NextButton
						class={css({
							borderRadius: '9px',
							background: 'var(--background-alt)',
							'&:hover': { backgroundColor: 'var(--muted)' },
							display: 'inline-flex',
							width: '2.5rem',
							height: '2.5rem',
							alignItems: 'center',
							justifyContent: 'center',
							transition: 'all 150ms ease',
							'&:active': { transform: 'scale(0.98)' }
						})}
					>
						<CaretRight class={css({ width: '1.5rem', height: '1.5rem' })} />
					</DateRangePicker.NextButton>
				</DateRangePicker.Header>
				<div
					class={css({
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
						paddingTop: '1rem',
						'@media(min-width:640px)': { flexDirection: 'row', gap: '1rem' }
					})}
				>
					{#each months as month (month.value)}
						<DateRangePicker.Grid
							class={css({
								width: '100%',
								borderCollapse: 'collapse',
								userSelect: 'none',
								gap: '0.25rem'
							})}
						>
							<DateRangePicker.GridHead>
								<DateRangePicker.GridRow
									class={css({
										marginBottom: '0.25rem',
										display: 'flex',
										width: '100%',
										justifyContent: 'space-between'
									})}
								>
									{#each weekdays as day (day)}
										<DateRangePicker.HeadCell
											class={css({
												color: 'var(--muted-foreground)',
												fontWeight: 400,
												width: '2.5rem',
												borderRadius: '6px',
												fontSize: '0.75rem'
											})}
										>
											<div>{day.slice(0, 2)}</div>
										</DateRangePicker.HeadCell>
									{/each}
								</DateRangePicker.GridRow>
							</DateRangePicker.GridHead>
							<DateRangePicker.GridBody>
								{#each month.weeks as weekDates (weekDates)}
									<DateRangePicker.GridRow class={css({ display: 'flex', width: '100%' })}>
										{#each weekDates as date (date)}
											<DateRangePicker.Cell
												{date}
												month={month.value}
												class={css({
													padding: 0,
													position: 'relative',
													margin: 0,
													width: '2.5rem',
													overflow: 'visible',
													textAlign: 'center',
													fontSize: '0.875rem'
												})}
											>
												<DateRangePicker.Day
													class={css({
														borderRadius: '9px',
														color: 'var(--foreground)',
														background: 'transparent',
														borderColor: 'transparent',
														display: 'inline-flex',
														alignItems: 'center',
														justifyContent: 'center',
														width: '2.5rem',
														height: '2.5rem',
														padding: 0,
														fontSize: '0.875rem',
														transition: 'all 120ms ease',
														'&:hover': { borderColor: 'var(--foreground)' },
														'&[data-disabled]': {
															color: 'var(--foreground)',
															opacity: 0.3,
															pointerEvents: 'none'
														}
													})}
												>
													<div
														class={css({
															background: 'var(--foreground)',
															position: 'absolute',
															top: '5px',
															display: 'none',
															width: '0.25rem',
															height: '0.25rem',
															borderRadius: '50%',
															transition: 'all 120ms ease'
														})}
													></div>
													{date.day}
												</DateRangePicker.Day>
											</DateRangePicker.Cell>
										{/each}
									</DateRangePicker.GridRow>
								{/each}
							</DateRangePicker.GridBody>
						</DateRangePicker.Grid>
					{/each}
				</div>
			{/snippet}
		</DateRangePicker.Calendar>
	</DateRangePicker.Content>
</DateRangePicker.Root>
