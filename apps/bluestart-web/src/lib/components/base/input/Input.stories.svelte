<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';

	const { Story } = defineMeta({
		title: 'Components/Base/Input',
		component: Input
	});
</script>

<Story name="Default">
	<div>
		<Input type="text" hasError={false} name="storybook-example" placeholder="placeholder" />
		<input type="text" placeholder="test" />
	</div>
</Story>

<Story name="Error State">
	<Input type="text" hasError={true} name="storybook-example" />
</Story>
