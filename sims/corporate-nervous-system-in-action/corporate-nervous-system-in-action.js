// Corporate Nervous System in Action
// CANVAS_HEIGHT: 760
// A p5.js MicroSim that models a corporate IT knowledge graph and runs real-time
// impact analysis. Pick a change/incident scenario (or click any node) and the
// simulation animates a breadth-first traversal across DEPENDS_ON / HOSTS /
// CONNECTS_TO relationships, coloring the blast radius and listing affected
// services, stakeholders, and business impact in the right-hand panel.

let canvasWidth = 1100;
let drawHeight = 700;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;
let defaultTextSize = 14;

let scenarioSelect, runBtn, resetBtn, depthSlider;

// Panel geometry
const PANEL_W = 320;                 // right impact panel width

// ---- Graph model -----------------------------------------------------------
// Node types: BusinessService, Application, Infrastructure, Database
// gx/gy are normalized layout coordinates (0..1) within the graph area.
const NODES = [
  // Business services (top)
  { id: "customer-portal", label: "Customer Portal", type: "BusinessService", tier: 1, sla: 99.9, owner: "Digital Team", gx: 0.18, gy: 0.10 },
  { id: "mobile-app",      label: "Mobile App",      type: "BusinessService", tier: 1, sla: 99.9, owner: "Digital Team", gx: 0.50, gy: 0.08 },
  { id: "reporting",       label: "Reporting Dashboard", type: "BusinessService", tier: 2, sla: 99.5, owner: "Analytics Team", gx: 0.82, gy: 0.12 },
  // Applications (middle)
  { id: "web-app",   label: "Web App",       type: "Application", owner: "Digital Team", gx: 0.12, gy: 0.34 },
  { id: "api-gw",    label: "API Gateway",   type: "Application", owner: "Platform Team", gx: 0.40, gy: 0.32 },
  { id: "auth-svc",  label: "Auth Service",  type: "Application", owner: "Security Team", gx: 0.62, gy: 0.34 },
  { id: "report-svc",label: "Report Service",type: "Application", owner: "Analytics Team", gx: 0.86, gy: 0.36 },
  { id: "legacy-api",label: "Legacy API",    type: "Application", owner: "Platform Team", gx: 0.28, gy: 0.50 },
  // Infrastructure (lower)
  { id: "vm-web-01", label: "VM-Web-01", type: "Infrastructure", region: "us-east-1", gx: 0.08, gy: 0.62 },
  { id: "vm-web-02", label: "VM-Web-02", type: "Infrastructure", region: "us-east-1", gx: 0.22, gy: 0.72 },
  { id: "vm-api-01", label: "VM-API-01", type: "Infrastructure", region: "us-east-1", gx: 0.42, gy: 0.62 },
  { id: "vm-auth-01",label: "VM-Auth-01",type: "Infrastructure", region: "us-west-2", gx: 0.62, gy: 0.62 },
  { id: "cache-01",  label: "Cache-01",  type: "Infrastructure", region: "us-east-1", gx: 0.50, gy: 0.50 },
  // Databases (bottom)
  { id: "customer-db", label: "Customer DB", type: "Database", dbtype: "PostgreSQL", gx: 0.18, gy: 0.90 },
  { id: "auth-db",     label: "Auth DB",     type: "Database", dbtype: "PostgreSQL", gx: 0.62, gy: 0.90 },
  { id: "analytics-db",label: "Analytics DB",type: "Database", dbtype: "ClickHouse", gx: 0.86, gy: 0.66 }
];

