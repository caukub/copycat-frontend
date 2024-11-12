<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import json from 'highlight.js/lib/languages/json';
	import RawButton from './RawButton.svelte';

	hljs.registerLanguage('json', json);

	export let content: string;
	export let id;

	const highlightedContent = hljs.highlight(content, { language: 'json' }).value;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/atom-one-light.min.css"
		integrity="sha512-o5v54Kh5PH0dgnf9ei0L+vMRsbm5fvIvnR/XkrZZjN4mqdaeH7PW66tumBoQVIaKNVrLCZiBEfHzRY4JJSMK/Q=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<RawButton bind:id />
<pre class="h-full whitespace-pre-wrap break-words p-3">{@html highlightedContent}</pre>

<style>
	pre {
		border: 1px solid rgba(0, 0, 0, 0.225);
	}
</style>
