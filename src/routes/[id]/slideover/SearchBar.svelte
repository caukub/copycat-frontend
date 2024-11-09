<script lang="ts">
	export let input: string;
</script>

<div class="relative my-2 flex items-center">
	<input
		bind:value={input}
		type="text"
		name="search"
		id="search"
		class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
	/>
	<div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			class="inline-flex h-6 w-6 items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"
		>
			<path
				fill-rule="evenodd"
				d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
				clip-rule="evenodd"
			/>
		</svg>
	</div>
</div>
