// place files you want to import through the `$lib` alias in this folder.
import { invoke } from '@tauri-apps/api/tauri';
import { debugText, imagesToCompress, imageQuality, compressing } from './store';

import { pictureDir } from '@tauri-apps/api/path';
import {
	isPermissionGranted,
	requestPermission,
	sendNotification
} from '@tauri-apps/api/notification';

import { createDir, BaseDirectory } from '@tauri-apps/api/fs';

/**
 * @type {string}
 */
let pictureDirPath;

pictureDir().then((dir) => {
	pictureDirPath = dir;
	console.log('pictureDirPath', pictureDirPath);
});

export const compressImage = async (
	/** @type {string} */ inputPath,
	/** @type {string} */ outputPath,
	/** @type {number} */ quality
) => {
	try {
		compressing.set(true);
		await invoke('compress_image_command', { inputPath, outputPath, quality });
		compressing.set(false);
	} catch (/**
	 * @type {any}
	 */ e) {
		compressing.set(false);
		throw new Error(
			`Failed to compress image at ${inputPath} to ${outputPath} with quality ${quality}: ${e.message}`
		);
	}
};

export const checkout = async () => {
	try {
		createAppFolder();
		/**
		 * @type {any[]}
		 */
		let images = [];
		imagesToCompress.subscribe((value) => {
			images = value;
		});
		let quality = 0;
		imageQuality.subscribe((value) => {
			quality = value;
		});

		for (const path of images) {
			setDebugText(`compressing ${path} with quality ${quality}`);
			let fileName = path.split('/').pop();
			let fileExtension = 'jpg';
			fileName = fileName.split('.').slice(0, -1).join('.');
			let outputFileName = `${pictureDirPath}/jelo/${fileName}-${Math.ceil(
				Math.random() * 4000
			)}-${quality}%.${fileExtension}`;
			await compressImage(path, outputFileName, quality);
			setDebugText(`compressed ${path} to ${outputFileName} with quality ${quality}`);
		}
		notify('Jelo', `compressed ${images.length} images successfully`);
		imagesToCompress.set([]); // Clear the image count
	} catch (/**
	 * @type {any}
	 */ e) {
		compressing.set(false);
		setDebugText(`Failed to compress images: ${e.message}`);
	}
};

export const notify = async (/** @type {string} */ title, /** @type {string} */ body) => {
	try {
		let permissionGranted = await isPermissionGranted();
		if (!permissionGranted) {
			const permission = await requestPermission();
			permissionGranted = permission === 'granted';
		}
		if (permissionGranted) {
			sendNotification({ title: title, body: body });
		}
	} catch (
		/**
		 * @type {any}
		 */
		e
	) {
		console.error(`Failed to send notification: ${e.message}`);
	}
};

export const createAppFolder = async () => {
	try {
		await createDir('jelo', { dir: BaseDirectory.Picture, recursive: true });
	} catch (/**
	 * @type {any}
	 */ e) {
		throw new Error(`Failed to create app folder: ${e.message}`);
	}
};

export const setDebugText = (/** @type {string} */ text) => {
	debugText.set('');
	debugText.set(text);
};
