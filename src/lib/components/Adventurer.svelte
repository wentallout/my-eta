<script lang="ts">
	import { workingStateTracker } from '$lib/stores/working-state.svelte';
	import Marquee from './Marquee.svelte';
</script>

<!-- <div class="working-state">{workingStateTracker.workingState}</div> -->

<Marquee />

<div class="adventurer">
	{#if workingStateTracker.workingState === 'idle'}
		<img src="/images/khoabunny_stand.gif" alt="" />
	{/if}

	{#if workingStateTracker.workingState === 'working'}
		<img src="/images/khoabunny_atk.gif" alt="" />
		<img class="boss" src="/images/papulatus.gif" alt="" />
	{/if}

	{#if workingStateTracker.workingState === 'panic'}
		<img src="/images/khoabunny_stab.gif" alt="" />
		<img class="boss" src="/images/papulatus.gif" alt="" />
	{/if}

	{#if workingStateTracker.workingState === 'paused'}
		<img src="/images/khoabunny_sit.gif" alt="" />
	{/if}
</div>

<style>
	.working-state {
		font-size: var(--step-4);
	}

	.adventurer {
		height: 240px;
		width: 100%;
		overflow: hidden;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.boss {
		height: 240px;
		width: auto;
	}
</style>
