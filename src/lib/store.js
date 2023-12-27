import {writable} from 'svelte/store';

export const imagesToCompress = writable();

export const debugText = writable("");

export const imageQuality = writable(50);

