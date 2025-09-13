<script lang="ts">
	import { RadioGroup, Label, type WithoutChildrenOrChild, useId } from 'bits-ui';
	import { css, cva, cx } from 'styled-system/css';

	type Item = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	type Props = WithoutChildrenOrChild<RadioGroup.RootProps> & {
		items: Item[];
		class?: string;
		hasError?: boolean;
	};

	let {
		value = $bindable(''),
		ref = $bindable(null),
		items,
		class: className,
		orientation,
		hasError,
		...restProps
	}: Props = $props();

	const containerStyle = cva({
		base: {
			display: 'flex'
		},
		variants: {
			orientation: {
				horizontal: {
					flexDirection: 'row',
					gap: '4'
				},
				vertical: {
					flexDirection: 'column',
					gap: '1'
				}
			},
			hasError: {
				true: {
					color: 'red.500'
				}
			}
		},
		defaultVariants: {
			orientation: 'vertical',
			hasError: false
		}
	});
</script>

<RadioGroup.Root
	bind:value
	{orientation}
	bind:ref
	{...restProps}
	class={cx(containerStyle({ orientation, hasError }), className)}
>
	{#each items as item, index (index)}
		{@const id = useId()}
		<div>
			<RadioGroup.Item {id} value={item.value} disabled={item.disabled}>
				{#snippet children({ checked })}
					{#if checked}
						<input
							type="radio"
							checked
							class={css({ verticalAlign: 'middle', transform: 'scale(1.4)' })}
						/>
					{:else}
						<input type="radio" class={css({ verticalAlign: 'middle', transform: 'scale(1.4)' })} />
					{/if}
				{/snippet}
			</RadioGroup.Item>
			<Label.Root for={id} class={css({ verticalAlign: 'middle' })}>{item.label}</Label.Root>
		</div>
	{/each}
</RadioGroup.Root>
