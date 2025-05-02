<script lang='ts'>
    import { css, cva } from 'styled-system/css';
	import type { HTMLInputAttributes } from 'svelte/elements';

    type Props = HTMLInputAttributes & {
        hasError?: boolean;
    }    
    let {hasError, value = $bindable(), ...props}: Props = $props();

    const style = cva({
        base: {
            display: 'flex',
            height: '10',
            width: 'full',
            rounded: 'md',
            border: '1px solid',
            borderColor: 'text.subdued',
            bg: 'bedrock',
            px: '3',
            py: '2',
            fontSize: 'sm',
            _placeholder: {
                color: 'text.subdued'
            },
            _focus: {
                borderColor: 'text.regular',
                boxShadow: '0 0 0 2px'
            },
            _focusVisible: {
                outline: 'none',
                ring: '2px',
                ringOffset: '2px',
                ringColor: 'text.regular'
            },
            _disabled: {
                cursor: 'not-allowed',
                opacity: '0.5'
            }
        },
        variants: {
            error: {
                true: {
                    borderColor: 'red.500',
                    boxShadow: '0 0 0 2px red.200'
                },
                false: {}
            }
        },
        defaultVariants: {
            error: false
        }
    });
</script>

<input class={style({ error: hasError })} bind:value={value} {...props} />