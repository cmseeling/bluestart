<script lang="ts">
	import { css } from 'styled-system/css';
    import { days } from '../days';

	const bodyWrapper = css({
		flex: '1',
		overflow: 'auto'
	});

	const bodyGrid = css({
		display: 'grid',
		gridTemplateColumns: 'repeat(8, 1fr)',
		position: 'relative'
	});

	/* Time Column */
	const timeColumn = css({
		borderRightWidth: '1px',
		position: 'relative'
	});

	const timeCell = css({
		height: '60px',
		borderBottomWidth: '1px',
		fontSize: 'xs',
		color: 'gray.400',
		paddingRight: '2',
		textAlign: 'right',
		paddingTop: '1'
	});

    const dayColumn = css({
        position: "relative",
        borderRightWidth: "1px",
        _last: {
        borderRightWidth: "0",
        },
    });
</script>

<div class={bodyWrapper}>
    <div class={bodyGrid}>
        <div class={timeColumn}>
            <div class={timeCell}>12:00 AM</div>
            <div class={timeCell}>1:00 AM</div>
            <div class={timeCell}>2:00 AM</div>
            <div class={timeCell}>3:00 AM</div>
            <div class={timeCell}>4:00 AM</div>
            <div class={timeCell}>5:00 AM</div>
            <div class={timeCell}>6:00 AM</div>
            <div class={timeCell}>7:00 AM</div>
            <div class={timeCell}>8:00 AM</div>
            <div class={timeCell}>9:00 AM</div>
            <div class={timeCell}>10:00 AM</div>
            <div class={timeCell}>11:00 AM</div>
            <div class={timeCell}>12:00 PM</div>
            <div class={timeCell}>1:00 PM</div>
            <div class={timeCell}>2:00 PM</div>
            <div class={timeCell}>3:00 PM</div>
            <div class={timeCell}>4:00 PM</div>
            <div class={timeCell}>5:00 PM</div>
            <div class={timeCell}>6:00 PM</div>
            <div class={timeCell}>7:00 PM</div>
            <div class={timeCell}>8:00 PM</div>
            <div class={timeCell}>9:00 PM</div>
            <div class={timeCell}>10:00 PM</div>
            <div class={timeCell}>11:00 PM</div>
        </div>

        {#each (days) as day (day.id)}
            <div class={dayColumn}>
                <!-- Day Column Content -->
            </div>
        {/each}
    </div>
</div>
