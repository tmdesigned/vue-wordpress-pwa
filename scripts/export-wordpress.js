// One-time export of published WordPress posts and pages to content/ (Markdown)
// and their media to public/img/uploads/. Reads from a MySQL dump loaded into a
// database, and copies files from a local wp-content/uploads folder.
//
// Usage:
//   node scripts/export-wordpress.js --db-port 3307 --db-password import \
//     --uploads "C:\Users\taylo\Documents\tmdesigned\wp\wp-content\uploads"

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');

const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const PAGES_DIR = path.join(ROOT, 'content', 'pages');
const MEDIA_DIR = path.join(ROOT, 'public', 'img', 'uploads');

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const DB = {
  host: '127.0.0.1',
  port: Number(args['db-port'] || 3306),
  user: 'root',
  password: args['db-password'] || '',
  database: 'bitnami_wordpress',
  charset: 'utf8mb4',
};
const UPLOADS = args.uploads;
const SITE_HOSTS = ['127.0.0.1/wordpress', 'www.tmdesigned.com', 'tmdesigned.com'];

if (!UPLOADS || !fs.existsSync(UPLOADS)) {
  throw new Error(`--uploads must point at wp-content/uploads (got: ${UPLOADS})`);
}

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
turndown.use(gfm);

// Copies a file from uploads into public/img/uploads, preserving its year/month path.
// Returns the web path, or null if the source file is missing.
function copyMedia(relPath) {
  const src = path.join(UPLOADS, relPath);
  if (!fs.existsSync(src)) return null;
  const dest = path.join(MEDIA_DIR, relPath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return '/img/uploads/' + relPath.split(path.sep).join('/');
}

// Rewrites WordPress upload URLs in HTML to local /img/uploads paths and copies the files.
function rewriteMedia(html, stats) {
  const pattern = new RegExp(
    `(?:https?:)?//(?:${SITE_HOSTS.map((h) => h.replace(/\./g, '\\.')).join('|')})(?:/wordpress|/wp)?/wp-content/uploads/([^"'\\s)>]+)`,
    'g'
  );
  return html.replace(pattern, (match, rel) => {
    const decoded = decodeURI(rel);
    const web = copyMedia(decoded);
    if (web) {
      stats.copied++;
      return web;
    }
    stats.missing.add(decoded);
    return match;
  });
}

function frontmatter(obj) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const v of value) lines.push(`  - ${JSON.stringify(v)}`);
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

// WordPress stores an excerpt or first paragraph; strip tags for the plain excerpt.
function plainExcerpt(text) {
  return String(text || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240);
}

async function main() {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.mkdirSync(PAGES_DIR, { recursive: true });
  fs.mkdirSync(MEDIA_DIR, { recursive: true });

  const conn = await mysql.createConnection(DB);
  const stats = { copied: 0, missing: new Set() };

  const [rows] = await conn.query(`
    SELECT p.ID, p.post_type, p.post_name, p.post_title, p.post_date,
           p.post_excerpt, p.post_content,
           (SELECT GROUP_CONCAT(t.name SEPARATOR '\u0001') FROM wp_term_relationships tr
              JOIN wp_term_taxonomy tt ON tt.term_taxonomy_id = tr.term_taxonomy_id AND tt.taxonomy='post_tag'
              JOIN wp_terms t ON t.term_id = tt.term_id
             WHERE tr.object_id = p.ID) AS tags,
           (SELECT pm.meta_value FROM wp_postmeta pm
             WHERE pm.post_id = p.ID AND pm.meta_key = '_thumbnail_id' LIMIT 1) AS thumb_id
      FROM wp_posts p
     WHERE p.post_type IN ('post','page') AND p.post_status = 'publish'
     ORDER BY p.post_date DESC`);

  // Map attachment IDs to their uploaded file path, for featured images.
  const [attach] = await conn.query(`
    SELECT post_id, meta_value AS file FROM wp_postmeta WHERE meta_key = '_wp_attached_file'`);
  const fileById = new Map(attach.map((a) => [String(a.post_id), a.file]));

  let posts = 0, pages = 0;
  for (const row of rows) {
    const isPage = row.post_type === 'page';
    const slug = row.post_name || `post-${row.ID}`;
    const body = rewriteMedia(row.post_content || '', stats);
    const markdown = turndown.turndown(body).trim();

    const thumbFile = row.thumb_id ? fileById.get(String(row.thumb_id)) : null;
    const image = thumbFile ? copyMedia(thumbFile) : null;
    if (thumbFile && !image) stats.missing.add(thumbFile);

    const date = new Date(row.post_date);
    const meta = isPage
      ? { title: row.post_title, slug }
      : {
          title: row.post_title,
          slug,
          date: isNaN(date) ? undefined : date.toISOString().slice(0, 10),
          excerpt: plainExcerpt(row.post_excerpt || markdown),
          image: image || undefined,
          tags: row.tags ? row.tags.split('\u0001') : [],
          draft: false,
        };

    const dir = isPage ? PAGES_DIR : POSTS_DIR;
    fs.writeFileSync(path.join(dir, `${slug}.md`), frontmatter(meta) + markdown + '\n');
    isPage ? pages++ : posts++;
  }

  await conn.end();
  console.log(`exported ${posts} posts, ${pages} pages`);
  console.log(`media: ${stats.copied} copied, ${stats.missing.size} missing from uploads`);
  if (stats.missing.size) {
    const sample = [...stats.missing].slice(0, 10);
    console.log('missing (first 10):\n  ' + sample.join('\n  '));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