// Edges. Impact traverses "upstream" (toward dependents) to find what breaks.
const EDGES = [
  { from: "customer-portal", to: "web-app",  rel: "DEPENDS_ON", crit: "critical" },
  { from: "customer-portal", to: "api-gw",   rel: "DEPENDS_ON", crit: "high" },
  { from: "mobile-app",      to: "api-gw",   rel: "DEPENDS_ON", crit: "critical" },
  { from: "mobile-app",      to: "auth-svc", rel: "DEPENDS_ON", crit: "high" },
  { from: "reporting",       to: "report-svc", rel: "DEPENDS_ON", crit: "high" },
  { from: "api-gw",   to: "auth-svc",  rel: "DEPENDS_ON", crit: "high" },
  { from: "report-svc", to: "legacy-api", rel: "DEPENDS_ON", crit: "medium" },
  { from: "web-app",  to: "customer-db", rel: "CONNECTS_TO", crit: "critical" },
  { from: "web-app",  to: "cache-01",    rel: "CONNECTS_TO", crit: "medium" },
  { from: "api-gw",   to: "cache-01",    rel: "CONNECTS_TO", crit: "medium" },
  { from: "auth-svc", to: "auth-db",     rel: "CONNECTS_TO", crit: "critical" },
  { from: "report-svc", to: "analytics-db", rel: "CONNECTS_TO", crit: "high" },
  { from: "legacy-api", to: "customer-db",  rel: "CONNECTS_TO", crit: "medium" },
  { from: "vm-web-01", to: "web-app",  rel: "HOSTS", crit: "critical" },
  { from: "vm-web-02", to: "web-app",  rel: "HOSTS", crit: "high" },
  { from: "vm-api-01", to: "api-gw",   rel: "HOSTS", crit: "critical" },
  { from: "vm-auth-01",to: "auth-svc", rel: "HOSTS", crit: "critical" }
];

const TYPE_COLOR = {
  BusinessService: { bg: "#1e88e5", bd: "#0d47a1" },
  Application:     { bg: "#43a047", bd: "#1b5e20" },
  Infrastructure:  { bg: "#90a4ae", bd: "#455a64" },
  Database:        { bg: "#fb8c00", bd: "#e65100" }
};
const REL_COLOR = { DEPENDS_ON: "#e53935", HOSTS: "#1565c0", CONNECTS_TO: "#2e7d32" };

// Scenarios: a starting node + descriptive metadata
const SCENARIOS = {
  "Routine: Upgrade Customer DB to PostgreSQL 15": {
    start: "customer-db", kind: "change",
    note: "Tier-1 services affected -> CAB approval required.",
    actions: ["Approval: Change Advisory Board (CAB)", "Window: Tuesday 2-4 AM (lowest traffic)", "Rollback: snapshot restore (15 min RTO)"],
    rate: 12
  },
  "Incident: VM-Web-01 disk failure": {
    start: "vm-web-01", kind: "incident",
    note: "P1 critical - auto-page on-call engineer.",
    actions: ["Failover to VM-Web-02 (automated, 5 min)", "Notify Customer Portal team", "Post to status page"],
    rate: 15
  },
  "Change: Decommission Legacy API": {
    start: "legacy-api", kind: "change",
    note: "Verify no downstream consumers before removal.",
    actions: ["Approval: Architecture Review Board", "Migrate Report Service off Legacy API", "Window: weekend maintenance"],
    rate: 4
  },
  "Security: Patch Auth Service": {
    start: "auth-svc", kind: "security",
    note: "Auth is on the critical path for login.",
    actions: ["Approval: Security + CAB", "Rolling patch behind load balancer", "Verify token issuance post-patch"],
    rate: 9
  }
};

// ---- Runtime state ---------------------------------------------------------
let posMap = {};          // id -> {x,y} pixel positions
let adjUp = {};           // id -> [dependent ids] (who breaks if id fails)
let impactSet = new Set();
let impactLevel = {};     // id -> hop number
let startNode = null;
let animProgress = 0;     // current revealed hop level
let animTimer = 0;
let hoverId = null;

function buildAdjacency() {
  // adjUp[x] = list of nodes that BREAK if x fails (its dependents).
  // DEPENDS_ON (dependent -> dependency) and CONNECTS_TO (client -> server):
  //   if `to` fails, `from` is affected  => dependent of `to` is `from`.
  // HOSTS (host -> hosted): if the host (`from`) fails, the hosted app (`to`)
  //   is affected => dependent of `from` is `to`.
  EDGES.forEach(e => {
    let key, dep;
    if (e.rel === "HOSTS") { key = e.from; dep = e.to; }
    else { key = e.to; dep = e.from; }
    if (!adjUp[key]) adjUp[key] = [];
    adjUp[key].push(dep);
  });
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildAdjacency();

  scenarioSelect = createSelect();
  scenarioSelect.parent(document.querySelector('main'));
  Object.keys(SCENARIOS).forEach(s => scenarioSelect.option(s));
  scenarioSelect.option("Custom: click any node");

  depthSlider = createSlider(1, 6, 5, 1);
  depthSlider.parent(document.querySelector('main'));
  depthSlider.size(120);

  runBtn = createButton('Run Impact Analysis');
  runBtn.parent(document.querySelector('main'));
  runBtn.mousePressed(runScenario);
  styleButton(runBtn, '#8e24aa');

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetSim);
  styleButton(resetBtn, '#607d8b');

  describe('Corporate nervous system impact-analysis simulator: select a scenario or click a node to animate the blast radius across an IT infrastructure knowledge graph and list affected services and stakeholders.', LABEL);
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
  const y = drawHeight + 16;
  scenarioSelect.position(margin, y);
  scenarioSelect.style('width', '300px');
  depthSlider.position(margin + 430, y + 4);
  runBtn.position(margin + 600, y - 2);
  resetBtn.position(margin + 760, y - 2);
}

