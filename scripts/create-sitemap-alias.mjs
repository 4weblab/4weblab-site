import { copyFile } from 'node:fs/promises';

// Astro generates a sitemap index. Publish the conventional sitemap.xml name
// as an identical alias, so crawlers can discover the complete index directly.
await copyFile('dist/sitemap-index.xml', 'dist/sitemap.xml');
