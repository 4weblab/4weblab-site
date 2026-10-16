// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const updatedPages = new Set([
  '/',
  '/blog/',
  '/blog/come-controllare-un-sito-web-gratis/',
  '/perizia-sito-web/',
  '/pubblicita-su-google/',
  '/sito-web-aziendale/',
  '/sito-web-per-negozio/',
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://4weblab.it',
  integrations: [sitemap({
    lastmod: new Date('2026-10-12T00:00:00.000Z'),
    serialize(item) {
      if (updatedPages.has(new URL(item.url).pathname)) {
        item.lastmod = '2026-10-16T00:00:00.000Z';
      }
      return item;
    },
  })],
});
