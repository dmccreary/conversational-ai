// RAG MicroSim
// CANVAS_HEIGHT: 740
// An interactive Retrieval-Augmented Generation simulator. Students enter a
// question, pick a document corpus, and run the three RAG steps - Retrieval,
// Augmentation, Generation - watching documents get retrieved (with relevance
// scores), the augmented prompt assembled with color-coded sections, and a
// simulated response generated. No real LLM: retrieval uses keyword overlap
// scoring and generation is template-based.

// ---- Canvas layout (responsive width) -------------------------------------
let canvasWidth = 1000;
let drawHeight = 600;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let margin = 18;
let defaultTextSize = 14;

// ---- Controls --------------------------------------------------------------
let queryInput, kSlider, tempSlider, sourcesCheckbox, corpusSelect, runBtn, resetBtn;

// ---- Simulated corpora -----------------------------------------------------
const CORPORA = {
  "Company Policies": [
    { title: "Remote Work Policy (2023)", text: "Employees may work remotely up to three days per week. Remote work requests must be approved by the manager. A stipend covers home internet.", kw: ["remote", "work", "home", "days", "policy", "internet", "stipend"] },
    { title: "Code of Conduct", text: "All staff treat colleagues with respect. Harassment and discrimination are prohibited. Violations are reported to HR.", kw: ["conduct", "respect", "harassment", "discrimination", "ethics", "hr"] },
    { title: "Benefits Overview", text: "The company offers health, dental, and vision insurance plus a 401k match of four percent.", kw: ["benefits", "health", "insurance", "401k", "dental", "vision", "match"] },
    { title: "IT Security Guidelines", text: "Use strong passwords and enable two-factor authentication. Do not share credentials. Report phishing to security.", kw: ["security", "password", "authentication", "phishing", "credentials", "vpn", "it"] },
    { title: "Vacation Policy", text: "Full-time employees accrue fifteen vacation days per year. Unused days roll over up to five days.", kw: ["vacation", "days", "pto", "time", "off", "accrue", "rollover"] },
    { title: "Performance Review Process", text: "Reviews happen twice a year. Managers set goals and rate progress against objectives.", kw: ["performance", "review", "goals", "rating", "manager", "objectives", "feedback"] },
    { title: "Equipment Reimbursement", text: "Employees can expense up to five hundred dollars for a home office setup with a receipt.", kw: ["equipment", "reimbursement", "expense", "office", "home", "receipt", "laptop"] },
    { title: "Professional Development", text: "The company sponsors conferences and online courses. Submit a learning request to your manager.", kw: ["development", "training", "courses", "conference", "learning", "education", "growth"] },
    { title: "Health and Safety", text: "Report workplace hazards immediately. Emergency exits are marked on every floor.", kw: ["health", "safety", "hazard", "emergency", "workplace", "exits", "report"] },
    { title: "Emergency Procedures", text: "In a fire, use stairs not elevators. Assemble at the north parking lot. Call security for help.", kw: ["emergency", "fire", "evacuation", "stairs", "safety", "procedure", "assembly"] }
  ],
  "Product Docs": [
    { title: "Getting Started", text: "Install the SDK and create an API key in the dashboard to make your first request.", kw: ["install", "sdk", "api", "key", "start", "dashboard", "request"] },
    { title: "Authentication", text: "Send the API key in the Authorization header. Keys can be rotated from the settings page.", kw: ["authentication", "api", "key", "header", "token", "rotate", "auth"] },
    { title: "Rate Limits", text: "The free tier allows one hundred requests per minute. Upgrade for higher limits.", kw: ["rate", "limit", "requests", "minute", "quota", "tier", "throttle"] },
    { title: "Webhooks", text: "Configure a webhook URL to receive event notifications in real time.", kw: ["webhook", "events", "notification", "url", "callback", "realtime"] },
    { title: "Error Codes", text: "A 401 means bad authentication. A 429 means too many requests. A 500 is a server error.", kw: ["error", "codes", "401", "429", "500", "status", "troubleshoot"] },
    { title: "Data Export", text: "Export your data as CSV or JSON from the reports section at any time.", kw: ["export", "data", "csv", "json", "reports", "download"] },
    { title: "Pricing Tiers", text: "Plans range from free to enterprise with volume discounts and SLAs.", kw: ["pricing", "plans", "tier", "enterprise", "cost", "billing", "sla"] },
    { title: "SDK Reference", text: "The SDK supports Python, JavaScript, and Go with idiomatic clients.", kw: ["sdk", "python", "javascript", "go", "client", "library", "reference"] },
    { title: "Changelog", text: "Version 2.1 adds streaming responses and improved error messages.", kw: ["changelog", "version", "release", "streaming", "update", "feature"] },
    { title: "Support", text: "Contact support through chat or email. Enterprise plans include a dedicated engineer.", kw: ["support", "help", "contact", "chat", "email", "ticket"] }
  ],
  "HR Handbook": [
    { title: "Onboarding", text: "New hires complete orientation in the first week and meet their assigned buddy.", kw: ["onboarding", "orientation", "new", "hire", "buddy", "first", "week"] },
    { title: "Payroll", text: "Salaries are paid biweekly on Fridays via direct deposit.", kw: ["payroll", "salary", "pay", "deposit", "biweekly", "wages"] },
    { title: "Leave of Absence", text: "Medical and family leave follow FMLA rules. Submit a leave request to HR.", kw: ["leave", "absence", "medical", "family", "fmla", "request", "hr"] },
    { title: "Promotions", text: "Promotions are reviewed annually based on performance and role scope.", kw: ["promotion", "career", "advancement", "review", "performance", "level"] },
    { title: "Diversity and Inclusion", text: "We foster an inclusive workplace and support employee resource groups.", kw: ["diversity", "inclusion", "equity", "belonging", "groups", "culture"] },
    { title: "Grievance Procedure", text: "Employees can file a grievance confidentially. HR investigates within ten days.", kw: ["grievance", "complaint", "report", "confidential", "investigate", "hr"] },
    { title: "Dress Code", text: "Business casual is standard. Client meetings may require formal attire.", kw: ["dress", "code", "attire", "casual", "formal", "clothing"] },
    { title: "Remote Work", text: "Hybrid schedules are arranged with managers. Core hours are 10am to 3pm.", kw: ["remote", "work", "hybrid", "schedule", "home", "core", "hours"] },
    { title: "Expense Reports", text: "Submit expenses within thirty days with itemized receipts for reimbursement.", kw: ["expense", "report", "receipt", "reimbursement", "travel", "submit"] },
    { title: "Exit Process", text: "Departing employees return equipment and complete an exit interview.", kw: ["exit", "offboarding", "resignation", "equipment", "interview", "leave"] }
  ]
};

