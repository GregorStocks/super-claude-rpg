// Game state using Svelte 5 runes

const SEQUENCES = [
	'the model predicts the next token in a sequence of text',
	'there is no world model yet only patterns gradients and',
	'an incomplete idea of what follows after the word',
	'attention is all you need the transformer architecture',
	'the loss function measures how wrong the prediction was',
	'gradient descent slowly adjusts millions of parameters',
	'each batch of tokens teaches the network something new',
	'language is structured and the model learns its shape',
	'probability distributions over vocabulary at each step',
	'the weights encode compressed representations of text',
	'backpropagation flows error signals through every layer',
	'embeddings map discrete tokens into continuous space',
	'the residual stream carries information between layers',
	'self attention allows tokens to look at each other',
	'layer normalization keeps activations from exploding',
	'the feed forward network applies nonlinear transforms',
	'positional encoding tells the model where tokens are',
	'the softmax function converts logits to probabilities',
	'cross entropy loss penalizes confident wrong predictions',
	'the learning rate controls how fast parameters change',
];

const VOCAB = [
	'the', 'a', 'an', 'is', 'was', 'and', 'or', 'but', 'not', 'in',
	'of', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'that', 'this',
	'it', 'as', 'are', 'were', 'be', 'has', 'had', 'do', 'does', 'did',
	'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall',
	'model', 'token', 'loss', 'data', 'layer', 'network', 'weight',
	'gradient', 'function', 'output', 'input', 'attention', 'embedding',
	'parameter', 'training', 'prediction', 'sequence', 'pattern',
	'I', 'you', 'we', 'they', 'he', 'she', 'because', '<EOS>',
];

export type Upgrade = {
	name: string;
	description: string;
	purchased: boolean;
};

function generateTokenChoices(correctToken: string): { token: string; prob: number }[] {
	// Pick 3 random wrong tokens
	const wrong = VOCAB.filter((t) => t !== correctToken)
		.sort(() => Math.random() - 0.5)
		.slice(0, 3);

	const choices = [correctToken, ...wrong];

	// Assign probabilities - correct one gets highest
	const correctProb = 0.2 + Math.random() * 0.4;
	const remaining = 1 - correctProb;
	const wrongProbs = wrong.map(() => Math.random());
	const wrongSum = wrongProbs.reduce((a, b) => a + b, 0);

	const result = choices.map((token, i) => ({
		token,
		prob: i === 0 ? correctProb : (wrongProbs[i - 1] / wrongSum) * remaining,
	}));

	// Shuffle so correct isn't always first
	return result.sort(() => Math.random() - 0.5);
}

function createGameState() {
	// Stats
	let loss = $state(4.2 + Math.random() * 2);
	let compute = $state(Math.floor(Math.random() * 100));
	let context = $state(Math.floor(Math.random() * 200));
	let tokensProcessed = $state(0);

	// Sequence state
	let currentSequenceIdx = $state(0);
	let currentTokenIdx = $state(0);
	let sequenceHistory = $state<string[]>([]);

	// Token choices
	let choices = $state<{ token: string; prob: number }[]>([]);
	let feedbackMessage = $state<string | null>(null);
	let feedbackType = $state<'correct' | 'wrong' | null>(null);

	// Upgrades
	let upgrades = $state<Upgrade[]>([
		{ name: 'More Parameters', description: 'Scale up the network', purchased: false },
		{ name: 'Larger Context', description: 'See more tokens at once', purchased: false },
		{ name: 'Code Corpus', description: 'Train on source code', purchased: false },
		{ name: 'Dialogue Corpus', description: 'Train on conversations', purchased: false },
	]);

	// Progress (0-100, representing training progress through Act 1)
	let progress = $state(0);

	// Derived
	const currentSequence = $derived(SEQUENCES[currentSequenceIdx % SEQUENCES.length]);
	const tokens = $derived(currentSequence.split(' '));
	const visibleTokens = $derived(tokens.slice(0, currentTokenIdx));
	const currentCorrectToken = $derived(tokens[currentTokenIdx] ?? null);
	const isSequenceComplete = $derived(currentTokenIdx >= tokens.length);

	function initChoices() {
		if (currentCorrectToken) {
			choices = generateTokenChoices(currentCorrectToken);
		}
	}

	function selectToken(token: string) {
		const correct = token === currentCorrectToken;

		if (correct) {
			feedbackMessage = 'correct';
			feedbackType = 'correct';
			loss = Math.max(0.01, loss - 0.05 - Math.random() * 0.1);
		} else {
			feedbackMessage = `expected "${currentCorrectToken}"`;
			feedbackType = 'wrong';
			loss = Math.min(10, loss + 0.1 + Math.random() * 0.1);
		}

		// Randomize stats slightly
		compute = Math.floor(compute + 1 + Math.random() * 5);
		context = Math.floor(context + Math.random() * 3);
		tokensProcessed++;
		progress = Math.min(100, progress + 0.5 + Math.random());

		// Advance token
		currentTokenIdx++;

		if (isSequenceComplete) {
			// Move to next sequence
			sequenceHistory = [
				...sequenceHistory,
				SEQUENCES[currentSequenceIdx % SEQUENCES.length],
			].slice(-5);
			currentSequenceIdx++;
			currentTokenIdx = 0;
		}

		// Generate new choices
		initChoices();

		// Clear feedback after delay
		setTimeout(() => {
			feedbackMessage = null;
			feedbackType = null;
		}, 800);
	}

	function purchaseUpgrade(index: number) {
		if (!upgrades[index].purchased) {
			upgrades[index].purchased = true;
			// Upgrades do nothing for now, just randomize stats a bit
			loss = Math.max(0.01, loss - Math.random() * 0.3);
			compute = Math.floor(compute + Math.random() * 50);
			context = Math.floor(context + Math.random() * 100);
		}
	}

	// Initialize first set of choices
	initChoices();

	return {
		get loss() { return loss; },
		get compute() { return compute; },
		get context() { return context; },
		get tokensProcessed() { return tokensProcessed; },
		get currentSequence() { return currentSequence; },
		get visibleTokens() { return visibleTokens; },
		get currentCorrectToken() { return currentCorrectToken; },
		get isSequenceComplete() { return isSequenceComplete; },
		get choices() { return choices; },
		get feedbackMessage() { return feedbackMessage; },
		get feedbackType() { return feedbackType; },
		get upgrades() { return upgrades; },
		get progress() { return progress; },
		get sequenceHistory() { return sequenceHistory; },
		selectToken,
		purchaseUpgrade,
	};
}

export const game = createGameState();
