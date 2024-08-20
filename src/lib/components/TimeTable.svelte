<script lang="ts">
	import type { TableData } from '$lib/types/TableData';
	import { convertHoursToReadable } from '$lib/utils/common';
	let { tableData }: MyProps = $props();

	interface MyProps {
		tableData: TableData;
	}
</script>

<div class="table-container" style="overflow-x:auto;">
	<table>
		<thead>
			<tr>
				<th>Timestamp</th>
				<th>ETA Left (hours)</th>
				<th>% Complete</th>
				<th>Report Data</th>
			</tr>
		</thead>

		<tbody>
			{#each tableData as row}
				<tr>
					<td>{row.timestamp}</td>
					<td>{convertHoursToReadable(row.etaLeft)}</td>
					<td>{row.percentage}</td>
					<td>{row.reportData}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		margin-block: 40px;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
		border: 1px solid var(--border);

		& thead {
			background-color: var(--foreground);
		}
	}

	th,
	td {
		text-align: left;
		padding: var(--space-2xs);
		border: 1px solid var(--border);
	}
</style>
