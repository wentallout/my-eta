<script lang="ts">
	import Adventurer from '$lib/components/Adventurer.svelte';
	import { roundTo2Decimals } from '$lib/utils/common';

	let { usedETAHours, originalETAHours }: { usedETAHours: string; originalETAHours: string } =
		$props();

	let ETAPercentage = $derived((parseFloat(usedETAHours) / parseFloat(originalETAHours)) * 100);

	import { tweened, type Tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const tweenedPercentage = $derived(
		tweened(ETAPercentage, {
			duration: 300,
			easing: cubicOut
		})
	);
</script>

<div class="full counter" style={`--eta-percentage: ${$tweenedPercentage}%;`}>
	<Adventurer />

	{#if ETAPercentage}
		<div class="">{ETAPercentage}</div>
	{/if}

	<div class="counter__number">
		{roundTo2Decimals(parseFloat(usedETAHours))} | {roundTo2Decimals(parseFloat(originalETAHours))}
	</div>
</div>

<style>
	.counter {
		min-height: 20dvh;
		padding-block: var(--space-xl);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: black;
		position: relative;
		--eta-percentage: 0%;
		flex-direction: column;
		z-index: -2;
		overflow: hidden;
	}

	.counter::before {
		content: '';
		background-color: green;
		position: absolute;
		height: 100%;
		width: var(--eta-percentage);
		top: 0;
		left: 0;
		z-index: -1;
		transition: 0.3s ease-in-out;
	}

	.counter__number {
		font-weight: 600;
		font-size: var(--step-5);
	}
</style>
