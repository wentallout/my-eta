<script>
	import '@fontsource-variable/dm-sans';
	import '$styles/global.css';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<main class="content">
	{@render children()}
</main>

<div class="content">
	<Footer></Footer>
</div>

<style>
	main {
		min-height: 100dvh;
	}
</style>
