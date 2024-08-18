<script>
	import '@fontsource-variable/dm-sans';
	import '$styles/global.css';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div>
	<main class="content">
		<slot />
	</main>

	<div class="content">
		<Footer></Footer>
	</div>
</div>

<style>
	main {
		min-height: 100dvh;
	}
</style>
