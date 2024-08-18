<script lang="ts">
	let workingState: string = $props();
</script>

{#if workingState === 'idle'}
	<img src="/images/khoabunny_stand.gif" alt="" />
{/if}

{#if workingState === 'working'}
	<img src="/images/khoabunny_atk.gif" alt="" />
{/if}

{#if workingState === 'panic'}
	<img src="/images/khoabunny_stab.gif" alt="" />
{/if}

{#if workingState === 'paused'}
	<img src="/images/khoabunny_sit.gif" alt="" />
{/if}
