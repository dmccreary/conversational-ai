// Inverted Index Structure MicroSim
// CANVAS_HEIGHT: 642
// Builds a real inverted index in the browser from three short documents.
// Nothing is hard-coded: the tokens, normalized terms, dictionary and postings
// lists (document IDs, term frequency and positions) are computed from the
// document text every time an option changes.
// Step through the indexing pipeline: 1. Tokenize, 2. Normalize, 3. Build index.

// ---- canvas layout -------------------------------------------------------
let canvasWidth = 800;            // reset from the container width
let drawHeight = 562;             // drawing region
let controlHeight = 80;           // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 10;
let defaultTextSize = 16;

// column geometry, recalculated in computeLayout()
let leftX, leftW, midX, midW, rightX, rightW;
let topY = 66;                    // top of the three columns
let cardHeight = 132;             // height of a document card
let cardGap = 10;

// ---- the sample corpus (from the chapter specification) ------------------
const documents = [
  { id: 1, text: 'Database backup procedures are critical' },
  { id: 2, text: 'Backup your database regularly' },
  { id: 3, text: 'Critical system database maintenance' }
];

// A small stop word list: very common words that carry little meaning
const STOP_WORDS = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
  'from', 'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'this', 'to',
  'was', 'were', 'will', 'with', 'you', 'your'];

const STAGE_NAMES = ['Tokenize', 'Normalize', 'Build index'];

// ---- state ---------------------------------------------------------------
let stage = 3;                    // 1 = tokenize, 2 = normalize, 3 = build index
let selectedTerm = 'database';
let removeStopWords = true;
let stemMode = 'plural';          // 'none', 'plural' or 'porter'

let analyzed = [];                // per document: list of analyzed tokens
let index = {};                   // term -> array of postings
let dictionary = [];              // sorted list of terms

// controls
let prevButton, nextButton, stopCheckbox, stemSelect;

// clickable regions, rebuilt on every frame
let termHitBoxes = [];
let stageHitBoxes = [];

// ==========================================================================
// Text analysis: these functions do the real indexing work
// ==========================================================================

// Split text into word tokens and record each token's position (0, 1, 2 ...)
function tokenize(text) {
  const tokens = [];
  const wordPattern = /[A-Za-z0-9]+/g;
  let match;
  let position = 0;
  while ((match = wordPattern.exec(text)) !== null) {
    tokens.push({ raw: match[0], position: position });
    position++;
  }
  return tokens;
}

// Plural stemmer (the "S stemmer"): only removes plural endings
function pluralStem(word) {
  if (word.length <= 3) return word;
  if (word.endsWith('ies') && !word.endsWith('eies') && !word.endsWith('aies')) {
    return word.slice(0, -3) + 'y';
  }
  if (word.endsWith('es') && !word.endsWith('aes') && !word.endsWith('ees') && !word.endsWith('oes')) {
    return word.slice(0, -1);
  }
  if (word.endsWith('s') && !word.endsWith('us') && !word.endsWith('ss')) {
    return word.slice(0, -1);
  }
  return word;
}

// ---- Porter stemmer (Porter, 1980) ---------------------------------------
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

// consonant-vowel-consonant ending where the last consonant is not w, x or y
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

function applyStemming(word) {
  if (stemMode === 'plural') return pluralStem(word);
  if (stemMode === 'porter') return porterStem(word);
  return word;
}

