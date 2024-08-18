<script lang="ts">
	import Adventurer from '$lib/components/Adventurer.svelte';
	import { roundTo2Decimals } from '$lib/utils/common';

	let { usedETAHours, originalETAHours }: { usedETAHours: number; originalETAHours: number } =
		$props();

	let ETAPercentage = $derived((usedETAHours / originalETAHours) * 100);
</script>

<div class="full counter">
	<Adventurer />

	{#if ETAPercentage}
		<div class="">{ETAPercentage}</div>
	{/if}

	<div class="counter__number">
		{roundTo2Decimals(usedETAHours)} | {roundTo2Decimals(originalETAHours)}
	</div>

	{#if usedETAHours !== 0}
		<div class="counter__small">Used: {usedETAHours.toFixed(4)} hours</div>
	{/if}
</div>

<style>
	.counter {
		height: 30dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: black;
		position: relative;
		--counter-percentage: 0%;
		flex-direction: column;
	}

	.counter::before {
		content: '';
		background-color: green;
		position: absolute;
		height: 100%;
		width: var(--counter-percentage);
	}

	.counter__number {
		font-weight: 600;
		font-size: 64px;
	}
</style>