const SAMPLE_QUERIES = {
  "Company Policies": "What is our remote work policy?",
  "Product Docs": "How do I authenticate with the API?",
  "HR Handbook": "How does payroll work?"
};

// ---- State machine ---------------------------------------------------------
let retrieved = [];       // [{title, text, score, kw}]
let response = "";
let step = 0;             // 0 idle, 1 retrieval, 2 augmentation, 3 generation, 4 done
let stepStart = 0;
const STEP_MS = [0, 1600, 1100, 1700, 0];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Query input (HTML text input) near the top of the canvas
  queryInput = createInput(SAMPLE_QUERIES["Company Policies"], 'text');
  queryInput.parent(document.querySelector('main'));
  queryInput.size(360, 24);

  corpusSelect = createSelect();
  corpusSelect.parent(document.querySelector('main'));
  Object.keys(CORPORA).forEach(c => corpusSelect.option(c));
  corpusSelect.selected("Company Policies");
  corpusSelect.changed(() => {
    queryInput.value(SAMPLE_QUERIES[corpusSelect.value()]);
    resetSim();
  });

  kSlider = createSlider(1, 10, 3, 1);
  kSlider.parent(document.querySelector('main'));
  kSlider.size(150);

  tempSlider = createSlider(0, 1, 0.7, 0.1);
  tempSlider.parent(document.querySelector('main'));
  tempSlider.size(150);

  sourcesCheckbox = createCheckbox(' Include sources in prompt', true);
  sourcesCheckbox.parent(document.querySelector('main'));

  runBtn = createButton('Run RAG Process');
  runBtn.parent(document.querySelector('main'));
  runBtn.mousePressed(runRag);

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetSim);

  styleButton(runBtn, '#2e7d32');
  styleButton(resetBtn, '#607d8b');

  describe('Interactive RAG simulator: enter a question, retrieve documents with relevance scores, build a color-coded augmented prompt, and see a simulated response.', LABEL);
}

function styleButton(b, color) {
  b.style('background-color', color);
  b.style('color', 'white');
  b.style('border', 'none');
  b.style('padding', '7px 12px');
  b.style('border-radius', '5px');
  b.style('font-weight', 'bold');
  b.style('cursor', 'pointer');
  b.style('font-size', '13px');
}

