<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/base/button/Button.svelte';
	import { css } from 'styled-system/css';
	import SettingsFieldset from './SettingsFieldset.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	// TODO: double check error handling and fix error message to be dynamic
	// cut form width down
	// save values to database
	// handle database errors
	// implement a radio group
	//
	// also zodify other forms (login, register)
</script>

<div
	class={css({
		marginTop: '4',
		marginX: '6'
	})}
>
	<h2
		class={css({
			fontSize: { base: '2xl', md: '4xl' }
		})}
	>
		Settings
	</h2>
	<form method="POST" use:enhance class={css({ borderTop: '1px solid', paddingTop: '4' })}>
		<SettingsFieldset formValues={data?.form.formValues} errors={data?.form.errors} />
		<div
			class={css({
				display: 'flex',
				justifyContent: 'flex-end'
			})}
		>
			<Button type="submit">Save</Button>
		</div>
	</form>
</div>
