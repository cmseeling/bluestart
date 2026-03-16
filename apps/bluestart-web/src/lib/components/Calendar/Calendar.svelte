<script lang="ts">
    import { css } from 'styled-system/css';
    import Header from './Header/Header.svelte';
    import Body from './Body/Body.svelte';

    const calendar = css({
        w: "full",
        h: "full",
        display: "flex",
        flexDirection: "column",
        bg: "white",
        borderRadius: "2xl",
        boxShadow: "lg",
        overflow: "hidden",
    });
</script>

<div class={calendar}>
    <Header />
    <Body />
</div>