// Run the whole pipeline: tokenize -> normalize -> build the inverted index
function buildIndex() {
  // Steps 1 and 2: analyze every document
  analyzed = documents.map(function (doc) {
    const tokens = tokenize(doc.text).map(function (tok) {
      const lower = tok.raw.toLowerCase();
      const dropped = removeStopWords && STOP_WORDS.includes(lower);
      const term = dropped ? null : applyStemming(lower);
      return {
        raw: tok.raw,
        position: tok.position,
        lower: lower,
        dropped: dropped,
        term: term,
        stemChanged: !dropped && term !== lower
      };
    });
    return { id: doc.id, tokens: tokens };
  });

  // Step 3: invert document -> terms into term -> postings
  index = {};
  for (const doc of analyzed) {
    for (const tok of doc.tokens) {
      if (tok.dropped) continue;
      if (!index[tok.term]) index[tok.term] = [];
      let posting = index[tok.term].find(p => p.doc === doc.id);
      if (!posting) {
        posting = { doc: doc.id, tf: 0, positions: [] };
        index[tok.term].push(posting);
      }
      posting.tf++;
      posting.positions.push(tok.position);
    }
  }
  dictionary = Object.keys(index).sort();

  // keep a valid selection after the vocabulary changes
  if (!index[selectedTerm]) {
    const fallback = dictionary.find(t => t.startsWith('databas'));
    selectedTerm = fallback || dictionary[0];
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

  // Row 1: step-through buttons
  prevButton = createButton('Previous step');
  prevButton.parent(mainElement);
  prevButton.position(10, drawHeight + 10);
  prevButton.mousePressed(() => setStage(stage - 1));

  nextButton = createButton('Next step');
  nextButton.parent(mainElement);
  nextButton.position(125, drawHeight + 10);
  nextButton.mousePressed(() => setStage(stage + 1));

  // Row 2: normalization options
  stopCheckbox = createCheckbox(' Remove stop words', removeStopWords);
  stopCheckbox.parent(mainElement);
  stopCheckbox.position(10, drawHeight + 47);
  stopCheckbox.changed(() => {
    removeStopWords = stopCheckbox.checked();
    buildIndex();
  });

  stemSelect = createSelect();
  stemSelect.parent(mainElement);
  stemSelect.position(276, drawHeight + 46);
  stemSelect.option('None', 'none');
  stemSelect.option('Plurals only', 'plural');
  stemSelect.option('Porter stemmer', 'porter');
  stemSelect.selected('plural');
  stemSelect.changed(() => {
    stemMode = stemSelect.value();
    buildIndex();
  });

  buildIndex();
  setStage(stage);

  describe('Diagram of an inverted index. Three source documents on the left flow ' +
    'through a three step indexing pipeline (tokenize, normalize, build index) ' +
    'into a sorted dictionary of terms on the right. Each term points to a ' +
    'postings list of document IDs with term frequency and positions.', LABEL);
}

function setStage(newStage) {
  stage = constrain(newStage, 1, 3);
  if (stage === 1) prevButton.attribute('disabled', '');
  else prevButton.removeAttribute('disabled');
  if (stage === 3) nextButton.attribute('disabled', '');
  else nextButton.removeAttribute('disabled');
}

function computeLayout() {
  const gap = 26;
  leftX = margin;
  leftW = max(170, canvasWidth * 0.29);
  midW = max(112, canvasWidth * 0.15);
  midX = leftX + leftW + gap;
  rightX = midX + midW + gap;
  rightW = canvasWidth - rightX - margin;
}

function draw() {
  updateCanvasSize();
  computeLayout();

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
  text('Inverted Index Structure', canvasWidth / 2, 8);

  drawDocuments();
  drawPipeline();
  if (stage === 3) drawIndexView();
  else drawForwardView();
  drawExplanation();
  drawControlLabels();
  updateCursor();
}

function columnHeader(label, x, w) {
  noStroke();
  fill('black');
  textStyle(BOLD);
  textSize(15);
  textAlign(CENTER, TOP);
  text(label, x + w / 2, 42);
  textStyle(NORMAL);
}

function drawArrow(x1, y1, x2, y2, arrowColor) {
  stroke(arrowColor);
  strokeWeight(3);
  line(x1, y1, x2, y2);
  const angle = atan2(y2 - y1, x2 - x1);
  const size = 8;
  noStroke();
  fill(arrowColor);
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -size, -size / 2 - 1, -size, size / 2 + 1);
  pop();
  strokeWeight(1);
}

// ---- left column: the source documents ------------------------------------
function drawDocuments() {
  columnHeader('Source Documents', leftX, leftW);
  for (let i = 0; i < documents.length; i++) {
    const y = topY + i * (cardHeight + cardGap);
    stroke('steelblue');
    strokeWeight(1);
    fill('lightblue');
    rect(leftX, y, leftW, cardHeight, 8);

    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(15);
    text('Doc ' + documents[i].id, leftX + 10, y + 8);
    textStyle(NORMAL);
    textSize(16);

    // draw the document word by word so matching words can be highlighted
    let x = leftX + 10;
    let lineY = y + 36;
    const spaceW = textWidth(' ');
    for (const tok of analyzed[i].tokens) {
      const w = textWidth(tok.raw);
      if (x + w > leftX + leftW - 10 && x > leftX + 10) {
        x = leftX + 10;
        lineY += 28;
      }
      if (stage === 3 && tok.term === selectedTerm) {
        fill('gold');
        rect(x - 3, lineY - 4, w + 6, 25, 4);
      }
      noStroke();
      fill('black');
      text(tok.raw, x, lineY);
      x += w + spaceW;
    }
  }
}

// ---- middle column: the indexing pipeline ---------------------------------
function stageDetail(stageNumber) {
  if (stageNumber === 1) return 'split text into tokens and number their positions';
  if (stageNumber === 2) {
    const stemLabel = { none: 'no stemming', plural: 'stem plurals', porter: 'Porter stemming' }[stemMode];
    return 'lowercase\n' + (removeStopWords ? 'drop stop words' : 'keep stop words') + '\n' + stemLabel;
  }
  return 'map each term to its postings list';
}

