<script lang="ts">
    import '../app.css';
    import { css } from 'styled-system/css';

    let { children } = $props();
</script>

<div class={css({
    minHeight: '100vh',
    marginX: {
        base: '1rem',
        lg: '8rem'
    }
})}>
    {@render children()}
</div>
