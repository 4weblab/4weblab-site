// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const updatedPages = new Set([
  '/',
  '/blog/',
  '/blog/come-controllare-un-sito-web-gratis/',
  '/black-friday-2026/',
  '/perizia-sito-web/',
  '/pubblicita-su-google/',
  '/sito-web-aziendale/',
  '/sito-web-per-negozio/',
]);
const excludedPages = new Set(['/promo-elitrainer/', '/black-friday-2026/']);

// https://astro.build/config
export default defineConfig({
  site: 'https://4weblab.it',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter(page) {
      return !excludedPages.has(new URL(page).pathname);
    },
    lastmod: new Date('2026-10-12T00:00:00.000Z'),
    serialize(item) {
      if (updatedPages.has(new URL(item.url).pathname)) {
        item.lastmod = '2026-10-17T00:00:00.000Z';
      }
      return item;
    },
  })],
});