function drawPipeline() {
  columnHeader('Indexing Pipeline', midX, midW);
  const boxH = 100;
  const gapY = 36;
  const startY = topY + 22;
  stageHitBoxes = [];

  for (let i = 0; i < 3; i++) {
    const y = startY + i * (boxH + gapY);
    const active = (stage === i + 1);
    stroke('darkorange');
    strokeWeight(active ? 3 : 1);
    fill(active ? 'orange' : 'moccasin');
    rect(midX, y, midW, boxH, 8);
    strokeWeight(1);

    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(15);
    text((i + 1) + '. ' + STAGE_NAMES[i], midX + midW / 2, y + 8);
    textStyle(NORMAL);
    textSize(13);
    text(stageDetail(i + 1), midX + 5, y + 32, midW - 10, boxH - 34);

    stageHitBoxes.push({ stage: i + 1, x: midX, y: y, w: midW, h: boxH });
    if (i < 2) {
      drawArrow(midX + midW / 2, y + boxH + 5, midX + midW / 2, y + boxH + gapY - 5, 'darkorange');
    }
  }

  // documents flow into step 1; the active step's output flows to the right
  const inY = startY + boxH / 2;
  const outY = startY + (stage - 1) * (boxH + gapY) + boxH / 2;
  drawArrow(leftX + leftW + 4, inY, midX - 4, inY, 'darkorange');
  drawArrow(midX + midW + 4, outY, rightX - 4, outY, 'darkorange');
}

// ---- right column, steps 1 and 2: document -> terms ----------------------
function drawForwardView() {
  columnHeader(stage === 1 ? 'Tokens with Positions' : 'Normalized Terms', rightX, rightW);
  for (let i = 0; i < analyzed.length; i++) {
    const y = topY + i * (cardHeight + cardGap);
    stroke('silver');
    strokeWeight(1);
    fill('white');
    rect(rightX, y, rightW, cardHeight, 8);

    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(15);
    text('Doc ' + analyzed[i].id, rightX + 10, y + 8);
    textStyle(NORMAL);

    let x = rightX + 10;
    let chipY = y + 32;
    for (const tok of analyzed[i].tokens) {
      const label = stage === 1 ? tok.raw : (tok.dropped ? tok.lower : tok.term);
      textSize(14);
      const w = textWidth(label) + 12;
      if (x + w > rightX + rightW - 8 && x > rightX + 10) {
        x = rightX + 10;
        chipY += 46;
      }
      const isDropped = stage === 2 && tok.dropped;
      const isStemmed = stage === 2 && tok.stemChanged;
      if (isDropped) {
        stroke('silver');
        fill('whitesmoke');
      } else if (isStemmed) {
        stroke('darkorange');
        strokeWeight(2);
        fill('lemonchiffon');
      } else {
        stroke('steelblue');
        fill('aliceblue');
      }
      rect(x, chipY, w, 24, 5);
      strokeWeight(1);

      noStroke();
      fill(isDropped ? 'gray' : 'black');
      textAlign(LEFT, CENTER);
      text(label, x + 6, chipY + 12);
      if (isDropped) {
        stroke('gray');
        line(x + 4, chipY + 12, x + w - 4, chipY + 12);
        noStroke();
      }
      // token position under the chip
      fill('dimgray');
      textSize(12);
      textAlign(CENTER, TOP);
      text(tok.position, x + w / 2, chipY + 27);
      x += w + 6;
    }
  }
}