function computeLayout() {
  const gw = canvasWidth - PANEL_W - margin * 2;
  const gh = drawHeight - 70;          // leave room for title
  const ox = margin, oy = 56;
  NODES.forEach(n => {
    posMap[n.id] = { x: ox + n.gx * gw, y: oy + n.gy * gh };
  });
}

function runScenario() {
  const sel = scenarioSelect.value();
  if (SCENARIOS[sel]) {
    startNode = SCENARIOS[sel].start;
  } else if (!startNode) {
    return; // custom mode but nothing clicked yet
  }
  computeImpact(startNode);
  animProgress = 0;
  animTimer = millis();
}

function computeImpact(start) {
  impactSet = new Set([start]);
  impactLevel = { [start]: 0 };
  const maxDepth = depthSlider.value();
  let frontier = [start];
  for (let d = 0; d < maxDepth; d++) {
    const next = [];
    frontier.forEach(id => {
      (adjUp[id] || []).forEach(dep => {
        if (!impactSet.has(dep)) {
          impactSet.add(dep); impactLevel[dep] = d + 1; next.push(dep);
        }
      });
    });
    if (!next.length) break;
    frontier = next;
  }
}

function resetSim() {
  impactSet = new Set();
  impactLevel = {};
  startNode = null;
  animProgress = 0;
}

function draw() {
  updateCanvasSize();
  positionControls();
  computeLayout();

  // Regions
  stroke('silver'); fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(LEFT, TOP); textSize(19);
  text('Corporate Nervous System: Real-Time Impact Analysis', margin, 14);

  // Advance reveal animation
  if (impactSet.size && animProgress < depthSlider.value() + 1) {
    if (millis() - animTimer > 420) { animProgress++; animTimer = millis(); }
  }

  drawEdges();
  drawNodes();
  drawLegend();
  drawPanel();
  drawControlLabels();

  textAlign(LEFT, CENTER); textSize(defaultTextSize);
}

function inImpact(id) {
  return impactSet.has(id) && impactLevel[id] <= animProgress;
}

function drawEdges() {
  EDGES.forEach(e => {
    const a = posMap[e.from], b = posMap[e.to];
    const active = inImpact(e.from) && inImpact(e.to);
    strokeWeight(active ? 3.5 : 1.5);
    if (active) stroke('#ffb300');
    else stroke(red(color(REL_COLOR[e.rel])), green(color(REL_COLOR[e.rel])), blue(color(REL_COLOR[e.rel])), impactSet.size ? 60 : 150);
    // dotted/dashed by relationship type
    drawStyledLine(a.x, a.y, b.x, b.y, e.rel);
    // arrowhead
    drawArrow(a.x, a.y, b.x, b.y, active ? '#ffb300' : REL_COLOR[e.rel], impactSet.size && !active ? 60 : 255);
  });
}

function drawStyledLine(x1, y1, x2, y2, rel) {
  if (rel === "HOSTS") drawDash(x1, y1, x2, y2, 9, 6);
  else if (rel === "CONNECTS_TO") drawDash(x1, y1, x2, y2, 2, 5);
  else line(x1, y1, x2, y2);
}

function drawDash(x1, y1, x2, y2, dash, gap) {
  const d = dist(x1, y1, x2, y2);
  const steps = d / (dash + gap);
  const dx = (x2 - x1) / steps, dy = (y2 - y1) / steps;
  let on = true, cx = x1, cy = y1;
  for (let i = 0; i < steps; i++) {
    const nx = cx + dx, ny = cy + dy;
    if (on) line(cx, cy, cx + dx * (dash / (dash + gap)), cy + dy * (dash / (dash + gap)));
    cx = nx; cy = ny;
  }
}

