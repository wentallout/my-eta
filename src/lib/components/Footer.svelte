<script>
	import FooterLogo from './FooterLogo.svelte';
</script>

<footer class="footer">
	<!-- <img class="footer__logo" src="/images/MyETA.svg" alt="" /> -->
	<div class="footer__logo">
		<FooterLogo />
	</div>
	<div class="">
		<h1>My ETA</h1>
		<p>by <a href="https://wentallout.io.vn">Khoa @wentallout</a></p>
		<a href="https://github.com/wentallout/my-eta">Source code</a>
	</div>
</footer>

<style>
	.footer {
		display: flex;
		align-items: center;
		flex-direction: row;
		height: 200px;
		font-size: var(--step--1);
		color: var(--copy-lighter);
	}

	.footer__logo {
		height: 120px;
		width: 120px;
	}
</style>
