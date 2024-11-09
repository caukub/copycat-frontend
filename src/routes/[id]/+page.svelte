<script lang="ts">
	import Log from './Log.svelte';
	import type { PageData } from './$types';
	import Json from './Json.svelte';
	import Yaml from './Yaml.svelte';
	import Other from './Other.svelte';

	export let data: PageData;

	enum PasteType {
		Log = 'log',
		Json = 'json',
		Yaml = 'yaml',
		Other = 'other'
	}
</script>

{#if data['pasteType'] === PasteType.Log}
	<Log {data} />
{:else if data['pasteType'] === PasteType.Json}
	<Json content={data.content} />
{:else if data['pasteType'] === PasteType.Yaml}
	<Yaml content={data.content} />
{:else if data['pasteType'] === PasteType.Other}
	<Other content={data.content} />
{/if}
