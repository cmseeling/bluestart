<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Button from './Button.svelte';

    const { Story } = defineMeta({
        title: 'Components/Base/Button',
        component: Button
    });
</script>

<Story name="Default" >
    <Button onclick={() => console.log('Button clicked!')}>
        <span>Click Me</span>
    </Button>
</Story>

<Story name="Variants">
    <Button variant="primary">
        <span>Primary</span>
    </Button>
    <Button variant="secondary">
        <span>Secondary</span>
    </Button>
    <Button variant="success">
        <span>Success</span>
    </Button>
    <Button variant="error">
        <span>Error</span>
    </Button>
</Story>
    