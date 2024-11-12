<script lang="ts">
	import type { PageData } from './$types';
	import SvelteMarkdown from 'svelte-markdown';

	export let data: PageData;
</script>

<div class="pr-12">
	<div class="mx-4 max-w-6xl lg:mx-24 xl:mx-32">
		<SvelteMarkdown source={data.markdown} />
	</div>
</div>

<style class="postcss">
</style>