function drawArrow(x1, y1, x2, y2, col, alpha) {
  const ang = atan2(y2 - y1, x2 - x1);
  const r = 22; // back off from node center
  const tx = x2 - cos(ang) * r, ty = y2 - sin(ang) * r;
  push();
  const c = color(col); c.setAlpha(alpha);
  fill(c); noStroke();
  translate(tx, ty); rotate(ang);
  triangle(0, 0, -8, -4, -8, 4);
  pop();
}

function drawNodes() {
  hoverId = null;
  NODES.forEach(n => {
    const p = posMap[n.id];
    const tc = TYPE_COLOR[n.type];
    const affected = inImpact(n.id);
    const isStart = n.id === startNode;
    const hovering = dist(mouseX, mouseY, p.x, p.y) < 20;
    if (hovering && mouseY < drawHeight) hoverId = n.id;

    // pulse for start / critical
    let glow = 0;
    if (isStart && impactSet.size) glow = 8 + 4 * sin(millis() / 180);
    else if (affected) glow = 5;

    if (glow > 0) {
      noStroke();
      fill(isStart ? color(255, 87, 34, 60) : color(255, 179, 0, 50));
      ellipse(p.x, p.y, 40 + glow * 2, 40 + glow * 2);
    }

    stroke(affected ? '#ff6f00' : tc.bd);
    strokeWeight(affected ? 3 : 2);
    if (impactSet.size && !affected) {
      const c = color(tc.bg); c.setAlpha(70); fill(c);
    } else {
      fill(tc.bg);
    }
    drawShape(n.type, p.x, p.y);

    // label
    noStroke();
    fill(impactSet.size && !affected ? color(120, 120, 120) : color(40));
    textAlign(CENTER, TOP); textSize(10.5);
    text(n.label, p.x, p.y + 16);
  });
}

function drawShape(type, x, y) {
  const s = 14;
  if (type === "BusinessService") {
    beginShape();
    for (let i = 0; i < 6; i++) {
      const a = PI / 6 + i * PI / 3;
      vertex(x + cos(a) * s, y + sin(a) * s);
    }
    endShape(CLOSE);
  } else if (type === "Application") {
    rectMode(CENTER); rect(x, y, s * 2, s * 1.5, 3); rectMode(CORNER);
  } else if (type === "Infrastructure") {
    quad(x, y - s, x + s, y, x, y + s, x - s, y);
  } else { // Database cylinder
    const w = s * 1.6, h = s * 1.8;
    ellipse(x, y - h / 2 + 3, w, 7);
    rect(x - w / 2, y - h / 2 + 3, w, h - 6);
    noStroke(); fill(red(color('#fb8c00')) - 20, 110, 0);
    ellipse(x, y + h / 2 - 3, w, 7);
  }
}

function drawLegend() {
  const x = margin + 6, y = drawHeight - 92;
  noStroke(); fill(255, 255, 255, 230); stroke('#cfd8dc');
  rect(x, y, 220, 84, 6);
  noStroke(); textAlign(LEFT, CENTER); textSize(10.5); fill('#37474f');
  const items = [
    ['#1e88e5', 'Business Service (hexagon)'],
    ['#43a047', 'Application (rectangle)'],
    ['#90a4ae', 'Infrastructure (diamond)'],
    ['#fb8c00', 'Database (cylinder)'],
    ['#ff6f00', 'In blast radius']
  ];
  items.forEach((it, i) => {
    fill(it[0]); noStroke(); ellipse(x + 14, y + 14 + i * 14, 9, 9);
    fill('#37474f'); text(it[1], x + 26, y + 14 + i * 14);
  });
}

