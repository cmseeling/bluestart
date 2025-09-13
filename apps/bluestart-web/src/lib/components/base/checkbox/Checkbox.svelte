<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { css, cva, cx } from 'styled-system/css';

	type Props = HTMLInputAttributes & {
		label?: string;
		onValue?: string;
		offValue?: string;
		class?: string;
		hasError?: boolean;
	};

	let {
		label,
		name,
		onValue = 'true',
		offValue = 'false',
		class: className,
		hasError,
		checked = $bindable(),
		...props
	}: Props = $props();

	let value = $derived(checked ? onValue : offValue);

	export const checkboxLabelStyle = cva({
		base: {
			display: 'inline-flex',
			gap: 2,
			alignItems: 'center',
			height: '10',
			width: 'full',
			_disabled: {
				cursor: 'not-allowed'
			}
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
</script>

<label class={cx(checkboxLabelStyle({ error: hasError }), className)}>
	{label}
	<input type="hidden" {name} {value} />
	<input type="checkbox" bind:checked {...props} class={css({ transform: 'scale(1.4)' })} />
</label>
