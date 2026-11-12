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
const excludedPages = new Set(['/promo-elitrainer/', '/black-friday-2026-completa/']);
const latestPages = new Set([
  '/realizzazioni/',
  '/realizzazioni/realizzazione-sito-web-personal-trainer-elisa-piovan/',
]);
const copyUpdatedPages = new Set([
  '/',
  '/perizia-sito-web/',
  '/sito-web-per-negozio/',
  '/sito-web-per-professionisti/',
  '/sito-web-aziendale/',
  '/pubblicita-su-google/',
  '/realizzazione-siti-web-padova/',
  '/blog/come-controllare-un-sito-web-gratis/',
  '/blog/aruba-supersite-conviene-davvero-limiti-e-cosa-sapere/',
  '/blog/siti-web-creati-con-intelligenza-artificiale/',
  '/blog/perche-il-tuo-sito-non-si-trova-su-google/',
]);

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
      const pathname = new URL(item.url).pathname;
      if (pathname === '/realizzazione-siti-web-padova/') {
        item.lastmod = '2026-11-12T00:00:00.000Z';
      } else if (copyUpdatedPages.has(pathname)) {
        item.lastmod = '2026-11-06T00:00:00.000Z';
      } else if (pathname === '/black-friday-2026/') {
        item.lastmod = '2026-11-01T00:00:00.000Z';
      } else if (latestPages.has(pathname)) {
        item.lastmod = '2026-10-27T00:00:00.000Z';
      } else if (updatedPages.has(pathname)) {
        item.lastmod = '2026-10-17T00:00:00.000Z';
      }
      return item;
    },
  })],
});
