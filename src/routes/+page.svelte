<script>
	import { onMount } from 'svelte';

	let selectLogFile = () => {};

	onMount(async () => {
		const pasteArea = document.getElementById('log');

		pasteArea.focus();

		function readFile(file) {
			return new Promise((resolve, reject) => {
				let reader = new FileReader();
				reader.onload = () => resolve(new Uint8Array(reader.result));
				reader.onerror = (e) => reject(e);
				reader.readAsArrayBuffer(file);
			});
		}

		async function loadFileContents(file) {
			if (file.size > 1024 * 1024 * 100) {
				return;
			}
			let content = await readFile(file);
			if (file.name.endsWith('.gz')) {
				content = await unpackGz(content);
			}

			if (content.includes(0)) {
				return;
			}

			pasteArea.value = new TextDecoder().decode(content);
		}

		function loadScript(url) {
			return new Promise((resolve, reject) => {
				let elem = document.createElement('script');
				elem.addEventListener('load', resolve);
				elem.addEventListener('error', reject);
				elem.src = url;
				document.head.appendChild(elem);
			});
		}

		async function loadFflate() {
			if (typeof fflate === 'undefined') {
				await loadScript('https://unpkg.com/fflate');
			}
		}

		selectLogFile = function selectLogFile() {
			let input = document.createElement('input');
			input.type = 'file';
			input.style.display = 'none';
			document.body.appendChild(input);
			input.onchange = async () => {
				if (input.files.length) {
					await loadFileContents(input.files[0]);
				}
			};
			input.click();
			document.body.removeChild(input);
		};

		async function unpackGz(data) {
			if (typeof DecompressionStream === 'undefined') {
				await loadFflate();
				return fflate.gunzipSync(data);
			}

			let inputStream = new ReadableStream({
				start: (controller) => {
					controller.enqueue(data);
					controller.close();
				}
			});
			const ds = new DecompressionStream('gzip');
			const decompressedStream = inputStream.pipeThrough(ds);
			return new Uint8Array(await new Response(decompressedStream).arrayBuffer());
		}
	});
</script>

<form action="/upload" method="POST" enctype="multipart/form-data">
	<div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="bd max-w-3xxx mx-auto">
			<div class="bb flex items-center justify-between py-3">
				<p class="ml-3 font-semibold">
					Vložte log níže <span class="nojs-hide">nebo</span>
					<button
						on:click|preventDefault={selectLogFile}
						class="file-upload bbd nojs-hide ml-1 cursor-pointer rounded px-1 py-1 text-black text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="mb-0.5 size-4 text-black"
						>
							<path
								d="M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z"
							/>
							<path
								d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z"
							/>
						</svg>

						<span class="text-black">Nahrajte soubor</span></button
					>
				</p>
				<button
					class="upload-btns mr-2 flex items-center justify-center rounded font-semibold text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						fill="currentColor"
						class="mr-1 size-4"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M433.9 129.9l-83.9-83.9A48 48 0 0 0 316.1 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V163.9a48 48 0 0 0 -14.1-33.9zM224 416c-35.3 0-64-28.7-64-64 0-35.3 28.7-64 64-64s64 28.7 64 64c0 35.3-28.7 64-64 64zm96-304.5V212c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12V108c0-6.6 5.4-12 12-12h228.5c3.2 0 6.2 1.3 8.5 3.5l3.5 3.5A12 12 0 0 1 320 111.5z"
						/></svg
					>
					Uložit
				</button>
			</div>

			<textarea
				required
				name="content"
				id="log"
				class="w-full pl-4 pt-3"
				spellcheck="false"
				placeholder="..."
				minlength="3"
			></textarea>

			<div class="bt flex items-center justify-end py-3">
				<button
					type="submit"
					class="upload-btns mr-2 flex items-center justify-center rounded font-semibold text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						fill="currentColor"
						class="mr-1 size-4"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M433.9 129.9l-83.9-83.9A48 48 0 0 0 316.1 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V163.9a48 48 0 0 0 -14.1-33.9zM224 416c-35.3 0-64-28.7-64-64 0-35.3 28.7-64 64-64s64 28.7 64 64c0 35.3-28.7 64-64 64zm96-304.5V212c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12V108c0-6.6 5.4-12 12-12h228.5c3.2 0 6.2 1.3 8.5 3.5l3.5 3.5A12 12 0 0 1 320 111.5z"
						/></svg
					>
					Uložit
				</button>
			</div>
		</div>
	</div>
</form>

<style>
	textarea {
		font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		height: 70vh;

		border: none;
		overflow: auto;
		outline: none;

		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;

		resize: none;
	}

	.bd {
		border: 1px solid rgba(0, 0, 0, 0.125);
		box-shadow: 0 0.5rem 1rem #00000026;
		border-radius: 0.25rem;
	}

	.bbd {
		border: 1px solid rgba(0, 0, 0, 0.125);

		border-radius: 0.25rem;
	}

	.bb {
		border-bottom: 1px solid rgba(0, 0, 0, 0.125);
	}

	.bt {
		border-top: 1px solid rgba(0, 0, 0, 0.125);
	}

	.upload-btns {
		padding: 0.5rem 0.6rem;
		background-color: #017bfb;
	}

	svg {
		display: inline-block;
	}
</style>
