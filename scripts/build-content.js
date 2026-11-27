// Reads markdown from content/ and writes src/content/content.json.
// Run automatically before the build (see package.json "prebuild"/"serve").
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const OUT_FILE = path.join(ROOT, 'src', 'content', 'content.json');

function readMarkdownDir(dir) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8');
      const { data, content } = matter(raw);
      return { file: f, data, body: content };
    });
}

function formatDate(value) {
  const d = new Date(value);
  return isNaN(d.getTime()) ? '' : d.toISOString();
}

function toPost({ file, data, body }) {
  const slug = data.slug || file.replace(/\.md$/, '');
  return {
    slug,
    title: data.title || slug,
    date: formatDate(data.date),
    excerpt: data.excerpt || '',
    featured_image: data.image || '',
    tags: data.tags || [],
    content: marked.parse(body),
    draft: !!data.draft,
  };
}

function toPage({ file, data, body }) {
  const slug = data.slug || file.replace(/\.md$/, '');
  return {
    slug,
    title: data.title || slug,
    content: marked.parse(body),
  };
}

const posts = readMarkdownDir('posts')
  .map(toPost)
  .filter((p) => !p.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const pages = readMarkdownDir('pages').map(toPage);

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify({ posts, pages }, null, 2));
console.log(`content: ${posts.length} posts, ${pages.length} pages -> src/content/content.json`);
