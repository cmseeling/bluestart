import { config as baseConfig } from '@bluestart/eslint-config';
import ts from 'typescript-eslint';

export const config = ts.config(...baseConfig, {
  ignores: ['**/dist/**']
});
