<script lang="ts">
	import { workingStateTracker } from '$lib/stores/working-state.svelte';
</script>

<div class="">Test: {workingStateTracker.workingState}</div>
{#if workingStateTracker.workingState === 'idle'}
	<img src="/images/khoabunny_stand.gif" alt="" />
{/if}

{#if workingStateTracker.workingState === 'working'}
	<img src="/images/khoabunny_atk.gif" alt="" />
{/if}

{#if workingStateTracker.workingState === 'panic'}
	<img src="/images/khoabunny_stab.gif" alt="" />
{/if}

{#if workingStateTracker.workingState === 'paused'}
	<img src="/images/khoabunny_sit.gif" alt="" />
{/if}
