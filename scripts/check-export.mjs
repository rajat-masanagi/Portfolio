import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
let pages = 0;
async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { await check(path); continue; }
    assert.ok(!/^\.env|\.(?:map|pem|key)$/.test(entry.name), `Unexpected public file: ${path}`);
    if (!entry.name.endsWith('.html')) continue;
    pages++;
    const html = await readFile(path, 'utf8');
    for (const match of html.matchAll(/\b(?:src|href)="(\/[^"\s]*)"/g)) {
      const pathname = decodeURIComponent(match[1].split(/[?#]/)[0]);
      assert.ok(pathname.startsWith(prefix+'/'), `Missing deployment prefix: ${pathname}`);
      const relative = pathname.slice(prefix.length);
      const target = join('out', relative.endsWith('/') ? relative+'index.html' : relative);
      assert.ok((await stat(target)).isFile(), `Missing local target: ${target}`);
    }
  }
}
await check('out');
await stat('out/.nojekyll');
console.log(`${pages} exported HTML files: local asset/navigation paths verified for ${prefix || '/'}.`);
