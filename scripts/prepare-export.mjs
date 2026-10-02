import { writeFile } from 'node:fs/promises';
await writeFile('out/.nojekyll', '');
await writeFile('out/site-config.json', JSON.stringify({ basePath: process.env.NEXT_PUBLIC_BASE_PATH || '' }));
console.log('Static export prepared for GitHub Pages and local preview.');
