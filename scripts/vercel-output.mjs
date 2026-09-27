/**
 * Writes a Vercel Build Output API bundle (.vercel/output) after `npm run build`:
 *   static/                     the built front end (dist/public)
 *   functions/api/index.func/   the Express API as ONE self-contained ESM file,
 *                               so no runtime module resolution can fail
 *   config.json                 routing: static files first, /api/* to the
 *                               function, everything else to index.html
 * See https://vercel.com/docs/build-output-api/v3
 */
import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

const out = '.vercel/output';
rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/static`, { recursive: true });
cpSync('dist/public', `${out}/static`, { recursive: true });

const fn = `${out}/functions/api/index.func`;
mkdirSync(fn, { recursive: true });
await build({
  entryPoints: ['server/vercel-entry.ts'],
  outfile: `${fn}/index.mjs`,
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  // Bundled CommonJS dependencies still call require() for Node built-ins.
  banner: {
    js: "import { createRequire as __cr } from 'node:module'; import { fileURLToPath as __fu } from 'node:url'; import { dirname as __dn } from 'node:path'; const require = __cr(import.meta.url); const __filename = __fu(import.meta.url); const __dirname = __dn(__filename);",
  },
  external: ['pino-pretty'], // development-only log formatter
  logLevel: 'warning',
});
writeFileSync(
  `${fn}/.vc-config.json`,
  JSON.stringify({ runtime: 'nodejs20.x', handler: 'index.mjs', launcherType: 'Nodejs', shouldAddHelpers: false, maxDuration: 30 }, null, 2),
);

writeFileSync(
  `${out}/config.json`,
  JSON.stringify(
    {
      version: 3,
      routes: [
        { src: '/assets/(.*)', headers: { 'cache-control': 'public, max-age=31536000, immutable' }, continue: true },
        { src: '/media/(.*)', headers: { 'cache-control': 'public, max-age=604800' }, continue: true },
        { handle: 'filesystem' },
        { src: '/api/(.*)', dest: '/api/index' },
        { src: '/(.*)', dest: '/index.html' },
      ],
    },
    null,
    2,
  ),
);
console.log('Vercel build output written to .vercel/output');
