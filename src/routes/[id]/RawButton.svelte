<script>
	export let id;
</script>

<div class="mb-2 flex items-center justify-end bg-white text-sm font-semibold">
	<a
		href={'/raw/' + id}
		target="_blank"
		class="flex cursor-pointer rounded-sm bg-white px-1.5 py-0.5 font-bold text-hostify-blue"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="mr-1 mt-1 size-4"
		>
			<path
				fill-rule="evenodd"
				d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 2.75ZM2 6.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 2 9.75ZM9.22 9.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V8.56l-.97.97a.75.75 0 0 1-1.06 0Z"
				clip-rule="evenodd"
			/>
		</svg>
		Raw
	</a>
</div>
