<script lang="ts">
	export let shown = true;
	export let header: string | number;
	export let description: string | number;
</script>

{#if shown}
	<li>
		<div class="group relative flex items-center px-3 py-2 sm:px-5 sm:py-6">
			<div class="-m-1 block flex-1 p-1">
				<div class="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true"></div>
				<div class="relative flex min-w-0 flex-1 items-center">
					<div class="ml-4 truncate">
						<p class="truncate whitespace-pre-wrap text-sm font-medium text-gray-900">{header}</p>
						<p class="truncate whitespace-pre-wrap text-sm text-gray-500">{description}</p>
					</div>
				</div>
			</div>
		</div>
	</li>
{/if}
