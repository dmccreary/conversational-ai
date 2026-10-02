// Full-Text Search Capabilities MicroSim
// CANVAS_HEIGHT: 757
// A small but real full-text search engine running in the browser.
// The query is matched against a five-document corpus. Case folding, Porter
// stemming, phrase matching, proximity search and wildcards can be switched
// on and off, and precision, recall and F1 are recalculated against a fixed
// set of relevant documents. Every match, highlight and metric is computed.

// ---- canvas layout -------------------------------------------------------
let canvasWidth = 800;            // reset from the container width
let drawHeight = 642;             // drawing region
let controlHeight = 115;          // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 10;
let defaultTextSize = 16;
let sliderLeftMargin = 290;

let cardTop = 78;                 // y of the first document card
let cardHeight = 86;
let cardGap = 6;

// ---- the corpus ------------------------------------------------------------
const INFORMATION_NEED = 'How do I back up a database?';
const RELEVANT = [1, 2, 4];       // documents that answer the information need

const corpus = [
  { id: 1, title: 'Database Backup Procedures',
    body: 'Regular database backups are critical. Schedule a full database backup every night and test each backup before you rely on it.' },
  { id: 2, title: 'Backing Up Your Data',
    body: 'Learn how to back up databases effectively. Backing up a database to a second disk protects your data from hardware failure.' },
  { id: 3, title: 'Critical System Maintenance',
    body: 'Database systems require regular backing procedures. Maintenance windows cover patching, index rebuilds, and checking that the nightly backup job finished.' },
  { id: 4, title: 'PostgreSQL Administration Guide',
    body: 'postgresql databases need backup plans. Use pg_dump to export all databases, then copy the dump files to another server.' },
  { id: 5, title: 'Data Recovery Methods',
    body: 'Restoring backed-up database content starts with locating the newest backup. Verify the restored database before reopening it to users.' }
];

const CUSTOM_QUERY = '(your own query)';
const EXAMPLE_QUERIES = ['database backup', 'Database Backup', 'databases backups',
  'datab* back*', 'back up database', 'postgresql backup'];

const TYPE_COLORS = { exact: 'lightskyblue', stemmed: 'lightgreen', wildcard: 'orange' };
const TYPE_STROKES = { exact: 'steelblue', stemmed: 'seagreen', wildcard: 'darkorange' };

// ---- state -----------------------------------------------------------------
let results = [];                 // one search result per document
let queryTerms = [];
let metrics = null;
let lastChange = '';

// controls
let queryInput, exampleSelect;
let caseCheckbox, stemCheckbox, phraseCheckbox, wildcardCheckbox, proximityCheckbox;
let distanceSlider;

// ==========================================================================
// Porter stemmer (Porter, 1980)
// ==========================================================================
function isConsonant(w, i) {
  const ch = w[i];
  if ('aeiou'.includes(ch)) return false;
  if (ch === 'y') return i === 0 ? true : !isConsonant(w, i - 1);
  return true;
}

// The "measure" m of a stem: the number of vowel-consonant sequences
function measure(stem) {
  let m = 0;
  let i = 0;
  const n = stem.length;
  while (i < n && isConsonant(stem, i)) i++;
  while (i < n) {
    while (i < n && !isConsonant(stem, i)) i++;
    if (i >= n) break;
    m++;
    while (i < n && isConsonant(stem, i)) i++;
  }
  return m;
}

function hasVowel(stem) {
  for (let i = 0; i < stem.length; i++) {
    if (!isConsonant(stem, i)) return true;
  }
  return false;
}

function endsDoubleConsonant(w) {
  const n = w.length;
  return n >= 2 && w[n - 1] === w[n - 2] && isConsonant(w, n - 1);
}

function endsCVC(w) {
  const n = w.length;
  if (n < 3) return false;
  return isConsonant(w, n - 3) && !isConsonant(w, n - 2) && isConsonant(w, n - 1) &&
    !'wxy'.includes(w[n - 1]);
}

