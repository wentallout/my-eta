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

	<div class="percentage" class:show={ETAPercentage}>{ETAPercentage}%</div>

	<div class:show={usedETAHours} class="counter__number">
		<span class="counter__used"> {roundTo2Decimals(parseFloat(usedETAHours))}</span> / {roundTo2Decimals(
			parseFloat(originalETAHours)
		)} hours used
	</div>
</div>

<style>
	.counter {
		min-height: 20dvh;
		padding-block: var(--space-xl);
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;
		--eta-percentage: 0%;
		flex-direction: column;
		overflow: hidden;
		margin-bottom: var(--space-l);
	}

	.percentage {
		opacity: 0;
	}

	.counter__used {
		font-weight: 300;
		color: var(--copy-light);
	}
	.counter::before {
		content: '';
		position: absolute;
		height: 100%;
		width: var(--eta-percentage);
		top: 0;
		left: 0;
		z-index: -1;
		transition: 0.3s ease-in-out;

		background: center repeat url('/images/time-pattern.svg') hsl(189, 84%, 48%);
		background-size: 50%;
		filter: brightness(0.3);
	}

	.counter::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -2;
		background: center no-repeat url('/images/clock-tower.png');
		filter: brightness(0.1);
	}

	.counter__number {
		font-weight: 600;
		font-size: var(--step-5);
		opacity: 0;
	}

	.show {
		opacity: 1;
	}
</style>
