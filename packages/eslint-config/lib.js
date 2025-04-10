import prettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import ts from 'typescript-eslint';
import { config as baseConfig } from './index.js';

export const config = ts.config(
  ...baseConfig,
  prettier,
  {
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn'
    }
  },
  {
    ignores: ['dist/**']
  }
);
