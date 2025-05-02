<script lang='ts'>
	import Input from '$lib/components/base/input/Input.svelte';
    import { css } from 'styled-system/css';
</script>

<fieldset>
    <label>
        Username:
        <Input type='text' name='username' />
    </label>
    <label>
        Password:
        <Input type='password' name='password' />
    </label>
</fieldset>