const PORTER_STEP2 = [['ational', 'ate'], ['tional', 'tion'], ['enci', 'ence'],
  ['anci', 'ance'], ['izer', 'ize'], ['bli', 'ble'], ['alli', 'al'],
  ['entli', 'ent'], ['eli', 'e'], ['ousli', 'ous'], ['ization', 'ize'],
  ['ation', 'ate'], ['ator', 'ate'], ['alism', 'al'], ['iveness', 'ive'],
  ['fulness', 'ful'], ['ousness', 'ous'], ['aliti', 'al'], ['iviti', 'ive'],
  ['biliti', 'ble'], ['logi', 'log']];
const PORTER_STEP3 = [['icate', 'ic'], ['ative', ''], ['alize', 'al'],
  ['iciti', 'ic'], ['ical', 'ic'], ['ful', ''], ['ness', '']];
const PORTER_STEP4 = ['al', 'ance', 'ence', 'er', 'ic', 'able', 'ible', 'ant',
  'ement', 'ment', 'ent', 'ion', 'ou', 'ism', 'ate', 'iti', 'ous', 'ive', 'ize'];

function porterStem(word) {
  let w = word.toLowerCase();
  if (w.length <= 2) return w;

  // Step 1a: plurals
  if (w.endsWith('sses')) w = w.slice(0, -2);
  else if (w.endsWith('ies')) w = w.slice(0, -2);
  else if (w.endsWith('ss')) { /* keep */ }
  else if (w.endsWith('s')) w = w.slice(0, -1);

  // Step 1b: -eed, -ed, -ing
  let cleanup = false;
  if (w.endsWith('eed')) {
    if (measure(w.slice(0, -3)) > 0) w = w.slice(0, -1);
  } else if (w.endsWith('ed') && hasVowel(w.slice(0, -2))) {
    w = w.slice(0, -2);
    cleanup = true;
  } else if (w.endsWith('ing') && hasVowel(w.slice(0, -3))) {
    w = w.slice(0, -3);
    cleanup = true;
  }
  if (cleanup) {
    if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) w += 'e';
    else if (endsDoubleConsonant(w) && !'lsz'.includes(w[w.length - 1])) w = w.slice(0, -1);
    else if (measure(w) === 1 && endsCVC(w)) w += 'e';
  }

  // Step 1c: terminal y -> i
  if (w.endsWith('y') && hasVowel(w.slice(0, -1))) w = w.slice(0, -1) + 'i';

  // Step 2 and Step 3: map double suffixes to single ones
  for (const table of [PORTER_STEP2, PORTER_STEP3]) {
    for (const [suffix, replacement] of table) {
      if (w.endsWith(suffix)) {
        const stem = w.slice(0, -suffix.length);
        if (measure(stem) > 0) w = stem + replacement;
        break;
      }
    }
  }

  // Step 4: remove remaining suffixes when the stem is long enough
  for (const suffix of PORTER_STEP4) {
    if (w.endsWith(suffix)) {
      const stem = w.slice(0, -suffix.length);
      if (measure(stem) > 1) {
        if (suffix !== 'ion' || stem.endsWith('s') || stem.endsWith('t')) w = stem;
      }
      break;
    }
  }

  // Step 5a: remove a final e
  if (w.endsWith('e')) {
    const stem = w.slice(0, -1);
    const m = measure(stem);
    if (m > 1 || (m === 1 && !endsCVC(stem))) w = stem;
  }
  // Step 5b: -ll -> -l
  if (measure(w) > 1 && endsDoubleConsonant(w) && w.endsWith('l')) w = w.slice(0, -1);

  return w;
}

// ==========================================================================
// Indexing: split every document into word tokens with positions
// ==========================================================================

// Break text into alternating word and separator segments. Words get a token
// index so matches can be highlighted exactly where they occur.
function segmentText(text, tokens) {
  const segments = [];
  const pattern = /[A-Za-z0-9_]+|[^A-Za-z0-9_]+/g;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const isWord = /[A-Za-z0-9_]/.test(match[0][0]);
    if (isWord) {
      tokens.push(match[0]);
      segments.push({ text: match[0], isWord: true, tokenIndex: tokens.length - 1 });
    } else {
      segments.push({ text: match[0], isWord: false, afterToken: tokens.length - 1 });
    }
  }
  return segments;
}

