<script lang="ts">
	import { format } from '@formkit/tempo';

	let timer: NodeJS.Timeout;
	let isPaused: boolean = false;

	let workingState: 'idle' | 'working' | 'panic' | 'paused' = $state('idle');

	let totalETA: number = $state(0);
	let leftETA: number = $state(totalETA);
	let usedETA: number = $state(0);

	$effect(() => {
		leftETA = totalETA;
	});

	let projectName = $state('Basic Function');
	let employeeName = $state('khoabunny');
	let percentage: number = $state(0);
	let extendHourNumber: number = $state(0);

	import Counter from '$lib/components/Counter.svelte';
	import CurrentTime from '$lib/components/CurrentTime.svelte';

	import type { TableData } from '$lib/types/TableData.ts';
	let tableData: TableData = $state([]);

	function formatHours(hours: number): string {
		return hours.toFixed(2); // Keeps two decimal places
	}

	function checkIfHalfPercentage(time: number) {
		const timePercentage = (time / totalETA) * 100;

		if (timePercentage >= 0.5) {
			return true;
		}
		return false;
	}

	function startTimer(): void {
		if (timer) clearInterval(timer);

		totalETA = leftETA;

		if (checkIfHalfPercentage(leftETA)) {
			workingState === 'panic';
		}
		workingState === 'working';

		timer = setInterval(() => {
			const currentTime = new Date();

			if (currentTime.getHours() === 12 && currentTime.getMinutes() === 0) {
				isPaused = true;
				return;
			}

			if (isPaused && currentTime.getHours() === 13 && currentTime.getMinutes() === 0) {
				isPaused = false;
			}

			if (!isPaused && leftETA > 0) {
				const delta = 1 / 3600; // 1 second in hours
				leftETA -= delta; // Decrease ETA by seconds in hours
				usedETA += delta; // Increase used time by seconds in hours
			} else if (leftETA <= 0) {
				stopTimer(); // Stop timer if time is up
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
				etaLeft: formatHours(leftETA), // Display ETA Left in hours
				percentage: `${percentage}%`,
				reportData: `${formatHours(usedETA)}/${formatHours(totalETA)}`
			};

			tableData = [...tableData, newRow];
		}
		workingState === 'paused';
	}

	function extendETA(hoursExtend: number) {
		totalETA += hoursExtend; // Extend total ETA in hours
		leftETA += hoursExtend; // Also adjust the remaining ETA accordingly
	}
</script>

<Counter {workingState} timeUsed={usedETA} {totalETA}>
	<button onclick={startTimer} class="working">Start</button>

	{#if (workingState as string) === 'working'}
		<button onclick={stopTimer} class="stop">Stop</button>
	{/if}
</Counter>

<div class="parent">
	<label for="projectName">Project Name</label>
	<input id="projectName" type="text" bind:value={projectName} />

	<label for="employeeName">Employee Name</label>
	<input id="employeeName" type="text" bind:value={employeeName} />

	<label for="ETALeft">ETA Left (hours)</label>
	<input id="ETALeft" type="text" bind:value={leftETA} />
</div>

<div class="">Total ETA: {formatHours(totalETA)}</div>

<div class="line full"></div>

<div class="extend-container">
	<input type="number" placeholder="Extend" bind:value={extendHourNumber} />
	<button class="extend" onclick={() => extendETA(extendHourNumber)}>Extend (hours)</button>
</div>

<div class="table-container" style="overflow-x:auto;">
	<table>
		<thead>
			<tr>
				<th>Timestamp</th>
				<th>Project Name</th>
				<th>Employee Name</th>
				<th>ETA Left (hours)</th>
				<th>%</th>
				<th>Report Data</th>
			</tr>
		</thead>

		<tbody>
			{#each tableData as row}
				<tr>
					<td>{row.timestamp}</td>
					<td>{row.projectName}</td>
					<td>{row.employeeName}</td>
					<td>{row.etaLeft}</td>
					<td>{row.percentage}</td>
					<td>{row.reportData}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

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
		gap: 16px;
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

	.table-container {
		margin-block: 40px;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
		border: 1px solid #ddd;

		& thead {
			background-color: var(--foreground);
		}
	}

	th,
	td {
		text-align: left;
		padding: 8px;
	}
</style>
