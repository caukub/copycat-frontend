<script lang="ts">
	export let header: string;
	export let active: boolean;
</script>

{#if active}
	<button
		class="whitespace-nowrap border-b-2 border-hostify-blue px-1 pb-4 text-sm font-medium text-hostify-blue"
		>{header}</button
	>
{:else}
	<button
		on:click
		class="whitespace-nowrap border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
		>{header}</button
	>
{/if}
