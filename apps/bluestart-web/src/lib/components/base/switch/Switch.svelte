<script lang="ts">
	import { Switch, Label, useId, type WithoutChildrenOrChild } from 'bits-ui';
	import { cva } from 'styled-system/css';

	let {
		id = useId(),
		checked = $bindable(false),
		ref = $bindable(null),
		label,
		hasError,
		...restProps
	}: WithoutChildrenOrChild<Switch.RootProps> & {
		label: string;
		hasError?: boolean;
	} = $props();

	const containerStyle = cva({
		base: {
			display: 'flex',
			alignItems: 'center',
			gap: 2
		},
		variants: {
			error: {
				true: {
					color: 'red.500'
				},
				false: {}
			}
		},
		defaultVariants: {
			error: false
		}
	});

	const switchStyle = cva({
		base: {
			outline: 'none',
			display: 'inline-flex',
			height: '30px',
			minHeight: '30px',
			width: '60px',
			flexShrink: 0,
			cursor: 'pointer',
			alignItems: 'center',
			borderRadius: 'full',
			px: '3px',
			transitionProperty: 'colors',
			_focusVisible: {
				ring: '2px',
				ringOffset: '2px',
				ringColor: 'text.regular'
			},
			_disabled: {
				cursor: 'not-allowed',
				opacity: 0.5
			}
		},
		variants: {
			checked: {
				true: {
					backgroundColor: 'green'
				},
				false: {
					backgroundColor: 'crust',
					boxShadow: 'inset-xs'
				}
			}
		},
		defaultVariants: {
			checked: false
		}
	});

	const thumbStyle = cva({
		base: {
			pointerEvents: 'none',
			display: 'block',
			width: '30px',
			height: '24px',
			flexShrink: 0,
			borderRadius: 'full',
			transitionProperty: 'transform'
		},
		variants: {
			checked: {
				true: {
					bg: 'surface2',
					transform: 'translateX(1.5rem)' // 6 * 0.25rem = 1.5rem
				},
				false: {
					bg: 'text',
					boxShadow: 'mini',
					transform: 'translateX(0)'
				}
			}
		},
		defaultVariants: {
			checked: false
		}
	});
</script>

<div class={containerStyle({ error: hasError })}>
	<Label.Root for={id}>{label}</Label.Root>
	<Switch.Root bind:checked bind:ref {id} {...restProps} class={switchStyle({ checked })}>
		<Switch.Thumb class={thumbStyle({ checked })} />
	</Switch.Root>
</div>