function indexCorpus() {
  for (const doc of corpus) {
    doc.tokens = [];                         // title and body share one position stream
    doc.titleSegments = segmentText(doc.title, doc.tokens);
    doc.bodySegments = segmentText(doc.body, doc.tokens);
    doc.relevant = RELEVANT.includes(doc.id);
  }
}

// ==========================================================================
// Searching
// ==========================================================================

function parseQuery(queryText) {
  const words = queryText.match(/[A-Za-z0-9_*?]+/g) || [];
  return words.map(function (raw) {
    return { raw: raw, hasWildcard: /[*?]/.test(raw), literal: raw.replace(/[*?]/g, '') };
  });
}

// With case-sensitive search, a stemmed match still needs matching case in
// the letters the two words share.
function sharedLettersSameCase(a, b) {
  const la = a.toLowerCase();
  const lb = b.toLowerCase();
  let n = 0;
  while (n < la.length && n < lb.length && la[n] === lb[n]) n++;
  return a.slice(0, n) === b.slice(0, n);
}

// Does one document token match one query term? Returns the match type.
function matchToken(tokenText, term, opts) {
  if (term.hasWildcard && opts.wildcard) {
    const pattern = '^' + term.raw.replace(/\*/g, '[A-Za-z0-9_]*').replace(/\?/g, '[A-Za-z0-9_]') + '$';
    return new RegExp(pattern, opts.caseInsensitive ? 'i' : '').test(tokenText) ? 'wildcard' : null;
  }
  const termText = term.hasWildcard ? term.literal : term.raw;
  if (!termText) return null;
  const a = opts.caseInsensitive ? tokenText.toLowerCase() : tokenText;
  const b = opts.caseInsensitive ? termText.toLowerCase() : termText;
  if (a === b) return 'exact';
  if (opts.stemming && porterStem(a) === porterStem(b) &&
      (opts.caseInsensitive || sharedLettersSameCase(tokenText, termText))) {
    return 'stemmed';
  }
  return null;
}

// Phrase: the terms must appear next to each other, in order
function findPhraseWindows(termPositions) {
  const windows = [];
  const n = termPositions.length;
  for (const start of termPositions[0]) {
    let ok = true;
    for (let k = 1; k < n; k++) {
      if (!termPositions[k].includes(start + k)) { ok = false; break; }
    }
    if (ok) windows.push([start, start + n - 1]);
  }
  return windows;
}

// Proximity: find the tightest spans of text that contain every term
function findProximityWindows(termPositions, maxDistance) {
  const events = [];
  termPositions.forEach(function (positions, k) {
    for (const pos of positions) events.push({ pos: pos, term: k });
  });
  events.sort((e1, e2) => e1.pos - e2.pos);

  const counts = termPositions.map(() => 0);
  let covered = 0;
  let left = 0;
  let minSpan = Infinity;
  const candidates = [];
  for (let right = 0; right < events.length; right++) {
    if (counts[events[right].term]++ === 0) covered++;
    while (covered === termPositions.length) {
      const span = events[right].pos - events[left].pos;
      if (span < minSpan) minSpan = span;
      candidates.push([events[left].pos, events[right].pos]);
      if (--counts[events[left].term] === 0) covered--;
      left++;
    }
  }
  // highlight only the tightest spans, and only if they are close enough
  const windows = (minSpan <= maxDistance) ? candidates.filter(w => w[1] - w[0] === minSpan) : [];
  return { windows: windows, minSpan: minSpan };
}

