<script lang="ts">
	import { cellStyle } from '$lib/styles/cell';
	import type { CommandWithAllData } from '@bluestart/db/schemaTypes';
    import { css } from 'styled-system/css';
	import Button from '../base/button/Button.svelte';

    type Props = {
        name: string;
        commands: CommandWithAllData[];
        timeSlots: string[];
    }

    const { name, commands, timeSlots }: Props = $props();

    const commandsByTime = commands.reduce((map, command) => {
        if(map.has(command.activationTime)) {
            map.get(command.activationTime)?.push(command);
        } else {
            map.set(command.activationTime, [command]);
        }
        return map;
    }, new Map<string, CommandWithAllData[]>());

    const commandButtonStyle = css.raw({ flexGrow: '1', width: '100%' });
</script>

{#snippet commandList(commands: CommandWithAllData[])}
    <div data-testid="command-list" class={css({
        height: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '1'
    })}>
        {#if commands.length === 0}
            <div class={css({ flexGrow: '1', })}>&nbsp;</div>
        {:else}
        {#each commands as command}
            <Button additionalStyles={commandButtonStyle}>
                {command.name}
            </Button>
        {/each}
        {/if}
    </div>
{/snippet}

<div data-componentName="day-command" class={css({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
})}>
    <div class={css(cellStyle, { display: 'flex' })}>
        <span class={css({ fontWeight: 'bold', flexGrow: '1' })}>{name}</span>
        <Button variant='success' additionalStyles={css.raw({ width: '14' })}>
            +
        </Button>
    </div>
    {#each timeSlots as timeSlot}
        <div class={css(cellStyle)}>
            {@render commandList(commandsByTime.get(timeSlot) || [])}
        </div>
    {/each}
</div>