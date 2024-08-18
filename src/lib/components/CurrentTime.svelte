<script lang="ts">
	import { formatDateStandard, runEverySeconds } from '$lib/utils/common';

	let time = $state(new Date());

	runEverySeconds(() => {
		time = new Date();
	}, 1);

	let vnTime = $derived(formatDateStandard(time, 'Asia/Ho_Chi_Minh'));
	let koreaTime = $derived(formatDateStandard(time, 'Asia/Seoul'));
</script>

<div class="current-time">
	<div>VN</div>
	<div class="">{vnTime}</div>
	<div class="">KR</div>
	<div>{koreaTime}</div>
</div>

<style>
	.current-time {
		position: fixed;
		background: black;
		right: 0;
		bottom: 0;
		color: white;
		padding: 4px 8px;

		display: grid;
		grid-template-columns: 3ch 1fr;
		grid-template-rows: 1fr 1fr;
	}
</style>
