<script lang='ts'>
	import { inputStyle } from '$lib/styles/input';
    import { css } from 'styled-system/css';

</script>

<fieldset>
    <label>
        Username:
        <input class={css(inputStyle)} type='text' name='username' />
    </label>
    <label>
        Password:
        <input class={css(inputStyle)} type='password' name='password' />
    </label>
</fieldset>