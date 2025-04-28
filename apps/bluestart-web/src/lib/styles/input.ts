import { css } from 'styled-system/css';

const baseInputStyle = {
    flex: '1 1 auto',
    display: 'inline-flex',
    alignItems: 'stretch',
    justifyContent: 'start',
    position: 'relative',
    width: '100%',
    verticalAlign: 'middle',
    overflow: 'hidden',
    cursor: 'text',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'subtext0',
    rounded: 'sm',
}

export const inputStyle = css.raw({
    ...baseInputStyle,
    _hover: {
        borderColor: 'text',
    },
    _focus: {
        borderColor: 'blue.500',
        boxShadow: '0 0 0 1px blue.500',
    }
});