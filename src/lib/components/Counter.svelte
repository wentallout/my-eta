<script lang="ts">
	import Adventurer from './Adventurer.svelte';

	let { timeUsed, totalETA, workingState }: MyProps = $props();

	interface MyProps {
		timeUsed: number;
		totalETA: number;
		workingState: string;
	}
</script>

<div class="full counter">
	<Adventurer {workingState} />
	<div class="counter__number">
		{timeUsed.toFixed(2)}
	</div>

	<div class="counter__small">{timeUsed.toFixed(4)}</div>
</div>

<div class="full">
	<slot></slot>
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
