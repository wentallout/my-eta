<script lang="ts">
	import { detectDayNight, formatDateStandard, runEverySeconds } from '$lib/utils/common';

	import { timeDateTracker } from '$lib/stores/time-date.svelte';

	let time = timeDateTracker;

	runEverySeconds(() => {
		time.timeDate = new Date();
	}, 1);

	let vnTime = $derived(formatDateStandard(time.timeDate, 'Asia/Ho_Chi_Minh'));
	let koreaTime = $derived(formatDateStandard(time.timeDate, 'Asia/Seoul'));
</script>

<div class="current-time">
	<div class="tz">
		<div class="tz__country">VN</div>
		<div class="">{vnTime}</div>
		{#if vnTime}
			<div class="">{detectDayNight(vnTime)}</div>
		{/if}
	</div>

	<div class="tz">
		<div class="tz__country">KR</div>
		<div>{koreaTime}</div>

		{#if koreaTime}
			<div class="">{detectDayNight(koreaTime)}</div>
		{/if}
	</div>
</div>

<style>
	.tz {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	.tz__country {
		margin-right: var(--space-m);
	}
	.current-time {
		position: fixed;
		background: black;
		right: 0;
		bottom: 0;
		color: white;
		padding: var(--space-2xs) var(--space-2xs);
		font-size: var(--step--1);
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