function searchDocument(doc, terms, opts) {
  const hits = doc.tokens.map(() => null);
  const termPositions = terms.map(() => []);
  const termCounts = terms.map(() => ({ exact: 0, stemmed: 0, wildcard: 0, examples: [] }));
  const rank = { exact: 3, wildcard: 2, stemmed: 1 };

  doc.tokens.forEach(function (tokenText, ti) {
    terms.forEach(function (term, k) {
      const type = matchToken(tokenText, term, opts);
      if (!type) return;
      termPositions[k].push(ti);
      termCounts[k][type]++;
      if (type !== 'exact' && !termCounts[k].examples.includes(tokenText) && termCounts[k].examples.length < 2) {
        termCounts[k].examples.push(tokenText);
      }
      if (!hits[ti] || rank[type] > rank[hits[ti].type]) hits[ti] = { type: type, term: k };
    });
  });

  const missing = terms.filter((term, k) => termPositions[k].length === 0);
  let matched = terms.length > 0 && missing.length === 0;   // AND: every term must be found
  let windows = [];
  let minSpan = null;
  let failure = null;

  if (matched && terms.length > 1) {
    if (opts.phrase) {
      windows = findPhraseWindows(termPositions);
      if (windows.length === 0) { matched = false; failure = 'phrase'; }
    } else if (opts.proximity) {
      const found = findProximityWindows(termPositions, opts.distance);
      windows = found.windows;
      minSpan = found.minSpan;
      if (windows.length === 0) { matched = false; failure = 'proximity'; }
    }
  }

  const score = hits.filter(h => h !== null).length;   // total matching words
  const result = { doc: doc, matched: matched, hits: hits, termCounts: termCounts,
    missing: missing, windows: windows, minSpan: minSpan, failure: failure, score: score };
  result.reason = explainResult(result, terms, opts);
  return result;
}

function explainResult(res, terms, opts) {
  if (terms.length === 0) return 'Type a query to search.';
  if (res.missing.length > 0) {
    const names = res.missing.map(function (term) {
      return term.hasWildcard && !opts.wildcard ? '"' + term.literal + '" (wildcards are off)' : '"' + term.raw + '"';
    });
    return 'No match: nothing matches ' + names.join(' or ');
  }
  if (res.failure === 'phrase') return 'No match: every word is found, but not side by side as a phrase';
  if (res.failure === 'proximity') {
    return 'No match: every word is found, but the closest are ' + res.minSpan + ' words apart (limit ' + opts.distance + ')';
  }
  const parts = terms.map(function (term, k) {
    const c = res.termCounts[k];
    const bits = [];
    if (c.exact) bits.push(c.exact + ' exact');
    if (c.stemmed) bits.push(c.stemmed + ' stemmed (' + c.examples.join(', ') + ')');
    if (c.wildcard) bits.push(c.wildcard + ' wildcard (' + c.examples.join(', ') + ')');
    return term.raw + ': ' + bits.join(' + ');
  });
  let text = 'Matched ' + parts.join(' | ');
  if (terms.length > 1 && opts.phrase) text += ' | phrase found';
  else if (terms.length > 1 && opts.proximity) text += ' | ' + res.minSpan + (res.minSpan === 1 ? ' word apart' : ' words apart');
  return text;
}

function currentOptions() {
  return {
    caseInsensitive: caseCheckbox.checked(),
    stemming: stemCheckbox.checked(),
    phrase: phraseCheckbox.checked(),
    wildcard: wildcardCheckbox.checked(),
    proximity: proximityCheckbox.checked(),
    distance: distanceSlider.value()
  };
}

function computeMetrics() {
  const retrieved = results.filter(r => r.matched).map(r => r.doc.id);
  const truePositives = retrieved.filter(id => RELEVANT.includes(id)).length;
  const precision = retrieved.length > 0 ? truePositives / retrieved.length : null;
  const recall = truePositives / RELEVANT.length;
  let f1 = null;
  if (precision !== null) f1 = (precision + recall > 0) ? 2 * precision * recall / (precision + recall) : 0;
  return { retrieved: retrieved, truePositives: truePositives, precision: precision, recall: recall, f1: f1 };
}

function formatMetric(value) {
  return value === null ? 'n/a' : value.toFixed(2);
}

