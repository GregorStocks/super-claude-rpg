import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default defineConfig(
	js.configs.recommended,
	...ts.configs.strictTypeChecked,
	...ts.configs.stylisticTypeChecked,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parserOptions: {
				projectService: {
					allowDefaultProject: ['*.config.js']
				},
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.svelte']
			}
		},
		rules: {
			// --- Pedantic TypeScript rules ---
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' }
			],
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/no-unnecessary-condition': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/strict-boolean-expressions': [
				'error',
				{
					allowString: false,
					allowNumber: false,
					allowNullableObject: false,
					allowNullableBoolean: false,
					allowNullableString: false,
					allowNullableNumber: false,
					allowAny: false
				}
			],
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': 'error',
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/no-unnecessary-type-parameters': 'error',
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-call': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			'@typescript-eslint/method-signature-style': ['error', 'property'],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					leadingUnderscore: 'allow'
				},
				{
					selector: 'function',
					format: ['camelCase', 'PascalCase']
				},
				{
					selector: 'typeLike',
					format: ['PascalCase']
				},
				{
					selector: 'enumMember',
					format: ['PascalCase', 'UPPER_CASE']
				}
			],
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true,
					allowDirectConstAssertionInArrowFunctions: true
				}
			],
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/prefer-as-const': 'error',
			'@typescript-eslint/prefer-for-of': 'error',
			'@typescript-eslint/prefer-includes': 'error',
			'@typescript-eslint/prefer-string-starts-ends-with': 'error',
			'@typescript-eslint/unified-signatures': 'error',
			'@typescript-eslint/no-confusing-void-expression': 'error',
			'@typescript-eslint/no-meaningless-void-operator': 'error',
			'@typescript-eslint/no-mixed-enums': 'error',
			'@typescript-eslint/no-redundant-type-constituents': 'error',
			'@typescript-eslint/no-useless-empty-export': 'error',
			'@typescript-eslint/prefer-reduce-type-parameter': 'error',
			'@typescript-eslint/prefer-return-this-type': 'error',
			'@typescript-eslint/promise-function-async': 'error',

			// --- Pedantic base ESLint rules ---
			'no-console': 'error',
			'no-debugger': 'error',
			'no-alert': 'error',
			'no-var': 'error',
			'prefer-const': 'error',
			'prefer-template': 'error',
			'no-eval': 'error',
			'no-implied-eval': 'off', // handled by @typescript-eslint
			'no-new-wrappers': 'error',
			'no-throw-literal': 'off', // handled by @typescript-eslint
			'no-self-compare': 'error',
			'no-template-curly-in-string': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable-loop': 'error',
			'no-unused-private-class-members': 'error',
			'no-use-before-define': 'off', // handled by @typescript-eslint
			'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
			curly: ['error', 'all'],
			eqeqeq: ['error', 'always'],
			'no-else-return': ['error', { allowElseIf: false }],
			'no-lonely-if': 'error',
			'no-nested-ternary': 'error',
			'no-unneeded-ternary': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-destructuring': ['error', { object: true, array: false }],
			'object-shorthand': 'error',
			'no-useless-rename': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-return': 'error',
			'prefer-object-spread': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'symbol-description': 'error',
			'no-param-reassign': 'error',
			'no-shadow': 'off', // handled by @typescript-eslint
			'@typescript-eslint/no-shadow': 'error',
			'no-sequences': 'error',
			'no-constructor-return': 'error',
			'no-duplicate-imports': 'error',
			'no-promise-executor-return': 'error',
			radix: 'error',
			'require-atomic-updates': 'error',
			'grouped-accessor-pairs': ['error', 'getBeforeSet'],
			'guard-for-in': 'error',
			'no-caller': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-label': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-multi-str': 'error',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-object-constructor': 'error',
			'no-octal-escape': 'error',
			'no-proto': 'error',
			'no-return-assign': ['error', 'always'],
			'no-script-url': 'error',
			'no-undef-init': 'error',
			'no-useless-call': 'error',
			'operator-assignment': ['error', 'always'],
			'prefer-exponentiation-operator': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-object-has-own': 'error',
			'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
			yoda: 'error'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			// Svelte $props() requires `let` for reactive destructuring
			'prefer-const': 'off',
			// Svelte reactive state types can't be fully resolved by typescript-eslint
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/restrict-plus-operands': 'off',
			// Svelte onclick handlers return values
			'@typescript-eslint/no-confusing-void-expression': 'off',
			// Svelte $effect() references reactive vars as expression statements
			'@typescript-eslint/no-unused-expressions': 'off',
			// Svelte event handlers commonly do inline assignment
			'no-return-assign': 'off',
			// With strict-boolean-expressions off, explicit === true is used for clarity
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off'
		}
	},
	{
		files: ['*.config.js', '*.config.ts', 'svelte.config.js'],
		rules: {
			// Config files are JS without full type info
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off'
		}
	},
	{
		ignores: [
			'.svelte-kit/',
			'build/',
			'node_modules/',
			'.wrangler/',
			'.output/',
			'vite.config.ts.timestamp-*'
		]
	}
);
