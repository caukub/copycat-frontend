<script>
	import Slideover from './slideover/Slideover.svelte';
	import { onMount } from 'svelte';
	export let data;

	let showSlideover = false;

	onMount(() => {
		document.querySelectorAll("pre .p").forEach(line => {
			line.addEventListener("click", (event) => {
				const clickX = event.clientX - line.getBoundingClientRect().left;

				if (clickX < 20) {
					document.addEventListener('click', (event) => {
						if (event.shiftKey) {
							showSlideover = !showSlideover;
						}

						let clickedElement = event.target;

						if (clickedElement.classList[0] === 'p') {
							if (window.location.hash && clickedElement.id === window.location.hash.split('#')[1]) {
								clickedElement.style.backgroundColor = '';
								history.replaceState(null, null, window.location.pathname + window.location.search);
							} else {
								clickedElement.scrollIntoView();
								clickedElement.style.backgroundColor = highlightColor;
								window.location.hash = clickedElement.id;

								if (previousElement && window.location.hash && previousElement.id !== clickedElement.id) {
									previousElement.style.backgroundColor = '';
								}

								previousElement = clickedElement;
							}
						}
					});
				}
			});
		});
		const highlightColor = 'oklch(95.32% 0.0218 239.43)';

		let previousElement = null;

		if (window.location.hash) {
			let highlightedElement = document.getElementById(window.location.hash.split('#')[1]);
			highlightedElement.style.backgroundColor = highlightColor;
			highlightedElement.scrollIntoView({ behavior: 'smooth' });

			previousElement = highlightedElement;
		}
	});
</script>

<Slideover bind:showSlideover id={data.id} />

<div class="mb-6 mt-3 rounded bg-hostify-blue px-3 py-2 text-white sm:px-6">
	<div class="text-2xl">
		<div class="mb-1.5 flex justify-between">
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="mr-1.5 h-6 w-6"
				>
					<path
						fill-rule="evenodd"
						d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
						clip-rule="evenodd"
					/>
				</svg>
				<h2 class="font-bold">Analýza</h2>
			</div>
			<div class="flex items-center text-sm font-semibold">
				<a
					href={'/raw/' + data.id}
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
				<a
					on:click={(showSlideover = !showSlideover)}
					class="nojs-hide ml-1.5 flex cursor-pointer rounded-sm bg-white px-1.5 py-0.5 font-bold text-hostify-blue"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="mr-1 mt-0.5 size-4"
					>
						<path d="M6 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
						<path
							fill-rule="evenodd"
							d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm3.5 2.5a3 3 0 1 0 1.524 5.585l1.196 1.195a.75.75 0 1 0 1.06-1.06l-1.195-1.196A3 3 0 0 0 7.5 4.5Z"
							clip-rule="evenodd"
						/>
					</svg>

					Detail
				</a>
			</div>
		</div>
		<p class="text-sm font-semibold leading-8">
			Minecraft verze: <span
				class="ml-0.5 rounded-sm bg-white px-1.5 py-1 font-bold text-hostify-blue"
				>{data['version'] ? data['version'] : 'Neznámá'}</span
			>
		</p>
		<p class="text-sm font-semibold leading-8">
			Platforma: <span class="ml-0.5 rounded-sm bg-white px-1.5 py-1 font-bold text-hostify-blue"
				>{data['platform']}</span
			>
		</p>
	</div>

	{#if data.detections.length > 0}
		<div class="mt-6">
			<div class="detections">
				{#each data.detections as detection}
					<div class="header">
						<div class="i flex items-center justify-between rounded-sm bg-white font-semibold">
							<div class="flex items-center py-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="my-1 ml-2 mr-1.5 h-5 w-5"
								>
									<path
										fill-rule="evenodd"
										d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
										clip-rule="evenodd"
									/>
								</svg>
								{detection.header}
							</div>
							<div
								class="mr-1.5 flex items-center rounded-md bg-hostify-blue text-white"
								class:px-1={detection.detail}
								class:py-0.5={detection.detail}
							>
								{#if detection.detail}
									{#if detection.detail.includes('://')}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="h-5 w-5"
											><path
												fill-rule="evenodd"
												d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
												clip-rule="evenodd"
											/></svg
										>
										<a href={detection.detail} target="_blank">Detail</a>
									{/if}
								{/if}
							</div>
						</div>
					</div>
					<div class="my-2 flex">
						{#if detection.solutions.length > 0}
							<div class="mr-2 flex items-center font-semibold">Řešení</div>
						{/if}
						<div>
							{#each detection.solutions as solution, i}
								{#if i + 1 < detection.solutions.length}
									<div class="solution">{solution}, nebo</div>
								{:else}
									<div class="solution">{solution}</div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<pre class="h-full whitespace-pre-wrap break-words px-3">{@html data.content}</pre>

<style lang="postcss">
	:global(.i) {
		@apply text-hostify-blue;
	}

	:global(.w) {
		@apply text-hostify-yellow;
	}

	:global(.e) {
		@apply text-hostify-red;
	}

	:global(.c) {
		color: green;
	}

	:global(.i, .w, .e, .c) {
		font-weight: 600;
	}

	pre {
		font-size: 0.9rem;
		counter-reset: line-number;
	}

	:global(pre .p) {
		display: block;
		counter-increment: line-number;
		position: relative;
		padding-left: 2em;
	}

	:global(pre .p::before) {
		content: counter(line-number);
		position: absolute;
		left: 0;
		color: #888;
		cursor: pointer;
	}

	.solution {
		border-left: 4px solid #fff;
		padding-left: 0.75rem;
	}
</style>
