<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import LoginFieldset from './LoginFieldset.svelte';

    const { Story } = defineMeta({
        title: 'Login/LoginFieldset',
        component: LoginFieldset,
    });
</script>

<Story name="Default" />