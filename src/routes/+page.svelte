<script lang="ts">
	import { format } from '@formkit/tempo';

	import type { TableData } from '$lib/types/TableData';

	import Counter from '$lib/components/Counter.svelte';
	import CurrentTime from '$lib/components/CurrentTime.svelte';
	import { workingStateTracker } from '$lib/stores/working-state.svelte';

	import Pause from '~icons/ph/pause';

	import Play from '~icons/ph/play';

	let timer: any;
	let isPaused: boolean = false;

	let usedETAHours: string = $state(''); //hours
	let originalETAHours: string = $state(''); //hours

	let leftETAHours: number = $derived(parseFloat(originalETAHours) - parseFloat(usedETAHours));

	let projectName = $state('');
	let employeeName = $state('');
	let percentage: number = $state(0);
	let extendHourNumber: number = $state(0);

	let tableData: TableData = $state([]);

	import { isBreakTime, checkIfHalfPercentage, roundTo2Decimals } from '$lib/utils/common';
	import TimeTable from '$lib/components/TimeTable.svelte';

	function startTimer(): void {
		if (timer) clearInterval(timer);

		timer = setInterval(() => {
			const currentTime = new Date();

			if (isBreakTime(currentTime)) {
				isPaused = true;
			} else {
				isPaused = false;
			}

			if (!isPaused) {
				const delta = 1 / 3600; // 1 second in hours

				usedETAHours = (parseFloat(usedETAHours) + delta).toString(); // Increase used time by seconds in hours
			} else if (usedETAHours === originalETAHours) {
				stopTimer(); // Stop timer if time is up
			}
			if (checkIfHalfPercentage(usedETAHours, originalETAHours)) {
				workingStateTracker.workingState = 'panic';
			} else {
				workingStateTracker.workingState = 'working';
			}
		}, 1000); // Run every second
	}

	function stopTimer(): void {
		if (timer) clearInterval(timer);

		const userPercentage = prompt('Please enter your completion percentage:');
		if (userPercentage) {
			percentage = parseFloat(userPercentage);

			const newRow = {
				timestamp: format(new Date(), 'hh:mm:ss MM/DD/YYYY'),
				projectName,
				employeeName,
				etaLeft: leftETAHours, // Display ETA Left in hours
				percentage: `${percentage}%`,
				reportData: `${projectName}_${employeeName}_${percentage}%_${roundTo2Decimals(usedETAHours)}/${roundTo2Decimals(parseFloat(originalETAHours))} hrs`
			};

			tableData = [...tableData, newRow];
		}
		workingStateTracker.workingState = 'paused';
	}

	function extendETA() {
		let hourNumberAdded = parseFloat(extendHourNumber.toString());
		originalETAHours = (parseFloat(originalETAHours) + hourNumberAdded).toString();
		extendHourNumber = 0;
	}
</script>

<Counter {usedETAHours} {originalETAHours}></Counter>

<div class="button-container">
	{#if workingStateTracker.workingState === 'idle' || workingStateTracker.workingState === 'paused'}
		<button
			onclick={startTimer}
			disabled={parseFloat(usedETAHours) >= parseFloat(originalETAHours) ||
				!employeeName ||
				!projectName ||
				!usedETAHours ||
				!originalETAHours}
			class="button working">
			<Play />
			Start
		</button>
	{/if}

	{#if workingStateTracker.workingState === 'working' || workingStateTracker.workingState === 'panic'}
		<button onclick={stopTimer} class="button btn--stop">
			<Pause />
			Stop
		</button>
	{/if}
</div>

<div class="project-grid">
	<label for="projectName">Project Name</label>
	<input id="projectName" type="text" bind:value={projectName} placeholder="Royal Style v12" />

	<label for="employeeName">Employee Name</label>
	<input id="employeeName" type="text" bind:value={employeeName} placeholder="khoabunny" />
</div>

<div class="eta-grid">
	<div>
		<label for="usedETAHours">Used</label>
		<input placeholder="hours" id="usedETAHours" type="number" bind:value={usedETAHours} />
	</div>

	<div>
		<label for="ETAOriginal">Total</label>
		<input placeholder="hours" id="ETAOriginal" type="number" bind:value={originalETAHours} />
	</div>
</div>

<div class="line full"></div>

<div class="extend-container">
	<input type="number" placeholder="Extend" bind:value={extendHourNumber} />

	<button class="extend" disabled={!extendHourNumber} onclick={() => extendETA()}
		>Extend (hours)</button>
</div>

<TimeTable {tableData} />

<CurrentTime />

<style>
	.button-container {
		margin-bottom: var(--space-xl);
	}
	.eta-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
	}
	.extend {
		background-color: var(--secondary);
		color: var(--secondary-content);
	}

	.btn--stop {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		background-color: transparent;
		border: 1px solid var(--error);
		width: 100%;
		height: 56px;
		color: var(--error);
		overflow: visible;
	}

	.project-grid {
		display: grid;
		grid-template-columns: 15ch 1fr;
		gap: var(--space-2xs);
		margin-bottom: var(--space-l);
		align-items: center;
	}

	.extend-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-radius: 1rem;
		overflow: hidden;
	}

	.extend-container > button {
		border-radius: 0;
	}

	.working {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		background-color: var(--primary);
		width: 100%;
		height: 56px;
		color: var(--primary-content);
	}
</style>
