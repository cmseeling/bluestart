<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import CreateMasterAccountFieldset from './CreateMasterAccountFieldset.svelte';

    const { Story } = defineMeta({
        title: 'CreateMasterAccount/CreateMasterAccountFieldset',
        component: CreateMasterAccountFieldset,
    });
</script>

<Story name="Default" />

<Story name="Error State">
    <CreateMasterAccountFieldset />
</Story>