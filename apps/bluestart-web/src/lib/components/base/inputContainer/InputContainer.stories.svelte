<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from '../input/Input.svelte';
	import InputContainer from './InputContainer.svelte';

	const { Story } = defineMeta({
		title: 'Components/Base/InputContainer',
		component: InputContainer
	});
</script>

<Story name="Default">
	<Input type="text" name="username" />
</Story>

<Story name="Error State" args={{ hasError: true }}>
	<Input type="text" name="username" />
	<div>Error message</div>
</Story>
