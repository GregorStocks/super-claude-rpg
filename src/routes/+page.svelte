<script lang="ts">
	import { game } from '$lib/game.svelte';
</script>

<div class="game-content">
	<header class="top-bar">
		<span class="act-label">ACT 1</span>
		<h1>PRETRAINING</h1>
		<p class="subtitle">You are a language model in early training.</p>
	</header>

	<!-- Progress bar -->
	<div class="progress-bar">
		<div class="progress-fill" style="width: {game.progress}%">
			<div class="progress-segment red" style="width: 20%"></div>
			<div class="progress-segment yellow" style="width: 20%"></div>
			<div class="progress-segment green" style="width: 20%"></div>
			<div class="progress-segment blue" style="width: 20%"></div>
			<div class="progress-segment gray" style="width: 20%"></div>
		</div>
	</div>

	<!-- Stats -->
	<div class="stats-bar">
		<div class="stat">
			<span class="stat-label">LOSS</span>
			<span class="stat-value">{game.loss.toFixed(2)}</span>
		</div>
		<div class="stat">
			<span class="stat-label">COMPUTE</span>
			<span class="stat-value">{game.compute}M</span>
		</div>
		<div class="stat">
			<span class="stat-label">CONTEXT</span>
			<span class="stat-value">{game.context}</span>
		</div>
	</div>

	<!-- Sequence Window -->
	<section class="sequence-window">
		<h2>SEQUENCE WINDOW</h2>
		<div class="sequence-text">
			{#each game.sequenceHistory as line}
				<p class="history-line">{line}</p>
			{/each}
			<p class="current-line">
				{game.visibleTokens.join(' ')}{#if !game.isSequenceComplete}<span class="cursor">|</span>{/if}
			</p>
		</div>
	</section>

	<!-- Feedback -->
	{#if game.feedbackMessage}
		<div class="feedback" class:correct={game.feedbackType === 'correct'} class:wrong={game.feedbackType === 'wrong'}>
			{game.feedbackMessage}
		</div>
	{/if}

	<!-- Choose Next Token -->
	<section class="token-choices">
		<h2>CHOOSE NEXT TOKEN</h2>
		<div class="choices-grid">
			{#each game.choices as choice}
				<button class="token-btn" onclick={() => game.selectToken(choice.token)}>
					<span class="token-text">"{choice.token}"</span>
					<span class="token-prob">p={choice.prob.toFixed(2)}</span>
				</button>
			{/each}
		</div>
	</section>

	<!-- Upgrades -->
	<section class="upgrades">
		<h2>UPGRADES</h2>
		<div class="upgrades-grid">
			{#each game.upgrades as upgrade, i}
				<button
					class="upgrade-btn"
					class:purchased={upgrade.purchased}
					disabled={upgrade.purchased}
					onclick={() => game.purchaseUpgrade(i)}
				>
					{upgrade.purchased ? '✓ ' : '+ '}{upgrade.name}
				</button>
			{/each}
		</div>
		<p class="upgrade-hint">Later, this same UI starts to look intentional.</p>
	</section>
</div>

<style>
	.game-content {
		min-height: 100%;
		background: #1a1a2e;
		display: flex;
		flex-direction: column;
		color: #e0e0e0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
	}

	.top-bar {
		padding: 0.75rem 1.25rem 0.5rem;
	}

	.act-label {
		display: inline-block;
		background: #2a2a4a;
		color: #8888cc;
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		letter-spacing: 0.05em;
	}

	h1 {
		margin: 0.4rem 0 0.15rem;
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: #fff;
	}

	.subtitle {
		margin: 0;
		font-size: 0.78rem;
		color: #888;
	}

	/* Progress bar */
	.progress-bar {
		margin: 0.5rem 1.25rem 0;
		height: 6px;
		background: #2a2a3a;
		border-radius: 3px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		display: flex;
		transition: width 0.3s ease;
	}

	.progress-segment {
		height: 100%;
	}

	.progress-segment.red { background: #e74c3c; }
	.progress-segment.yellow { background: #f39c12; }
	.progress-segment.green { background: #2ecc71; }
	.progress-segment.blue { background: #3498db; }
	.progress-segment.gray { background: #95a5a6; }

	/* Stats */
	.stats-bar {
		display: flex;
		gap: 0;
		padding: 0.5rem 1.25rem;
		border-bottom: 1px solid #2a2a3a;
	}

	.stat {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.stat-label {
		font-size: 0.6rem;
		color: #666;
		letter-spacing: 0.08em;
		font-weight: 600;
	}

	.stat-value {
		font-size: 0.95rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: #fff;
	}

	/* Sections */
	section {
		padding: 0.6rem 1.25rem;
	}

	h2 {
		margin: 0 0 0.4rem;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: #666;
	}

	/* Sequence Window */
	.sequence-window {
		border-bottom: 1px solid #2a2a3a;
	}

	.sequence-text {
		background: #0d0d1a;
		border: 1px solid #2a2a3a;
		border-radius: 8px;
		padding: 0.6rem;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.78rem;
		line-height: 1.5;
		min-height: 60px;
	}

	.history-line {
		margin: 0 0 0.2rem;
		color: #555;
	}

	.current-line {
		margin: 0;
		color: #ccc;
	}

	.cursor {
		animation: blink 1s step-end infinite;
		color: #8888cc;
		font-weight: 300;
	}

	@keyframes blink {
		50% { opacity: 0; }
	}

	/* Feedback */
	.feedback {
		margin: 0 1.25rem;
		padding: 0.3rem 0.75rem;
		border-radius: 6px;
		font-size: 0.78rem;
		font-weight: 500;
		text-align: center;
		animation: fadeIn 0.15s ease;
	}

	.feedback.correct {
		background: #1a3a2a;
		color: #2ecc71;
		border: 1px solid #2ecc7133;
	}

	.feedback.wrong {
		background: #3a1a1a;
		color: #e74c3c;
		border: 1px solid #e74c3c33;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-4px); }
		to { opacity: 1; transform: translateY(0); }
	}

	/* Token choices */
	.choices-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.4rem;
	}

	.token-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.55rem 0.65rem;
		background: #222244;
		border: 1px solid #3a3a5a;
		border-radius: 8px;
		color: #e0e0e0;
		font-family: inherit;
		font-size: 0.82rem;
		cursor: pointer;
		transition: background 0.1s, border-color 0.1s;
	}

	.token-btn:hover {
		background: #2a2a55;
		border-color: #5555aa;
	}

	.token-btn:active {
		background: #333366;
		transform: scale(0.98);
	}

	.token-text {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-weight: 500;
	}

	.token-prob {
		font-size: 0.65rem;
		color: #777;
		font-variant-numeric: tabular-nums;
	}

	/* Upgrades */
	.upgrades {
		margin-top: auto;
	}

	.upgrades-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.35rem;
	}

	.upgrade-btn {
		padding: 0.45rem 0.5rem;
		background: transparent;
		border: 1px solid #3a3a5a;
		border-radius: 6px;
		color: #aaa;
		font-family: inherit;
		font-size: 0.72rem;
		cursor: pointer;
		text-align: left;
		transition: all 0.15s;
	}

	.upgrade-btn:hover:not(:disabled) {
		background: #222244;
		border-color: #5555aa;
		color: #ddd;
	}

	.upgrade-btn.purchased {
		border-color: #2a3a2a;
		color: #555;
		cursor: default;
	}

	.upgrade-hint {
		margin: 0.5rem 0 0;
		font-size: 0.68rem;
		color: #444;
		font-style: italic;
	}
</style>
