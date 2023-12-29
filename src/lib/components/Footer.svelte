<script>
	import { checkout } from '$lib';
	import { debugText, imageQuality, compressing } from '$lib/store';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	let dText = '';
	let quality = 0;
	let imageCompressing = false;
	$: {
		dText = $debugText;
		quality = $imageQuality;
		imageCompressing = $compressing;
	}

	let max = 90;
	let min = 10;
</script>

<div class="h-14 w-full flex justify-between px-24">
	<div
		class="debug flex h-full w-[43.33%] justify-center items-center px-7 max-h-full overflow-auto"
	>
		<div class="whitespace-normal break-words">{dText}</div>
	</div>

	<div class="quality flex justify-center items-center w-[43.33%]">
		<RangeSlider
			name="range-slider"
			bind:value={quality}
			{max}
			{min}
			step={1}
			class="w-full"
			on:change={() => {
				imageQuality.set(quality);
			}}
		>
			<div class="flex justify-between items-center">
				<div class="text-xs">Quality {quality} / {max}</div>
			</div>
		</RangeSlider>
	</div>

	<div class="flex justify-center items-center w-[23.33%]">
		<button
			class="btn variant-filled"
			disabled={imageCompressing}
			on:click={() => {
				checkout();
			}}
		>
			<span
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="M3 20h18L12 4z" /></svg
				></span
			>
			<span>
				{#if quality > 50}
					<span class="transition-all duration-150 ease-in-out"> Decompress </span>
				{:else}
					<span class="transition-all duration-150 ease-in-out"> Compress </span>
				{/if}
			</span>
		</button>
	</div>
</div>