// Run the query against every document; describe what changed
function runSearch(changeLabel) {
  const before = metrics;
  const opts = currentOptions();
  queryTerms = parseQuery(queryInput.value());
  results = corpus.map(doc => searchDocument(doc, queryTerms, opts));
  metrics = computeMetrics();

  if (changeLabel && before) {
    lastChange = changeLabel + ': documents retrieved ' + before.retrieved.length + ' → ' + metrics.retrieved.length +
      ', precision ' + formatMetric(before.precision) + ' → ' + formatMetric(metrics.precision) +
      ', recall ' + formatMetric(before.recall) + ' → ' + formatMetric(metrics.recall) + '.';
    if (opts.phrase && opts.proximity) lastChange += ' Phrase matching is stricter, so it overrides proximity.';
  }
}

// ==========================================================================
// p5.js setup and draw
// ==========================================================================

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  indexCorpus();

  // Row 1: query input and example queries
  queryInput = createInput('database backup');
  queryInput.parent(mainElement);
  queryInput.attribute('aria-label', 'Search query');
  queryInput.input(() => {
    exampleSelect.selected(CUSTOM_QUERY);
    runSearch('Query changed');
  });

  exampleSelect = createSelect();
  exampleSelect.parent(mainElement);
  exampleSelect.attribute('aria-label', 'Example queries');
  exampleSelect.option(CUSTOM_QUERY);
  for (const example of EXAMPLE_QUERIES) exampleSelect.option(example);
  exampleSelect.selected(EXAMPLE_QUERIES[0]);
  exampleSelect.changed(() => {
    if (exampleSelect.value() === CUSTOM_QUERY) return;
    queryInput.value(exampleSelect.value());
    runSearch('Query changed');
  });

  // Row 2: feature checkboxes
  caseCheckbox = createCheckbox(' Case-insensitive', true);
  stemCheckbox = createCheckbox(' Stemming', false);
  phraseCheckbox = createCheckbox(' Phrase', false);
  wildcardCheckbox = createCheckbox(' Wildcards (* ?)', false);
  // Row 3: proximity search with a distance slider
  proximityCheckbox = createCheckbox(' Proximity', false);
  distanceSlider = createSlider(1, 10, 3, 1);

  const toggles = [[caseCheckbox, 'Case-insensitive'], [stemCheckbox, 'Stemming'],
    [phraseCheckbox, 'Phrase matching'], [wildcardCheckbox, 'Wildcards'],
    [proximityCheckbox, 'Proximity search']];
  for (const [checkbox, label] of toggles) {
    checkbox.parent(mainElement);
    checkbox.changed(() => runSearch(label + (checkbox.checked() ? ' ON' : ' OFF')));
  }
  distanceSlider.parent(mainElement);
  distanceSlider.attribute('aria-label', 'Proximity distance in words');
  distanceSlider.input(() => runSearch('Distance set to ' + distanceSlider.value()));

  positionControls();
  runSearch(null);

  describe('Full-text search demo. Five document cards show which words match the ' +
    'query, highlighted by match type: exact, stemmed, wildcard, or inside a phrase ' +
    'or proximity window. Bars show precision, recall and F1 against three relevant ' +
    'documents. Checkboxes switch each search feature on and off.', LABEL);
}

function positionControls() {
  const inputW = constrain(canvasWidth * 0.36, 150, 280);
  queryInput.position(64, drawHeight + 9);
  queryInput.size(inputW);
  exampleSelect.position(64 + inputW + 96, drawHeight + 10);

  caseCheckbox.position(10, drawHeight + 46);
  stemCheckbox.position(168, drawHeight + 46);
  phraseCheckbox.position(275, drawHeight + 46);
  wildcardCheckbox.position(362, drawHeight + 46);

  proximityCheckbox.position(10, drawHeight + 81);
  distanceSlider.position(sliderLeftMargin, drawHeight + 82);
  distanceSlider.size(canvasWidth - sliderLeftMargin - 25);
}

function bodyTextSize() {
  if (canvasWidth >= 760) return 15;
  if (canvasWidth >= 600) return 14;
  if (canvasWidth >= 520) return 13;
  return 12;
}

