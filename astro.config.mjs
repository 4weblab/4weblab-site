// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://4weblab.it',
  integrations: [sitemap({ lastmod: new Date('2026-10-12T00:00:00.000Z') })],
});
