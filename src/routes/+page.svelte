<script>
	import { setDebugText } from '$lib';
	import { imagesToCompress } from '$lib/store';

	import FileDrop from 'svelte-tauri-filedrop';

	const extensions = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'webp', 'WEBP'];

	/**
	 *
	 * @param {any} paths
	 */
	async function open(paths) {
		/**
		 * @type {any[]}
		 */
		let filePaths = [];
		console.log('paths:', paths); // log the paths array
		for (const path of paths) {
			console.log('path:', path); // log each path object
			filePaths.push(path);
		}
		// @ts-ignore
		imagesToCompress.update((value) => [...value, ...filePaths]);
		let count;
		imagesToCompress.subscribe((value) => {
			console.log('value:', value);
			count = value.length;
		});
		setDebugText(`${count} images to compress`);
	}
</script>

<div class="h-full w-full mx-auto flex justify-center items-center bg-black">
	<FileDrop {extensions} handleFiles={open} let:files>
		<div
			class="dropzone h-[78%] w-[78%] flex justify-center items-center border-2 border-white border-dashed rounded-xl bg-[#222]"
			class:droppable={files.length > 0}
		>
			<h2 class="text-5xl font-semibold text-center">Drop Images to compress</h2>
		</div>
	</FileDrop>
</div>

<style>
	.dropzone {
		margin: 20px;
		padding: 20px;
	}
	.droppable {
		transition: background 0.3s ease-in-out;
		background: #d6dff0;
		color: black;
	}
</style>
