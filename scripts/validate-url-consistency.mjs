import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const distRoot = join(projectRoot, 'dist');
const siteOrigin = 'https://4weblab.it';
const errors = [];
let checkedInternalLinks = 0;
let checkedStructuredUrls = 0;
let checkedSitemapUrls = 0;
const canonicalUrls = new Set();
const sitemapUrls = new Set();

const isSiteUrl = (value) => typeof value === 'string' && value.startsWith(`${siteOrigin}/`);
const isAssetPath = (pathname) => /\.[a-z0-9]{2,8}$/i.test(pathname);
const pathIsCanonical = (pathname) => pathname === '/' || pathname.endsWith('/');

function checkSiteUrl(value, context) {
  if (!isSiteUrl(value)) return;
  const url = new URL(value);
  checkedStructuredUrls += 1;
  if (!pathIsCanonical(url.pathname) && !isAssetPath(url.pathname)) {
    errors.push(`${context}: URL interna senza slash finale: ${value}`);
  }
}

function walkJson(value, context) {
  if (typeof value === 'string') {
    checkSiteUrl(value, context);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkJson(item, `${context}[${index}]`));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => walkJson(item, `${context}.${key}`));
  }
}

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listHtmlFiles(path));
    else if (entry.isFile() && extname(entry.name) === '.html') files.push(path);
  }
  return files;
}

function resolveDistPath(pathname) {
  if (pathname === '/') return join(distRoot, 'index.html');
  if (pathname.endsWith('/')) return join(distRoot, pathname.slice(1), 'index.html');
  return join(distRoot, pathname.slice(1));
}

async function checkInternalLink(value, context) {
  if (!value || value.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(value)) return;
  let url;
  try {
    url = new URL(value, siteOrigin);
  } catch {
    return;
  }
  if (url.origin !== siteOrigin) return;
  checkedInternalLinks += 1;
  if (!pathIsCanonical(url.pathname) && !isAssetPath(url.pathname)) {
    errors.push(`${context}: link interno senza slash finale: ${value}`);
  }
  if (!isAssetPath(url.pathname) && !['/robots.txt', '/sitemap.xml', '/sitemap-index.xml', '/llms.txt'].includes(url.pathname)) {
    const target = resolveDistPath(url.pathname);
    try {
      await readFile(target);
    } catch {
      errors.push(`${context}: link interno non raggiungibile nel build: ${value}`);
    }
  }
}

const htmlFiles = await listHtmlFiles(distRoot);
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativeFile = relative(projectRoot, file);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (canonical) {
    checkSiteUrl(canonical, `${relativeFile} canonical`);
    if (!/content="noindex/i.test(html)) canonicalUrls.add(canonical);
  }
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    await checkInternalLink(match[1], `${relativeFile} href`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      walkJson(JSON.parse(match[1]), `${relativeFile} JSON-LD`);
    } catch {
      errors.push(`${relativeFile}: JSON-LD non parsabile`);
    }
  }
}

for (const sitemapName of ['sitemap.xml', 'sitemap-0.xml']) {
  const sitemapPath = join(distRoot, sitemapName);
  const sitemap = await readFile(sitemapPath, 'utf8');
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const value = match[1].trim();
    checkedSitemapUrls += 1;
    const url = new URL(value);
    if (sitemapName === 'sitemap.xml') sitemapUrls.add(value);
    if (url.origin === siteOrigin && !pathIsCanonical(url.pathname)) {
      errors.push(`${sitemapName}: URL senza slash finale: ${value}`);
    }
  }
}

const redirects = await readFile(join(projectRoot, 'public', '_redirects'), 'utf8');
const redirectSources = new Set();
for (const [index, line] of redirects.split(/\r?\n/).entries()) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [, target] = trimmed.match(/^\S+\s+(\S+)/) ?? [];
  const source = trimmed.match(/^(\S+)\s+/)?.[1];
  if (source && source.startsWith('/') && !source.includes('*') && source !== '/' && !source.endsWith('/')) redirectSources.add(source);
  if (target?.startsWith('/') && target !== '/' && !target.endsWith('/') && !isAssetPath(target)) {
    errors.push(`public/_redirects:${index + 1}: destinazione senza slash finale: ${target}`);
  }
}

for (const sitemapUrl of sitemapUrls) {
  const url = new URL(sitemapUrl);
  if (url.origin !== siteOrigin || url.pathname === '/') continue;
  const noSlash = url.pathname.slice(0, -1);
  if (!redirectSources.has(noSlash)) {
    errors.push(`public/_redirects: manca il 301 canonico da ${noSlash} a ${url.pathname}`);
  }
}

for (const canonicalUrl of canonicalUrls) {
  if (!sitemapUrls.has(canonicalUrl)) errors.push(`Sitemap: manca l'URL canonico ${canonicalUrl}`);
}
for (const sitemapUrl of sitemapUrls) {
  if (!canonicalUrls.has(sitemapUrl)) errors.push(`Canonical: manca l'URL presente in sitemap ${sitemapUrl}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`URL consistency check passed: ${checkedInternalLinks} internal links, ${checkedStructuredUrls} JSON-LD URLs, ${checkedSitemapUrls} sitemap URLs.`);