function drawPanel() {
  const x = canvasWidth - PANEL_W - margin, y = 48, w = PANEL_W, h = drawHeight - y - margin;
  noStroke(); fill('white'); stroke('#cfd8dc');
  rect(x, y, w, h, 8);

  let cy = y + 12;
  noStroke(); textAlign(LEFT, TOP);
  fill('#1a3a6c'); textSize(15);
  text('Impact Analysis', x + 14, cy); cy += 24;

  if (!impactSet.size) {
    fill('#607d8b'); textSize(12.5);
    cy = wrap('Select a scenario and press "Run Impact Analysis", or switch to "Custom" and click any node. The graph will animate the blast radius and list affected services and stakeholders.', x + 14, cy, w - 28, 16);
    cy += 6;
    fill('#8e24aa'); textSize(12); textStyle(BOLD);
    cy = wrap('This is your corporate nervous system: graph queries answer in milliseconds what would take hours manually.', x + 14, cy, w - 28, 16);
    textStyle(NORMAL);
    return;
  }

  const sn = NODES.find(n => n.id === startNode);
  fill('#263238'); textSize(12.5); textStyle(BOLD);
  text('Trigger: ' + (sn ? sn.label : startNode), x + 14, cy); cy += 18;
  textStyle(NORMAL);

  const sel = scenarioSelect.value();
  const scn = SCENARIOS[sel];
  if (scn) { fill('#b71c1c'); cy = wrap(scn.note, x + 14, cy, w - 28, 15); cy += 4; }

  // Affected business services
  fill('#1565c0'); textSize(12.5); textStyle(BOLD);
  text('Affected Business Services', x + 14, cy); cy += 17; textStyle(NORMAL);
  fill('#37474f'); textSize(12);
  const svc = [...impactSet].map(id => NODES.find(n => n.id === id))
    .filter(n => n && n.type === "BusinessService" && impactLevel[n.id] <= animProgress);
  if (svc.length) {
    svc.forEach(n => { text('• ' + n.label + '  (Tier-' + n.tier + ', SLA ' + n.sla + '%)', x + 18, cy); cy += 15; });
  } else { fill('#90a4ae'); text('• none reached yet', x + 18, cy); cy += 15; }

  // Stakeholders
  cy += 4; fill('#2e7d32'); textSize(12.5); textStyle(BOLD);
  text('Stakeholders to Notify', x + 14, cy); cy += 17; textStyle(NORMAL);
  fill('#37474f'); textSize(12);
  const owners = new Set([...impactSet].filter(id => impactLevel[id] <= animProgress)
    .map(id => { const n = NODES.find(x => x.id === id); return n ? n.owner : null; }).filter(Boolean));
  [...owners].forEach(o => { text('• ' + o, x + 18, cy); cy += 15; });

  // Recommended actions
  if (scn) {
    cy += 4; fill('#e65100'); textSize(12.5); textStyle(BOLD);
    text('Recommended Actions', x + 14, cy); cy += 17; textStyle(NORMAL);
    fill('#37474f'); textSize(11.5);
    scn.actions.forEach(a => { cy = wrap('• ' + a, x + 18, cy, w - 32, 14) + 2; });
  }

  // Metrics box
  const hops = Math.max(...[...impactSet].filter(id => impactLevel[id] <= animProgress).map(id => impactLevel[id]), 0);
  const cost = scn ? scn.rate : 8;
  const my = y + h - 88;
  noStroke(); fill('#263238'); rect(x + 12, my, w - 24, 76, 6);
  fill('#80cbc4'); textSize(11); textStyle(BOLD);
  text('Real-time metrics (GraphRAG)', x + 22, my + 8); textStyle(NORMAL);
  fill('#eceff1'); textSize(11);
  text('Query time: 23 ms   Nodes analyzed: ' + impactSet.size, x + 22, my + 26);
  text('Relationships traversed: ' + EDGES.length + '   Impact depth: ' + hops + ' hops', x + 22, my + 40);
  fill('#ffcc80');
  text('Est. business impact: $' + cost + 'K/hour at risk', x + 22, my + 56);
}

function wrap(txt, x, y, w, lh) {
  const words = txt.split(' ');
  let line = '', cy = y;
  for (const word of words) {
    const test = line + word + ' ';
    if (textWidth(test) > w && line) { text(line, x, cy); cy += lh; line = word + ' '; }
    else line = test;
  }
  if (line) { text(line, x, cy); cy += lh; }
  return cy;
}

function drawControlLabels() {
  noStroke(); fill('#37474f'); textAlign(LEFT, CENTER); textSize(12.5);
  text('Scenario', margin, drawHeight + 8);
  text('Depth: ' + depthSlider.value() + ' hops', margin + 430, drawHeight + 8);
}

function mousePressed() {
  if (scenarioSelect && scenarioSelect.value() === "Custom: click any node" && mouseY < drawHeight) {
    let nearest = null, nd = 1e9;
    NODES.forEach(n => {
      const p = posMap[n.id]; const d = dist(mouseX, mouseY, p.x, p.y);
      if (d < 22 && d < nd) { nd = d; nearest = n.id; }
    });
    if (nearest) {
      startNode = nearest;
      computeImpact(nearest);
      animProgress = 0; animTimer = millis();
    }
  }
}

function updateCanvasSize() {
  const el = document.querySelector('main');
  const cw = (el && el.clientWidth) ? el.clientWidth : windowWidth;
  canvasWidth = Math.max(760, cw);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
