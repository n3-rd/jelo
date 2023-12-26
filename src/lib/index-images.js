import { imagesToCompress } from "./store"
import { get } from "svelte/store";


export const indexImages = (/** @type {any} */ images) => {
    let imagesArray = Array.from(images);
    imagesToCompress.set(imagesArray);

    imagesToCompress.subscribe(value => {
        console.log(value.map(file => file));
    });
}