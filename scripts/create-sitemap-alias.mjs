import { copyFile } from 'node:fs/promises';

// The site currently fits in a single generated sitemap. Publish that sitemap
// at the conventional sitemap.xml URL, while Astro keeps its own index files.
await copyFile('dist/sitemap-0.xml', 'dist/sitemap.xml');