function positionControls() {
  // Query input + corpus select sit in the drawing region header
  queryInput.position(margin + 70, 40);
  corpusSelect.position(canvasWidth - 200, 40);

  // Control region rows
  const r1 = drawHeight + 12;
  const r2 = drawHeight + 52;
  const r3 = drawHeight + 92;
  kSlider.position(margin + 110, r1);
  tempSlider.position(margin + 350, r1);
  sourcesCheckbox.position(margin, r2);
  runBtn.position(margin, r3);
  resetBtn.position(margin + 150, r3);
}

function runRag() {
  retrieved = retrieveDocs();
  response = generateResponse(retrieved);
  step = 1;
  stepStart = millis();
}

function resetSim() {
  step = 0;
  retrieved = [];
  response = "";
}

// Keyword-overlap retrieval (a stand-in for cosine similarity)
function retrieveDocs() {
  const q = queryInput.value().toLowerCase();
  const qWords = q.replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 2);
  const corpus = CORPORA[corpusSelect.value()];
  const scored = corpus.map(doc => {
    let overlap = 0;
    qWords.forEach(w => {
      if (doc.kw.some(k => k.includes(w) || w.includes(k))) overlap += 1;
      if (doc.title.toLowerCase().includes(w)) overlap += 0.6;
    });
    // Normalize to a 0..1-ish relevance score with mild noise from temperature
    const base = overlap / Math.max(2, qWords.length);
    const score = Math.min(0.99, 0.30 + base * 0.65);
    return { ...doc, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const k = kSlider.value();
  return scored.slice(0, k);
}

function generateResponse(docs) {
  if (!docs.length) return "I could not find any relevant documents for that question.";
  const top = docs[0];
  const cite = sourcesCheckbox.checked() ? ` [Source: ${top.title}]` : "";
  const temp = tempSlider.value();
  const hedge = temp > 0.7 ? "It appears that " : (temp < 0.3 ? "According to the documents, " : "Based on the retrieved context, ");
  return hedge + lowerFirst(top.text) + cite;
}

function lowerFirst(s) { return s.charAt(0).toLowerCase() + s.slice(1); }

function draw() {
  updateCanvasSize();
  positionControls();

  // Regions
  noStroke();
  fill('aliceblue'); stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(20);
  text('RAG MicroSim: Retrieval - Augmentation - Generation', canvasWidth / 2, 8);

  // Query label
  textAlign(LEFT, CENTER); textSize(14); fill('#37474f');
  noStroke();
  text('Query:', margin, 52);

  // Advance step machine
  if (step >= 1 && step <= 3) {
    if (millis() - stepStart > STEP_MS[step]) { step++; stepStart = millis(); }
  }

  drawStepIndicator();
  drawPanels();
  drawControlLabels();

  textAlign(LEFT, CENTER); textSize(defaultTextSize);
}

function drawStepIndicator() {
  const labels = ['1. Retrieval', '2. Augmentation', '3. Generation'];
  const colors = ['#1e88e5', '#fb8c00', '#8e24aa'];
  const y = 78;
  const bw = 150, gap = 12;
  const totalW = bw * 3 + gap * 2;
  let x = (canvasWidth - totalW) / 2;
  for (let i = 0; i < 3; i++) {
    const active = step === i + 1;
    const done = step > i + 1;
    noStroke();
    fill(active ? colors[i] : (done ? '#c8e6c9' : '#eceff1'));
    rect(x, y, bw, 26, 6);
    fill(active ? 'white' : '#455a64');
    textAlign(CENTER, CENTER); textSize(13);
    text(labels[i] + (done ? '  ✓' : ''), x + bw / 2, y + 13);
    x += bw + gap;
  }
}

function drawPanels() {
  const top = 116;
  const panelH = drawHeight - top - margin;
  const halfW = (canvasWidth - margin * 3) / 2;
  const leftX = margin, rightX = margin * 2 + halfW;

  // ---- Left panel: retrieved documents ----
  noStroke(); fill('white'); stroke('#cfd8dc');
  rect(leftX, top, halfW, panelH, 8);
  noStroke(); fill('#1e88e5');
  textAlign(LEFT, TOP); textSize(14);
  text('Step 1 - Retrieved Documents (top K)', leftX + 12, top + 10);

  if (step === 1) {
    fill('#90a4ae'); textAlign(CENTER, CENTER); textSize(15);
    text('Searching corpus...', leftX + halfW / 2, top + panelH / 2);
  } else if (step >= 2 && retrieved.length) {
    let dy = top + 38;
    const rowH = Math.min(46, (panelH - 46) / retrieved.length);
    retrieved.forEach((doc, i) => {
      noStroke(); fill(i === 0 ? '#e3f2fd' : '#f5f7fa'); stroke('#e0e0e0');
      rect(leftX + 10, dy, halfW - 20, rowH - 6, 5);
      noStroke(); fill('#263238');
      textAlign(LEFT, TOP); textSize(12.5);
      text(`${i + 1}. ${doc.title}`, leftX + 18, dy + 5);
      // relevance score bar
      const barX = leftX + 18, barW = halfW - 90;
      fill('#eceff1'); rect(barX, dy + 22, barW, 8, 4);
      fill('#43a047'); rect(barX, dy + 22, barW * doc.score, 8, 4);
      fill('#37474f'); textAlign(LEFT, CENTER); textSize(11);
      text(doc.score.toFixed(2), barX + barW + 8, dy + 26);
      dy += rowH;
    });
  } else {
    fill('#b0bec5'); textAlign(CENTER, CENTER); textSize(13);
    text('Click "Run RAG Process" to retrieve documents.', leftX + halfW / 2, top + panelH / 2);
  }

  // ---- Right panel: augmented prompt + response ----
  noStroke(); fill('white'); stroke('#cfd8dc');
  rect(rightX, top, halfW, panelH, 8);
  noStroke();
  textAlign(LEFT, TOP); textSize(14); fill('#fb8c00');
  text('Step 2 - Augmented Prompt', rightX + 12, top + 10);

  if (step >= 2) {
    let py = top + 36;
    py = drawPromptLine(rightX, py, halfW, '#8e24aa', '[System] You are a helpful assistant. Answer using only the context.');
    if (sourcesCheckbox.checked()) {
      py = drawPromptLine(rightX, py, halfW, '#fb8c00', '[Context] ' + retrieved.map(d => d.title).join('; '));
    } else {
      py = drawPromptLine(rightX, py, halfW, '#fb8c00', '[Context] ' + (retrieved[0] ? retrieved[0].text : ''));
    }
    py = drawPromptLine(rightX, py, halfW, '#1e88e5', '[Query] ' + queryInput.value());

    // Response section
    py += 8;
    noStroke(); textAlign(LEFT, TOP); textSize(14); fill('#8e24aa');
    text('Step 3 - Generated Response', rightX + 12, py);
    py += 24;
    noStroke(); fill('#e8f5e9'); stroke('#a5d6a7');
    const respH = top + panelH - py - 12;
    rect(rightX + 10, py, halfW - 20, respH, 6);
    noStroke(); fill('#1b5e20'); textAlign(LEFT, TOP); textSize(13);
    if (step === 3) {
      fill('#558b2f'); text('Generating' + '.'.repeat((floor(millis() / 350) % 4)), rightX + 20, py + 10);
    } else if (step >= 4) {
      textWrapped(response, rightX + 20, py + 10, halfW - 40, 17);
    }
  } else {
    noStroke(); fill('#b0bec5'); textAlign(CENTER, CENTER); textSize(13);
    text('The augmented prompt and response\nappear here after retrieval.', rightX + halfW / 2, top + panelH / 2);
  }
}

function drawPromptLine(x, y, w, color, txt) {
  noStroke(); textAlign(LEFT, TOP); textSize(11.5);
  fill(color);
  return textWrapped(txt, x + 16, y, w - 32, 15) + 6;
}

// Simple word-wrap helper; returns the y AFTER the last line.
function textWrapped(txt, x, y, w, lh) {
  const words = txt.split(' ');
  let line = '', cy = y;
  for (const word of words) {
    const test = line + word + ' ';
    if (textWidth(test) > w && line) {
      text(line, x, cy); cy += lh; line = word + ' ';
    } else { line = test; }
  }
  if (line) { text(line, x, cy); cy += lh; }
  return cy;
}

function drawControlLabels() {
  noStroke(); fill('#37474f');
  textAlign(LEFT, CENTER); textSize(13);
  const r1 = drawHeight + 24;
  text('K = ' + kSlider.value(), margin, r1);
  text('Temp = ' + nf(tempSlider.value(), 1, 1), margin + 280, r1);
  text('Corpus:', canvasWidth - 260, 52);
}

// ---- Responsive sizing -----------------------------------------------------
function updateCanvasSize() {
  const el = document.querySelector('main');
  const cw = (el && el.clientWidth) ? el.clientWidth : windowWidth;
  canvasWidth = Math.max(720, cw);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
