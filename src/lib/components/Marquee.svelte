<script lang="ts">
	import { workingStateTracker } from '$lib/stores/working-state.svelte';
</script>

<div class="container">
	<div
		class="marquee"
		class:marquee--paused={workingStateTracker.workingState === 'idle' ||
			workingStateTracker.workingState === 'paused'}
	>
		<ul class="marquee__content">
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
		</ul>

		<ul
			class="marquee__content"
			aria-hidden="true"
			class:marquee--paused={workingStateTracker.workingState === 'idle' ||
				workingStateTracker.workingState === 'paused'}
		>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
			<li>{workingStateTracker.workingState}</li>
		</ul>
	</div>
</div>

<style>
	.container {
		width: 100%;
		max-width: 100vw;
		line-height: 1;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		overflow: hidden;
		color: white;
		border: 1px solid var(--border);
	}

	.marquee {
		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: 8px;
		padding: 4px 8px;
		background-color: var(--primary);
		color: var(--primary-content);
		padding-block: var(--space-2xs);
		text-transform: uppercase;
		font-weight: 600;
		z-index: 9999;
	}

	.marquee__content {
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		gap: var(--space-s);
		min-width: 100%;
		animation: scroll 20s linear infinite;
		animation-direction: reverse;
	}

	.marquee:hover .marquee__content,
	.marquee--paused .marquee__content {
		animation-play-state: paused;
	}

	.marquee--paused {
		background-color: var(--background);
		color: var(--copy-lighter);
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}
</style>
