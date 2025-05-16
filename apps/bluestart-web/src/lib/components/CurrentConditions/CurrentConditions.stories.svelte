<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import CurrentConditions from './CurrentConditions.svelte';

    const { Story } = defineMeta({
        title: 'Components/CurrentConditions',
        component: CurrentConditions,
    });
</script>

<Story name="Default" />