// ---- right column, step 3: the inverted index -----------------------------
function drawIndexView() {
  columnHeader('Inverted Index', rightX, rightW);
  termHitBoxes = [];
  const rowH = 26;
  const headerH = 30;
  const arrowGap = 30;

  textSize(15);
  textStyle(NORMAL);
  let termColW = textWidth('Dictionary') + 6;
  for (const term of dictionary) termColW = max(termColW, textWidth(term));
  termColW += 22;
  const boxH = headerH + dictionary.length * rowH + 6;
  const postX = rightX + termColW + arrowGap;
  const postW = rightW - termColW - arrowGap;

  // dictionary (green) and postings (yellow) containers
  stroke('seagreen');
  strokeWeight(1);
  fill('honeydew');
  rect(rightX, topY, termColW, boxH, 8);
  stroke('goldenrod');
  fill('lightyellow');
  rect(postX, topY, postW, boxH, 8);

  noStroke();
  fill('black');
  textStyle(BOLD);
  textSize(13);
  textAlign(LEFT, TOP);
  text('Dictionary', rightX + 10, topY + 9);
  text(postW > 170 ? 'Postings lists (doc IDs)' : 'Postings', postX + 10, topY + 9);
  textStyle(NORMAL);

  for (let r = 0; r < dictionary.length; r++) {
    const term = dictionary[r];
    const y = topY + headerH + r * rowH;
    const selected = (term === selectedTerm);
    const hovered = mouseX >= rightX && mouseX <= rightX + rightW && mouseY >= y && mouseY < y + rowH;

    if (selected || hovered) {
      noStroke();
      fill(selected ? 'gold' : 'khaki');
      rect(rightX + 3, y, termColW - 6, rowH - 2, 4);
      rect(postX + 3, y, postW - 6, rowH - 2, 4);
    }

    noStroke();
    fill('black');
    textSize(15);
    textAlign(LEFT, CENTER);
    textStyle(selected ? BOLD : NORMAL);
    text(term, rightX + 10, y + rowH / 2 - 1);
    textStyle(NORMAL);

    drawArrow(rightX + termColW + 4, y + rowH / 2 - 1, postX - 4, y + rowH / 2 - 1, 'seagreen');

    // one chip per document in the postings list
    let chipX = postX + 10;
    for (const posting of index[term]) {
      stroke('goldenrod');
      strokeWeight(1);
      fill('khaki');
      rect(chipX, y + 2, 26, rowH - 6, 4);
      noStroke();
      fill('black');
      textSize(14);
      textAlign(CENTER, CENTER);
      text(posting.doc, chipX + 13, y + rowH / 2 - 1);
      chipX += 32;
    }
    termHitBoxes.push({ term: term, x: rightX, y: y, w: rightW, h: rowH });
  }

  // expanded postings list for the selected term
  const postings = index[selectedTerm] || [];
  const detailY = topY + boxH + 12;
  const detailH = 36 + postings.length * 24 + 6;
  stroke('goldenrod');
  strokeWeight(2);
  fill('lemonchiffon');
  rect(rightX, detailY, rightW, detailH, 8);
  strokeWeight(1);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(15);
  text('Postings list for "' + selectedTerm + '"', rightX + 10, detailY + 9);
  textStyle(NORMAL);
  textSize(14);
  for (let k = 0; k < postings.length; k++) {
    const p = postings[k];
    const row = 'Doc ' + p.doc + ':  frequency = ' + p.tf + ',  positions = [' + p.positions.join(', ') + ']';
    text(row, rightX + 10, detailY + 36 + k * 24);
  }
}

// ---- explanation strip at the bottom of the drawing region ---------------
function explanationText() {
  if (stage === 1) {
    let total = 0;
    for (const doc of analyzed) total += doc.tokens.length;
    return 'Step 1 - Tokenize: each document is split into word tokens, and every token ' +
      'is numbered with its position in the document (0, 1, 2, ...). ' + total +
      ' tokens were found in ' + documents.length + ' documents.';
  }
  if (stage === 2) {
    const dropped = [];
    const stemmed = [];
    for (const doc of analyzed) {
      for (const tok of doc.tokens) {
        if (tok.dropped && !dropped.includes(tok.lower)) dropped.push(tok.lower);
        const change = tok.lower + ' → ' + tok.term;
        if (tok.stemChanged && !stemmed.includes(change)) stemmed.push(change);
      }
    }
    let msg = 'Step 2 - Normalize: every token is lowercased.';
    if (removeStopWords) msg += ' Stop words dropped: ' + (dropped.length ? dropped.join(', ') : 'none') + '.';
    if (stemMode !== 'none') msg += ' Stemming: ' + (stemmed.length ? stemmed.join(', ') : 'no changes') + '.';
    msg += ' Positions are kept so phrase search still works.';
    return msg;
  }
  return 'Step 3 - Build index: the document → terms lists are inverted into a sorted ' +
    'dictionary (vocabulary) of ' + dictionary.length + ' terms. Each term points to a ' +
    'postings list of the documents that contain it. Click a term to see its frequency and positions.';
}

function drawExplanation() {
  const y = 490;
  const h = 64;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(margin, y, canvasWidth - 2 * margin, h, 8);
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textSize(14);
  textAlign(LEFT, TOP);
  text(explanationText(), margin + 10, y + 7, canvasWidth - 2 * margin - 20, h - 8);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Step ' + stage + ' of 3: ' + STAGE_NAMES[stage - 1], 222, drawHeight + 22);
  text('Stemming:', 190, drawHeight + 58);
}

// ---- mouse interaction ----------------------------------------------------
function isInside(box) {
  return mouseX >= box.x && mouseX <= box.x + box.w && mouseY >= box.y && mouseY <= box.y + box.h;
}

function updateCursor() {
  let overClickable = stageHitBoxes.some(isInside);
  if (stage === 3 && termHitBoxes.some(isInside)) overClickable = true;
  cursor(overClickable ? HAND : ARROW);
}

function mousePressed() {
  for (const box of stageHitBoxes) {
    if (isInside(box)) {
      setStage(box.stage);
      return;
    }
  }
  if (stage === 3) {
    for (const box of termHitBoxes) {
      if (isInside(box)) {
        selectedTerm = box.term;
        return;
      }
    }
  }
}

// ---- responsive sizing ----------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
