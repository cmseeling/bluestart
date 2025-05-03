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
    <InputContainer>
        <Input type="text" name="username"/>
    </InputContainer>
</Story>

<Story name="Error State">
    <InputContainer hasError={true}>
        <Input type="text" name="username"/>
    </InputContainer>
</Story>