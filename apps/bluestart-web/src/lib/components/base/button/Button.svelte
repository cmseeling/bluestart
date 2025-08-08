<script lang="ts">
	import { css } from 'styled-system/css';
	import { Button, type ButtonRootProps } from 'bits-ui';

	type Props = ButtonRootProps & {
		variant?: 'primary' | 'secondary' | 'success' | 'error';
	};

	const props: Props = $props();

	const baseStyle = css.raw({
		paddingX: '2',
		paddingY: '1',
		rounded: 'md'
	});

	const variantStyles = {
		primary: css.raw({
			backgroundColor: 'blue.500',
			color: 'text.regular',
			'&:hover': { backgroundColor: 'blue.600' }
		}),
		secondary: css.raw({
			backgroundColor: 'gray.500',
			color: 'text.regular',
			'&:hover': { backgroundColor: 'gray.600' }
		}),
		success: css.raw({
			backgroundColor: 'green.500',
			color: 'text.dark',
			'&:hover': { backgroundColor: 'green.600' }
		}),
		error: css.raw({
			backgroundColor: 'red.500',
			color: 'text.regular',
			'&:hover': { backgroundColor: 'red.600' }
		})
	};

	const buttonStyle = variantStyles[props.variant || 'primary'];
</script>

<Button.Root {...props} class={`${css(baseStyle, buttonStyle)} ${props.class}`}>
	{@render props.children?.()}
</Button.Root>
