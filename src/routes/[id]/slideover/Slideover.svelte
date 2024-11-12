<script lang="ts">
	import ListItem from './ListItem.svelte';
	import Tab from './Tab.svelte';
	import { Transition } from 'svelte-transition';
	import SearchBar from './SearchBar.svelte';
	export let id: string;

	export let showLeaks = false;

	export let showSlideover: boolean = false;
	let fetched = false;

	$: if (showSlideover) {
		if (!fetched) {
			fetchData();
			fetched = true;
		}
	}

	enum SlideoverState {
		Plugins = 'plugins',
		Ports = 'ports',
		Leaks = 'leaks'
	}

	let slideoverState = SlideoverState.Plugins;

	function changeSlideoverState(newState: SlideoverState): void {
		if (slideoverState !== newState) {
			slideoverState = newState;
		}
	}

	let plugins: [string, string][] = [];

	let searchBarInput = '';

	$: filteredPlugins = plugins.filter((plugin) => {
		let pluginName = plugin[0];
		let normalizedPluginName = pluginName.toLowerCase().replaceAll('-', '').replaceAll(' ', '');
		let normalizedSearchInput = searchBarInput
			.toLowerCase()
			.replaceAll('-', '')
			.replaceAll(' ', '');

		return normalizedPluginName.includes(normalizedSearchInput);
	});

	let ports: Ports;
	let leaks: [string] = [''];

	interface Ports {
		vanilla: VanillaPorts;
		plugins: [string, number];
		mods: [string, number];
	}

	interface VanillaPorts {
		server: number;
		query: number;
		rcon: number;
	}

	async function fetchData() {
		const res = await fetch(`/api/all/${id}`);
		const leaksRes = await fetch(`/api/leaks/${id}`);

		const json = await res.json();

		plugins = Object.entries(json.plugins).sort((a, b) => a[0].localeCompare(b[0]));
		ports = json.ports;
		ports.plugins = Object.entries(json.ports.plugins);
		ports.mods = Object.entries(json.ports.mods);
		leaks = await leaksRes.json();
	}
</script>

<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
	<!-- Background backdrop, show/hide based on slide-over state. -->
	<div class:inset-0={showSlideover} class="fixed"></div>

	<div class:inset-0={showSlideover} class="fixed overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
				<Transition
					show={showSlideover}
					enter="transform transition ease-in-out duration-500 sm:duration-700"
					enterFrom="translate-x-full"
					enterTo="translate-x-0"
					leave="transform transition ease-in-out duration-500 sm:duration-700"
					leaveFrom="translate-x-0"
					leaveTo="translate-x-full"
				>
					<div class="pointer-events-auto w-screen max-w-md">
						<div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
							<div class="p-6">
								<div class="flex items-start justify-between">
									<h2
										on:dblclick={(showLeaks = !showLeaks)}
										class="text-base font-semibold leading-6 text-gray-900"
										id="slide-over-title"
									>
										Detaily
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											on:click={() => (showSlideover = false)}
											type="button"
											class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-hostify-blue"
										>
											<span class="absolute -inset-2.5"></span>
											<span class="sr-only">Close panel</span>
											<svg
												class="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div class="border-b border-gray-200">
								<div class="px-6">
									<nav class="-mb-px flex space-x-6">
										<Tab
											header="Pluginy"
											on:click={() => changeSlideoverState(SlideoverState.Plugins)}
											active={slideoverState === SlideoverState.Plugins}
										/>
										<Tab
											header="Porty"
											on:click={() => changeSlideoverState(SlideoverState.Ports)}
											active={slideoverState === SlideoverState.Ports}
										/>
										{#if showLeaks}
											<Tab
												header="Leaky"
												on:click={() => changeSlideoverState(SlideoverState.Leaks)}
												active={slideoverState === SlideoverState.Leaks}
											/>
										{/if}
									</nav>
								</div>
							</div>
							<ul role="list" class="flex-1 divide-y divide-gray-200 overflow-y-auto">
								{#if slideoverState === SlideoverState.Plugins}
									<SearchBar bind:input={searchBarInput} />
									{#each filteredPlugins as plugin}
										<ListItem header={plugin[0]} description={plugin[1]} />
									{/each}
								{:else if slideoverState === SlideoverState.Ports}
									<ListItem
										header="server"
										description={ports.vanilla.server}
										shown={Boolean(ports.vanilla.server)}
									/>
									<ListItem
										header="query"
										description={ports.vanilla.query}
										shown={Boolean(ports.vanilla.query)}
									/>
									<ListItem
										header="rcon"
										description={ports.vanilla.rcon}
										shown={Boolean(ports.vanilla.rcon)}
									/>

									{#each ports.plugins as port}
										<ListItem header={port[0]} description={port[1]} />
									{/each}

									{#each ports.mods as port}
										<ListItem header={port[0]} description={port[1]} />
									{/each}
								{:else if slideoverState === SlideoverState.Leaks}
									{#each leaks as suspiciousLine}
										<ListItem header={suspiciousLine} description="" />
									{/each}
								{/if}
							</ul>
						</div>
					</div>
				</Transition>
			</div>
		</div>
	</div>
</div>
