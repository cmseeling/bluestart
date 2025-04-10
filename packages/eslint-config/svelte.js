import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import { config as baseConfig } from './index.js';

export const config = ts.config(
  ...baseConfig,
  svelte.configs['flat/recommended'],
  prettier,
  svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: { 'no-undef': 'off' }
  }
);
