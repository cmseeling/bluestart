<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import InputContainer from './InputContainer.svelte';
	import Input from "../input/Input.svelte";

    const { Story } = defineMeta({
        title: 'Components/Base/InputContainer',
        component: InputContainer
    });
</script>

<Story name="Default">
    <Input type="text" name="username"/>
</Story>

<Story name="Error State">
    <Input type="text" name="username"/>
</Story>