function draw() {
  updateCanvasSize();

  // drawing region and control region backgrounds
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // title
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(22);
  text('Full-Text Search Capabilities', canvasWidth / 2, 8);

  drawHeaderLines();
  for (let i = 0; i < results.length; i++) {
    drawCard(results[i], margin, cardTop + i * (cardHeight + cardGap), canvasWidth - 2 * margin, cardHeight);
  }
  drawMetrics();
  drawControlLabels();
}

function drawStar(cx, cy, r) {
  fill('gold');
  stroke('goldenrod');
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < 10; i++) {
    const angle = -HALF_PI + i * PI / 5;
    const radius = (i % 2 === 0) ? r : r * 0.45;
    vertex(cx + cos(angle) * radius, cy + sin(angle) * radius);
  }
  endShape(CLOSE);
  noStroke();
}

// information need and highlight legend
function drawHeaderLines() {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textSize(14);
  textAlign(LEFT, CENTER);
  const need = 'Information need: "' + INFORMATION_NEED + '"';
  text(need, margin, 44);
  let x = margin + textWidth(need) + 22;
  drawStar(x, 43, 8);
  fill('black');
  text('= relevant (' + RELEVANT.length + ' of ' + corpus.length + ' docs)', x + 13, 44);

  // legend
  const items = [['lightskyblue', 'exact'], ['lightgreen', 'stemmed'], ['orange', 'wildcard'],
    ['yellow', 'phrase / proximity window']];
  x = margin;
  text('Highlights:', x, 64);
  x += textWidth('Highlights:') + 10;
  for (const [swatch, label] of items) {
    stroke('gray');
    strokeWeight(1);
    fill(swatch);
    rect(x, 57, 14, 14, 3);
    noStroke();
    fill('black');
    text(label, x + 19, 64);
    x += 19 + textWidth(label) + 16;
  }
}

function inWindow(windows, tokenIndex) {
  return windows.some(w => tokenIndex >= w[0] && tokenIndex <= w[1]);
}

function betweenWindowTokens(windows, afterToken) {
  return windows.some(w => afterToken >= w[0] && afterToken < w[1]);
}

// Draw text segment by segment so matching words can be highlighted.
// Pass 1 lays out the segments, pass 2 draws the yellow window bands,
// pass 3 draws the match chips and pass 4 draws the text on top.
function drawRichText(segments, res, x0, y0, maxW, lineH, textColor) {
  const windows = res.matched ? res.windows : [];
  const placed = [];
  let x = x0;
  let y = y0;
  for (const seg of segments) {
    let str = seg.text;
    if (!seg.isWord && x === x0) str = str.replace(/^\s+/, '');
    if (!str) continue;
    const w = textWidth(str);
    if (seg.isWord && x + w > x0 + maxW && x > x0) {
      x = x0;
      y += lineH;
    }
    placed.push({ seg: seg, str: str, x: x, y: y, w: w });
    x += w;
  }

  // yellow band behind a phrase or proximity window
  noStroke();
  fill('yellow');
  for (const p of placed) {
    const banded = p.seg.isWord ? inWindow(windows, p.seg.tokenIndex)
      : betweenWindowTokens(windows, p.seg.afterToken);
    if (banded) rect(p.x - (p.seg.isWord ? 3 : 0), p.y - 4, p.w + (p.seg.isWord ? 6 : 0), lineH + 1);
  }

  // colored chip behind each matching word
  for (const p of placed) {
    const hit = p.seg.isWord ? res.hits[p.seg.tokenIndex] : null;
    if (!hit) continue;
    if (res.matched) {
      noStroke();
      fill(TYPE_COLORS[hit.type]);
    } else {
      stroke(TYPE_STROKES[hit.type]);      // partial hit in a document that did not match
      strokeWeight(1.5);
      noFill();
    }
    rect(p.x - 2, p.y - 1, p.w + 4, lineH - 4, 3);
    strokeWeight(1);
  }

  noStroke();
  fill(textColor);
  for (const p of placed) text(p.str, p.x, p.y);
}

