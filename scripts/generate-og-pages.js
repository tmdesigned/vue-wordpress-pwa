// Writes a static dist/post/<slug>/index.html for each published post, with
// per-post Open Graph / Twitter meta tags. Crawlers do not run JavaScript, so
// these tags must exist in the initial HTML. Run after `vue-cli-service build`.
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://tmdesigned.com';
const DIST = path.join(__dirname, '..', 'dist');
const CONTENT = require(path.join(__dirname, '..', 'src', 'content', 'content.json'));

const DEFAULT_TITLE = 'tmdesigned';
const DEFAULT_DESCRIPTION =
  'Join Taylor Morgan, software engineer, in an exploration of the techniques and technologies powering the modern web.';
const DEFAULT_IMAGE = `${SITE_URL}/img/icons/android-chrome-512x512.png`;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Strip HTML tags and collapse whitespace so excerpts are plain text.
function plainText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function absoluteUrl(maybePath) {
  if (!maybePath) return DEFAULT_IMAGE;
  if (/^https?:\/\//.test(maybePath)) return maybePath;
  return SITE_URL + (maybePath.startsWith('/') ? '' : '/') + maybePath;
}

function metaTags({ title, description, image, url }) {
  return [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="${escapeAttr(DEFAULT_TITLE)}">`,
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:image" content="${escapeAttr(image)}">`,
    `<meta property="og:url" content="${escapeAttr(url)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`,
    `<meta name="twitter:image" content="${escapeAttr(image)}">`,
  ].join('\n    ');
}

// Replace the default <title>, description, and og/twitter tags in the built shell.
function applyMeta(html, meta) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/i, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
    .replace('</head>', `    ${meta}\n  </head>`);
}

const shellPath = path.join(DIST, 'index.html');
if (!fs.existsSync(shellPath)) {
  throw new Error('dist/index.html not found. Run the build before generating post pages.');
}
const shell = fs.readFileSync(shellPath, 'utf8');

let written = 0;
for (const post of CONTENT.posts) {
  const description = plainText(post.excerpt) || DEFAULT_DESCRIPTION;
  const meta = metaTags({
    title: `${post.title} | ${DEFAULT_TITLE}`,
    description,
    image: absoluteUrl(post.featured_image),
    url: `${SITE_URL}/post/${post.slug}`,
  });

  const outDir = path.join(DIST, 'post', post.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), applyMeta(shell, meta));
  written++;
}

console.log(`og: wrote ${written} post pages with per-post meta tags`);
