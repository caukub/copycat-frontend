<script>
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
</script>

<Navbar />

<main class="container mx-auto">
	<slot />
</main>

<Footer />

<style>
	main {
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Roboto,
			Helvetica Neue,
			Arial,
			Noto Sans,
			Liberation Sans,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			Segoe UI Symbol,
			'Noto Color Emoji';
	}
</style>
