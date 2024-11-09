<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import json from 'highlight.js/lib/languages/json';

	hljs.registerLanguage('json', json);

	export let content: string;

	const highlightedContent = hljs.highlight(content, { language: 'json' }).value;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
	/>
</svelte:head>

<pre class="h-full whitespace-pre-wrap break-words">{@html highlightedContent}</pre>
