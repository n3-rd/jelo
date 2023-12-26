<script>
	import { FileButton } from '@skeletonlabs/skeleton';
	/**
	 * @type {any}
	 */
	let files = [];
</script>
<div class="h-full w-full mx-auto flex justify-center items-center bg-black">

		<div class="picker">
			<FileButton name="files" 
			multiple={true}
			accept="image/*"
			bind:files
			on:change={() => {
				console.log(files);
			}}
			/>
		
	</div>
</div>
