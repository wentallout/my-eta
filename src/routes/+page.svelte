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

	let leftETAHours: number = $state(0); //hours
	let usedETAHours: number = $state(0); //hours
	let originalETAHours: number = $state(0); //hours

	let projectName = $state('Basic Function');
	let employeeName = $state('khoabunny');
	let percentage: number = $state(0);
	let extendHourNumber: number = $state(0);

	let tableData: TableData = $state([]);

	import { isBreakTime, checkIfHalfPercentage, roundTo2Decimals } from '$lib/utils/common';
	import TimeTable from '$lib/components/TimeTable.svelte';

	function startTimer(): void {
		if (timer) clearInterval(timer);

		if (tableData.length === 0) {
			originalETAHours = leftETAHours;
		}

		timer = setInterval(() => {
			const currentTime = new Date();

			if (isBreakTime(currentTime)) {
				isPaused = true;
			} else {
				isPaused = false;
			}

			if (!isPaused && leftETAHours > 0) {
				const delta = 1 / 3600; // 1 second in hours
				leftETAHours -= delta; // Decrease ETA by seconds in hours
				usedETAHours += delta; // Increase used time by seconds in hours
			} else if (leftETAHours <= 0) {
				stopTimer(); // Stop timer if time is up
			}
		}, 1000); // Run every second
		workingStateTracker.workingState === 'working';

		if (checkIfHalfPercentage(usedETAHours, originalETAHours)) {
			workingStateTracker.workingState === 'panic';
		}
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
				etaLeft: roundTo2Decimals(leftETAHours), // Display ETA Left in hours
				percentage: `${percentage}%`,
				reportData: `${projectName}_${employeeName}_${percentage}%_${roundTo2Decimals(usedETAHours)}/${roundTo2Decimals(originalETAHours)} hrs`
			};

			tableData = [...tableData, newRow];
		}
		workingStateTracker.workingState === 'paused';
	}

	function extendETA() {
		let hourNumberAdded = parseFloat(extendHourNumber.toString());

		console.log(hourNumberAdded);

		originalETAHours = originalETAHours + hourNumberAdded;
		leftETAHours = leftETAHours + hourNumberAdded;

		extendHourNumber = 0;
	}
</script>

<Counter {usedETAHours} {originalETAHours}></Counter>

<button onclick={startTimer} class="button working">
	<Play />
	Start
</button>

<button onclick={stopTimer} class="button stop">
	<Pause />
	Stop
</button>

<div class="parent">
	<label for="projectName">Project Name</label>
	<input id="projectName" type="text" bind:value={projectName} />

	<label for="employeeName">Employee Name</label>
	<input id="employeeName" type="text" bind:value={employeeName} />

	<label for="ETALeft">ETA Left (hours)</label>
	<input id="ETALeft" type="text" bind:value={leftETAHours} />
</div>

<div class="">Total ETA: {originalETAHours}</div>

<div class="line full"></div>

<div class="extend-container">
	<input type="number" placeholder="Extend" bind:value={extendHourNumber} />

	{#if extendHourNumber}
		<button class="extend" onclick={() => extendETA()}>Extend (hours)</button>
	{/if}
</div>

<TimeTable {tableData} />

<CurrentTime />

<style>
	.extend {
		background-color: var(--secondary);
		color: var(--secondary-content);
	}

	.stop {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		background-color: var(--error);
		width: 100%;
		height: 56px;
		color: var(--error-content);
	}

	.parent {
		display: grid;
		grid-template-columns: 20% 1fr;
		gap: var(--space-s);
	}

	.extend-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
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
