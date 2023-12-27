// place files you want to import through the `$lib` alias in this folder.
import { invoke } from '@tauri-apps/api/tauri';
import { debugText, imagesToCompress, imageQuality } from './store';

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
	/** @type {Number} */ quality
) => {
	await invoke('compress_image_command', { inputPath, outputPath, quality }).catch((e) => {
		throw new Error(e);
	});
};

export const checkout = async () => {
	createAppFolder();
	/**
	 * @type {any}
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
		let fileExtension = fileName.split('.').pop();
		fileName = fileName.split('.').slice(0, -1).join('.');
		let outputFileName = `${pictureDirPath}/jelo/${fileName}-${Math.ceil(
			Math.random() * 47
		)}.${fileExtension}`;
		await compressImage(path, outputFileName, quality);
		setDebugText(`compressed ${path} to ${outputFileName} with quality ${quality}`);
		let compressedCount = 0;
		imagesToCompress.subscribe((value) => {
			compressedCount = value.length;
		});
		notify('Jelo', `compressed ${compressedCount} images successfully`);
	}
};

export const setDebugText = (/** @type {string} */ text) => {
	debugText.set(text);
};

export const notify = async (/** @type {string} */ title, /** @type {string} */ body) => {
	let permissionGranted = await isPermissionGranted();
	if (!permissionGranted) {
		const permission = await requestPermission();
		permissionGranted = permission === 'granted';
	}
	if (permissionGranted) {
		sendNotification({ title: title, body: body });
	}
};

export const createAppFolder = async () => {
	await createDir('jelo', { dir: BaseDirectory.Picture, recursive: true });
};
