import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('../../.gitignore', import.meta.url));

export const config = ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended
);
