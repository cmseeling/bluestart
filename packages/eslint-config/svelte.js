import storybook from 'eslint-plugin-storybook';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import { config as baseConfig } from './index.js';

export const config = ts.config(
  ...baseConfig,
  ...svelte.configs.recommended,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: { 'no-undef': 'off' }
  },
  storybook.configs['flat/recommended']
);
