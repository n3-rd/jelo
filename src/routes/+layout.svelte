<script>
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { createDir, BaseDirectory } from '@tauri-apps/api/fs';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const createAppFolder = async () => {
		await createDir('jelo', { dir: BaseDirectory.Picture, recursive: true });
	};

	createAppFolder();
</script>

<AppShell>
	<!-- (header) -->
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
	<!-- (footer) -->
</AppShell>
