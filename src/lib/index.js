// place files you want to import through the `$lib` alias in this folder.
import { invoke } from '@tauri-apps/api/tauri'
export const compressImage = async(/** @type {string} */ inputPath, /** @type {string} */ outputPath, /** @type {Number} */ quality)=>{
await invoke('compress_image_command', {inputPath, outputPath, quality})
.catch((e)=>{
throw new Error(e)
})
}