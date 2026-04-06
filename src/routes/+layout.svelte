<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import DeviceFrame from '$lib/DeviceFrame.svelte';
	import { devices } from '$lib/devices';

	let { children } = $props();

	let selectedDevice = $state(devices[2]);

	// Auto-scale to fit viewport
	let containerEl = $state<HTMLDivElement | null>(null);
	let scale = $state(1);

	function recalcScale(): void {
		if (containerEl === null) {
			return;
		}
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const deviceW =
			selectedDevice.screenWidth + selectedDevice.bezel.left + selectedDevice.bezel.right;
		const deviceH =
			selectedDevice.screenHeight + selectedDevice.bezel.top + selectedDevice.bezel.bottom;
		// Leave space for picker bar (60px top) + some padding
		const availH = vh - 80;
		const availW = vw - 40;
		const s = Math.min(1, availW / deviceW, availH / deviceH);
		scale = Math.round(s * 1000) / 1000;
	}

	$effect(() => {
		// Re-run when device changes — access selectedDevice to track it
		void selectedDevice;
		recalcScale();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Super Claude RPG</title>
</svelte:head>

<svelte:window onresize={recalcScale} />

<div class="desktop">
	<!-- Device picker -->
	<div class="picker-bar">
		<span class="picker-label">Device</span>
		{#each devices as device (device.id)}
			<button
				class="picker-btn"
				class:active={selectedDevice.id === device.id}
				onclick={() => (selectedDevice = device)}
			>
				{device.name}
			</button>
		{/each}
	</div>

	<!-- Device frame -->
	<div class="device-container" bind:this={containerEl}>
		<div class="device-scaler" style="transform: scale({scale}); transform-origin: top center;">
			<DeviceFrame preset={selectedDevice}>
				{@render children()}
			</DeviceFrame>
		</div>
	</div>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background: #0a0a0a;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		color: #e0e0e0;
		-webkit-font-smoothing: antialiased;
		overflow: hidden;
	}

	.desktop {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Picker bar */
	.picker-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		flex-shrink: 0;
	}

	.picker-label {
		font-size: 12px;
		color: #555;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 600;
		margin-right: 4px;
	}

	.picker-btn {
		padding: 6px 14px;
		background: #1a1a1a;
		border: 1px solid #333;
		border-radius: 6px;
		color: #888;
		font-family: inherit;
		font-size: 13px;
		cursor: pointer;
		transition: all 0.15s;
	}

	.picker-btn:hover {
		background: #222;
		border-color: #555;
		color: #ccc;
	}

	.picker-btn.active {
		background: #1a1a2e;
		border-color: #5555aa;
		color: #aaaaff;
	}

	/* Device container */
	.device-container {
		flex: 1;
		display: flex;
		justify-content: center;
		padding-top: 8px;
		overflow: hidden;
	}

	.device-scaler {
		will-change: transform;
	}
</style>
