<script lang="ts">
	import hljs from 'highlight.js/lib/core';

	export let content: string;

	const highlightedContent = hljs.highlightAuto(content).value;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
	/>
</svelte:head>
<pre class="whitespace-pre-wrap break-words p-3">{@html highlightedContent}</pre>

<style>
    pre {
        border: 1px solid rgba(0, 0, 0, 0.225)
    }
</style>