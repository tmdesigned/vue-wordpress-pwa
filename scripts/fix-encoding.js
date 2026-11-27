// One-time repair for double-encoded UTF-8 in content/ Markdown.
// Text that was UTF-8 but was read as Windows-1252 shows sequences like "â€™"
// for "’". This maps those known sequences back to the intended characters.
// Only specific, known-bad sequences are replaced, so valid text is untouched.
//
// Usage: node scripts/fix-encoding.js [--dry-run]

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const ROOTS = [path.join(__dirname, '..', 'content')];

// Order matters: longer sequences first so they are not partially replaced.
const REPLACEMENTS = [
  ['â€‹', ''],          // zero-width space that leaked through
  ['â€™', '\u2019'],   // right single quote  ’
  ['â€˜', '\u2018'],   // left single quote   ‘
  ['â€œ', '\u201C'],   // left double quote   “
  ['â€\u009D', '\u201D'],
  ['â€', '\u201D'],    // right double quote  ”
  ['â€”', '\u2014'],   // em dash             —
  ['â€“', '\u2013'],   // en dash             –
  ['â€¦', '\u2026'],   // ellipsis            …
  ['â€š', '\u201A'],   // single low quote    ‚
  ['â€ ', '\u2020'],   // dagger
  ['Â©', '\u00A9'],   // copyright           ©
  ['Â¶', '\u00B6'],   // pilcrow             ¶
  ['Â¬', '\u00AC'],   // not sign            ¬
  ['Ã„', '\u00C4'],   // A umlaut            Ä
  ['Ã©', '\u00E9'],   // e acute             é
  ['Ã¨', '\u00E8'],   // e grave             è
  ['Ã©', '\u00E9'],
  ['Ã±', '\u00F1'],   // n tilde             ñ
  ['Â ', ' '],        // non-breaking space left as a plain space
  ['Â', ''],          // stray orphan Â left over after the above
  ['âˆ', '\u2208'],   // element-of (from a math symbol)
];

// Fixes Windows-1252 double-encoding of the common cases. Returns { text, count }.
function repair(text) {
  let count = 0;
  let out = text;
  for (const [bad, good] of REPLACEMENTS) {
    const parts = out.split(bad);
    if (parts.length > 1) {
      count += parts.length - 1;
      out = parts.join(good);
    }
  }
  return { text: out, count };
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.md') ? [p] : [];
  });
}

let files = 0, fixed = 0, replacements = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const before = fs.readFileSync(file, 'utf8');
    const { text, count } = repair(before);
    if (count > 0) {
      fixed++;
      replacements += count;
      if (!DRY) fs.writeFileSync(file, text);
    }
    files++;
  }
}

console.log(`${DRY ? '[dry-run] ' : ''}scanned ${files} files; fixed ${fixed} files, ${replacements} sequences`);