function drawCard(res, x, y, w, h) {
  const doc = res.doc;
  const size = bodyTextSize();

  stroke(res.matched ? 'seagreen' : 'silver');
  strokeWeight(res.matched ? 2 : 1);
  fill(res.matched ? 'white' : 'whitesmoke');
  rect(x, y, w, h, 8);
  strokeWeight(1);

  // title row: document number, relevance star, title, status
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(14);
  text('Doc ' + doc.id, x + 10, y + 8);
  if (doc.relevant) drawStar(x + 62, y + 15, 8);

  textSize(size);
  textStyle(BOLD);
  drawRichText(doc.titleSegments, res, x + 78, y + 7, w - 90, 20, res.matched ? 'black' : 'dimgray');

  let status = 'no match';
  let statusColor = 'gray';
  if (res.matched && doc.relevant) {
    status = 'MATCH · ' + res.score + ' hits · relevant';
    statusColor = 'seagreen';
  } else if (res.matched) {
    status = 'MATCH · ' + res.score + ' hits · not relevant';
    statusColor = 'chocolate';
  } else if (doc.relevant) {
    status = 'missed · relevant';
    statusColor = 'firebrick';
  }
  noStroke();
  fill(statusColor);
  textSize(13);
  textStyle(BOLD);
  textAlign(RIGHT, TOP);
  text(status, x + w - 10, y + 9);

  // body text with highlights
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  textSize(size);
  drawRichText(doc.bodySegments, res, x + 10, y + 29, w - 20, 20, res.matched ? 'black' : 'dimgray');

  // why the document did or did not match
  noStroke();
  fill(res.matched ? 'darkgreen' : 'dimgray');
  textSize(12.5);
  textStyle(ITALIC);
  text(res.reason, x + 10, y + h - 18, w - 20, 16);
  textStyle(NORMAL);
}

function drawBar(label, value, x, y, barW) {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(label, x, y + 8);
  stroke('gray');
  strokeWeight(1);
  fill('white');
  rect(x + 68, y, barW, 16, 3);
  if (value !== null && value > 0) {
    noStroke();
    fill('steelblue');
    rect(x + 68, y, barW * value, 16, 3);
  }
  noStroke();
  fill('black');
  text(formatMetric(value), x + 68 + barW + 8, y + 8);
}

// precision, recall, F1 and the trade-off notes
function drawMetrics() {
  const y = cardTop + corpus.length * (cardHeight + cardGap) + 2;
  const h = drawHeight - y - 8;
  const w = canvasWidth - 2 * margin;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(margin, y, w, h, 8);

  const barW = 90;
  drawBar('Precision', metrics.precision, margin + 10, y + 10, barW);
  drawBar('Recall', metrics.recall, margin + 10, y + 35, barW);
  drawBar('F1 score', metrics.f1, margin + 10, y + 60, barW);

  // notes
  const notesX = margin + 10 + 68 + barW + 52;
  const notesW = margin + w - notesX - 10;
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  const retrievedText = metrics.retrieved.length ? 'Doc ' + metrics.retrieved.join(', ') : 'none';
  text('Retrieved: ' + retrievedText + '   Relevant: Doc ' + RELEVANT.join(', '), notesX, y + 9, notesW, 18);
  textStyle(NORMAL);
  const tip = lastChange ||
    'A document matches when it contains every query word. Turn on Stemming, then Proximity, and watch precision and recall change.';
  text(tip, notesX, y + 29, notesW, h - 33);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Query:', 10, drawHeight + 22);
  const inputW = constrain(canvasWidth * 0.36, 150, 280);
  text('Examples:', 64 + inputW + 18, drawHeight + 22);
  const active = proximityCheckbox.checked() && !phraseCheckbox.checked();
  fill(active ? 'black' : 'gray');
  text('within ' + distanceSlider.value() + (distanceSlider.value() === 1 ? ' word' : ' words'), 135, drawHeight + 93);
}

// ---- responsive sizing ----------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
