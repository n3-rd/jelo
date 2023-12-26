<script>
		import { compressImage } from '$lib';
		import { pictureDir } from '@tauri-apps/api/path';

		import FileDrop from 'svelte-tauri-filedrop'
		
	/**
	 * @type {string}
	 */
let pictureDirPath;

pictureDir().then(dir => {
		pictureDirPath = dir;
		console.log("pictureDirPath", pictureDirPath);
});

		/**
		 * 
		 * @param {any} paths
		 */
		async function open(paths) {
				console.log(paths)
				// use rust function here
				for (const path of paths) {
						console.log(`compressing ${path}`)
						let fileName = path.split('/').pop();
						const compressed = await compressImage(path, `${pictureDirPath}/${fileName}-${Math.ceil(Math.random() * 47)}`, 50)
						console.log(`compressed ${path} to ${compressed}`)
				}
	}
</script>
<div class="h-full w-full mx-auto flex justify-center items-center bg-black">

		<FileDrop extensions={['png', 'jpg', 'webp']} handleFiles={open} let:files>
				<div class="dropzone h-96 w-96" class:droppable={files.length > 0}>
					<h2>Drop JSON files</h2>
				</div>
			</FileDrop>
			
</div>

<style>
		.dropzone {
			margin: 20px;
			padding: 20px;
			background: #eee;
		}
		.droppable {
			background: #d6dff0;
		}
	</style>