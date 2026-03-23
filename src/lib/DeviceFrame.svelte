<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { DevicePreset } from './devices';

	let { preset, children }: { preset: DevicePreset; children: Snippet } = $props();

	const outerWidth = $derived(preset.screenWidth + preset.bezel.left + preset.bezel.right);
	const outerHeight = $derived(preset.screenHeight + preset.bezel.top + preset.bezel.bottom);
</script>

<div
	class="device-shell"
	style="
		width: {outerWidth}px;
		height: {outerHeight}px;
		border-radius: {preset.borderRadius}px;
	"
>
	<!-- Bezel details -->
	{#if preset.hasHomeButton}
		<div class="home-button" style="bottom: {(preset.bezel.bottom - 46) / 2}px;"></div>
		<!-- Top speaker -->
		<div class="speaker" style="top: {preset.bezel.top / 2 - 3}px;"></div>
		<!-- Top camera -->
		<div class="front-camera" style="top: {preset.bezel.top / 2 - 5}px;"></div>
	{/if}

	<!-- Screen -->
	<div
		class="screen"
		style="
			top: {preset.bezel.top}px;
			left: {preset.bezel.left}px;
			width: {preset.screenWidth}px;
			height: {preset.screenHeight}px;
			border-radius: {preset.screenRadius}px;
		"
	>
		<!-- Status bar -->
		<div class="status-bar" class:status-bar-wide={preset.screenWidth > 500}>
			<span class="status-time">9:41</span>
			{#if preset.hasDynamicIsland}
				<div class="dynamic-island"></div>
			{/if}
			<div class="status-icons">
				<!-- Signal bars -->
				<svg width="17" height="12" viewBox="0 0 17 12" fill="none">
					<rect x="0" y="9" width="3" height="3" rx="0.5" fill="currentColor" />
					<rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
					<rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
					<rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
				</svg>
				<!-- WiFi -->
				<svg width="16" height="12" viewBox="0 0 16 12" fill="none">
					<path d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" fill="currentColor" />
					<path
						d="M4.93 7.93a4.24 4.24 0 016.14 0"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
					/>
					<path
						d="M2.4 5.4a7.5 7.5 0 0111.2 0"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
					/>
					<path
						d="M.1 2.88a10.8 10.8 0 0115.8 0"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
					/>
				</svg>
				<!-- Battery -->
				<svg width="27" height="13" viewBox="0 0 27 13" fill="none">
					<rect
						x="0.5"
						y="0.5"
						width="22"
						height="12"
						rx="2.5"
						stroke="currentColor"
						stroke-width="1"
					/>
					<rect x="2.5" y="2.5" width="18" height="8" rx="1" fill="currentColor" />
					<path d="M24 4.5v4a2 2 0 000-4z" fill="currentColor" opacity="0.5" />
				</svg>
			</div>
		</div>

		<!-- Chrome: Safari or Twitter in-app browser -->
		{#if preset.chrome === 'safari'}
			<div class="safari-url-bar">
				<div class="url-field">
					<svg class="lock-icon" width="10" height="12" viewBox="0 0 10 12" fill="none">
						<rect
							x="0.5"
							y="5"
							width="9"
							height="6.5"
							rx="1.5"
							stroke="currentColor"
							stroke-width="1"
						/>
						<path
							d="M2.5 5V3.5a2.5 2.5 0 015 0V5"
							stroke="currentColor"
							stroke-width="1"
							fill="none"
						/>
					</svg>
					<span class="url-text">localhost</span>
				</div>
			</div>
		{:else if preset.chrome === 'twitter-inapp'}
			<div class="twitter-chrome">
				<div class="twitter-nav">
					<button class="twitter-back">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
							<path
								d="M8 1L3 6l5 5"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<span class="twitter-url">localhost:5173</span>
					<div class="twitter-actions">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<circle cx="4" cy="8" r="1.2" fill="currentColor" />
							<circle cx="8" cy="8" r="1.2" fill="currentColor" />
							<circle cx="12" cy="8" r="1.2" fill="currentColor" />
						</svg>
					</div>
				</div>
			</div>
		{/if}

		<!-- Viewport: scrollable game area -->
		<div class="viewport">
			{@render children()}
		</div>

		<!-- Bottom chrome -->
		{#if preset.chrome === 'safari'}
			<div class="safari-toolbar">
				<!-- Back -->
				<button class="toolbar-btn">
					<svg width="13" height="21" viewBox="0 0 13 21" fill="none">
						<path
							d="M11 2L2 10.5 11 19"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<!-- Forward -->
				<button class="toolbar-btn">
					<svg width="13" height="21" viewBox="0 0 13 21" fill="none">
						<path
							d="M2 2l9 8.5L2 19"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<!-- Share -->
				<button class="toolbar-btn">
					<svg width="18" height="21" viewBox="0 0 18 21" fill="none">
						<path
							d="M9 1v12M4 5l5-4 5 4"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M1 10v8a2 2 0 002 2h12a2 2 0 002-2v-8"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
						/>
					</svg>
				</button>
				<!-- Bookmarks -->
				<button class="toolbar-btn">
					<svg width="19" height="21" viewBox="0 0 19 21" fill="none">
						<path
							d="M1 19l8.5-6L18 19V2a1 1 0 00-1-1H2a1 1 0 00-1 1z"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linejoin="round"
							fill="none"
						/>
					</svg>
				</button>
				<!-- Tabs -->
				<button class="toolbar-btn">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<rect
							x="1"
							y="5"
							width="12"
							height="14"
							rx="2"
							stroke="currentColor"
							stroke-width="1.8"
							fill="none"
						/>
						<path
							d="M7 5V3a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2h-2"
							stroke="currentColor"
							stroke-width="1.8"
							fill="none"
						/>
					</svg>
				</button>
			</div>
		{/if}

		<!-- Home indicator -->
		{#if !preset.hasHomeButton}
			<div class="home-indicator"></div>
		{/if}
	</div>
</div>

<style>
	.device-shell {
		position: relative;
		background: #1a1a1a;
		box-shadow:
			0 0 0 1px #333,
			0 20px 60px rgba(0, 0, 0, 0.6),
			inset 0 0 0 1px rgba(255, 255, 255, 0.05);
		flex-shrink: 0;
	}

	.screen {
		position: absolute;
		background: #000;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	/* Bezel details */
	.home-button {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 46px;
		height: 46px;
		border-radius: 50%;
		border: 2px solid #333;
		background: #111;
	}

	.speaker {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 50px;
		height: 6px;
		border-radius: 3px;
		background: #222;
	}

	.front-camera {
		position: absolute;
		left: 50%;
		margin-left: 40px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #1a1a2a;
		border: 1px solid #222;
	}

	/* Status bar */
	.status-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 24px 4px;
		height: 44px;
		box-sizing: border-box;
		background: #000;
		position: relative;
		flex-shrink: 0;
		color: #fff;
	}

	.status-bar-wide {
		padding: 8px 20px 4px;
		height: 28px;
	}

	.status-time {
		font-size: 15px;
		font-weight: 600;
		letter-spacing: 0.02em;
		font-family: -apple-system, 'SF Pro Text', system-ui, sans-serif;
		z-index: 1;
	}

	.dynamic-island {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 126px;
		height: 36px;
		background: #000;
		border-radius: 22px;
		z-index: 2;
		border: 1px solid #111;
	}

	.status-icons {
		display: flex;
		align-items: center;
		gap: 5px;
		color: #fff;
		z-index: 1;
	}

	/* Safari URL bar */
	.safari-url-bar {
		background: #1c1c1e;
		padding: 6px 16px 8px;
		flex-shrink: 0;
	}

	.url-field {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		background: #2c2c2e;
		border-radius: 10px;
		padding: 8px 12px;
		color: #999;
		font-size: 14px;
		font-family: -apple-system, 'SF Pro Text', system-ui, sans-serif;
	}

	.lock-icon {
		color: #999;
		flex-shrink: 0;
	}

	.url-text {
		color: #fff;
		font-size: 14px;
	}

	/* Twitter in-app browser chrome */
	.twitter-chrome {
		background: #000;
		flex-shrink: 0;
		border-bottom: 0.5px solid #2f3336;
	}

	.twitter-nav {
		display: flex;
		align-items: center;
		padding: 8px 12px;
		gap: 12px;
	}

	.twitter-back {
		background: none;
		border: none;
		color: #1d9bf0;
		padding: 4px;
		cursor: default;
		display: flex;
		align-items: center;
	}

	.twitter-url {
		flex: 1;
		color: #71767b;
		font-size: 14px;
		font-family: -apple-system, 'SF Pro Text', system-ui, sans-serif;
		text-align: center;
	}

	.twitter-actions {
		color: #71767b;
		display: flex;
		align-items: center;
		padding: 4px;
	}

	/* Viewport */
	.viewport {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		background: #1a1a2e;
		-webkit-overflow-scrolling: touch;
	}

	/* Safari bottom toolbar */
	.safari-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: #1c1c1e;
		padding: 6px 8px 2px;
		flex-shrink: 0;
		border-top: 0.5px solid #333;
	}

	.toolbar-btn {
		background: none;
		border: none;
		color: #0a84ff;
		padding: 6px 10px;
		cursor: default;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Home indicator */
	.home-indicator {
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		flex-shrink: 0;
	}

	.home-indicator::after {
		content: '';
		width: 134px;
		height: 5px;
		background: #555;
		border-radius: 3px;
	}
</style>
