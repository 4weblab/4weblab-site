import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

export const prerender = true;

// Netlify sets CONTEXT at build time. Preview URLs must remain out of search
// engines, while the production build keeps the public sitemap available.
const isNonProductionDeploy =
  ['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT ?? '') ||
  process.env.SITE_IS_PREVIEW === 'true';

export const GET: APIRoute = () =>
  new Response(isNonProductionDeploy
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });

