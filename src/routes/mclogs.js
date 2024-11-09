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

function selectLogFile() {
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
}

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
