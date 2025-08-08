import { config } from '@bluestart/eslint-config/svelte';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default [
	...config,
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
];
