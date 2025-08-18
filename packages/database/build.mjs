import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['seed.ts'],
  bundle: true,
  platform: 'node',
  external: ['better-sqlite3'],
  outfile: 'dist/index.cjs'
});
