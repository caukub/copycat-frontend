<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import yaml from 'highlight.js/lib/languages/yaml';

	hljs.registerLanguage('yaml', yaml);

	export let content: string;

	const highlightedContent = hljs.highlight(content, { language: 'yaml' }).value;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
	/>
</svelte:head>

<pre class="h-full whitespace-pre-wrap break-words p-3">{@html highlightedContent}</pre>

<style>
    pre {
        border: 1px solid rgba(0, 0, 0, 0.225)
    }
</style>