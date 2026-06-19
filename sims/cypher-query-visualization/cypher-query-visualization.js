// Cypher Query Visualization
// CANVAS_HEIGHT: 720
// An interactive Cypher query explorer. Students pick (or edit) a template query,
// execute it, and watch the matched pattern highlight on a vis-network graph while
// a results table fills in. Pattern matching is template-driven (no real Neo4j);
// each template maps to a JavaScript traversal over an inlined IT-infrastructure
// graph. Designed to render from file:// and inside an iframe (data is inlined).

// --- Sample graph: a small IT infrastructure (12 nodes, ~16 edges) ----------
const G = {
  nodes: [
    { id: "customer-portal", name: "Customer Portal", type: "BusinessService", x: -120, y: -300 },
    { id: "mobile-app-svc",  name: "Mobile App",      type: "BusinessService", x: 220,  y: -300 },
    { id: "web-app",   name: "Web App",     type: "Application", version: "2.1", x: -260, y: -90 },
    { id: "api-gw",    name: "API Gateway", type: "Application", version: "1.4", x: 60,   y: -90 },
    { id: "auth-svc",  name: "Auth Service",type: "Application", version: "3.0", x: 320,  y: -90 },
    { id: "vm-web-01", name: "VM-Web-01", type: "Infrastructure", region: "us-east-1", x: -420, y: 130 },
    { id: "vm-api-01", name: "VM-API-01", type: "Infrastructure", region: "us-east-1", x: 60,   y: 150 },
    { id: "cache-01",  name: "Cache-01",  type: "Infrastructure", region: "us-east-1", x: -140, y: 150 },
    { id: "vm-auth-01",name: "VM-Auth-01",type: "Infrastructure", region: "us-west-2", x: 360,  y: 150 },
    { id: "customer-db", name: "Customer DB", type: "Database", dbtype: "PostgreSQL", x: -280, y: 320 },
    { id: "auth-db",     name: "Auth DB",     type: "Database", dbtype: "PostgreSQL", x: 220,  y: 320 },
    { id: "analytics-db",name: "Analytics DB",type: "Database", dbtype: "ClickHouse", x: -40,  y: 330 }
  ],
  edges: [
    { from: "customer-portal", to: "web-app",  rel: "DEPENDS_ON" },
    { from: "customer-portal", to: "api-gw",   rel: "DEPENDS_ON" },
    { from: "mobile-app-svc",  to: "api-gw",   rel: "DEPENDS_ON" },
    { from: "mobile-app-svc",  to: "auth-svc", rel: "DEPENDS_ON" },
    { from: "api-gw",   to: "auth-svc", rel: "DEPENDS_ON" },
    { from: "vm-web-01", to: "web-app",  rel: "HOSTS" },
    { from: "vm-api-01", to: "api-gw",   rel: "HOSTS" },
    { from: "vm-auth-01",to: "auth-svc", rel: "HOSTS" },
    { from: "web-app",  to: "customer-db",  rel: "CONNECTS_TO", port: 5432 },
    { from: "web-app",  to: "cache-01",     rel: "CONNECTS_TO", port: 6379 },
    { from: "api-gw",   to: "analytics-db", rel: "CONNECTS_TO", port: 8123 },
    { from: "auth-svc", to: "auth-db",      rel: "CONNECTS_TO", port: 5432 },
    { from: "vm-web-01", to: "vm-api-01",  rel: "CONNECTS_TO", port: 443 },
    { from: "vm-api-01", to: "vm-auth-01", rel: "CONNECTS_TO", port: 443 }
  ]
};

const TYPE_STYLE = {
  BusinessService: { shape: "hexagon", bg: "#1e88e5", bd: "#0d47a1" },
  Application:     { shape: "box",     bg: "#43a047", bd: "#1b5e20" },
  Infrastructure:  { shape: "diamond", bg: "#90a4ae", bd: "#455a64" },
  Database:        { shape: "database",bg: "#fb8c00", bd: "#e65100" }
};
const REL_COLOR = { DEPENDS_ON: "#e53935", HOSTS: "#1e88e5", CONNECTS_TO: "#43a047" };
const REL_DASH  = { DEPENDS_ON: false, HOSTS: [8,6], CONNECTS_TO: [2,4] };
const MATCH_COLOR = "#ffca28";

// --- Templates: query text + a matcher returning {nodes, edges, rows} -------
const TEMPLATES = [
  {
    desc: "Find all applications and their versions.",
    query: "MATCH (n:Application)\nRETURN n.name, n.version",
    cols: ["n.name", "n.version"],
    run: () => {
      const ns = G.nodes.filter(n => n.type === "Application");
      return { nodes: ns.map(n => n.id), edges: [],
        rows: ns.map(n => [n.name, n.version]) };
    }
  },
  {
    desc: "Find what VM-Web-01 hosts (one hop along HOSTS).",
    query: 'MATCH (vm:Infrastructure {name: "VM-Web-01"})-[:HOSTS]->(app)\nRETURN app.name',
    cols: ["app.name"],
    run: () => {
      const start = "vm-web-01";
      const es = G.edges.filter(e => e.from === start && e.rel === "HOSTS");
      const targets = es.map(e => e.to);
      return { nodes: [start, ...targets], edges: edgeIds(es),
        rows: targets.map(t => [nodeName(t)]) };
    }
  },
  {
    desc: "Find all direct DEPENDS_ON dependencies of every business service.",
    query: "MATCH (s:BusinessService)-[:DEPENDS_ON]->(dep)\nRETURN s.name, dep.name",
    cols: ["s.name", "dep.name"],
    run: () => {
      const es = G.edges.filter(e => e.rel === "DEPENDS_ON" &&
        nodeType(e.from) === "BusinessService");
      const ns = new Set();
      es.forEach(e => { ns.add(e.from); ns.add(e.to); });
      return { nodes: [...ns], edges: edgeIds(es),
        rows: es.map(e => [nodeName(e.from), nodeName(e.to)]) };
    }
  },
  {
    desc: "Find dependencies of Customer Portal up to 3 hops deep (variable-length path).",
    query: 'MATCH path = (s:BusinessService {name: "Customer Portal"})-[:DEPENDS_ON*1..3]->(dep)\nRETURN dep.name, length(path)',
    cols: ["dep.name", "length(path)"],
    run: () => {
      const start = "customer-portal";
      const res = varLengthBFS(start, ["DEPENDS_ON"], 3);
      const rows = [];
      res.reached.forEach((len, id) => { if (id !== start) rows.push([nodeName(id), len]); });
      rows.sort((a, b) => a[1] - b[1]);
      return { nodes: [...res.reached.keys()], edges: res.edges, rows, animLevels: res.levels };
    }
  },
  {
    desc: "Blast radius: which services break if VM-Web-01 fails? (multi-hop, multi-relationship)",
    query: 'MATCH path = (vm:Infrastructure {name: "VM-Web-01"})-[:HOSTS|CONNECTS_TO|DEPENDS_ON*1..5]->(affected)\nRETURN DISTINCT affected.name',
    cols: ["affected.name"],
    run: () => {
      const start = "vm-web-01";
      const res = varLengthBFS(start, ["HOSTS", "CONNECTS_TO", "DEPENDS_ON"], 5);
      // Walk "upstream" too: anything that DEPENDS_ON a hosted app is affected.
      const affected = new Set(res.reached.keys());
      let changed = true;
      while (changed) {
        changed = false;
        G.edges.forEach(e => {
          if (e.rel === "DEPENDS_ON" && affected.has(e.to) && !affected.has(e.from)) {
            affected.add(e.from); changed = true;
          }
        });
      }
      const rows = [...affected].filter(id => id !== start).map(id => [nodeName(id)]);
      const es = G.edges.filter(e => affected.has(e.from) && affected.has(e.to));
      return { nodes: [...affected], edges: edgeIds(es), rows, animLevels: res.levels };
    }
  }
];

// --- Helpers ----------------------------------------------------------------
function nodeName(id) { const n = G.nodes.find(x => x.id === id); return n ? n.name : id; }
function nodeType(id) { const n = G.nodes.find(x => x.id === id); return n ? n.type : null; }
function edgeId(e) { return G.edges.indexOf(e); }
function edgeIds(arr) { return arr.map(edgeId); }

function varLengthBFS(start, rels, maxHops) {
  const reached = new Map([[start, 0]]);
  const edges = [];
  const levels = [[start]];
  let frontier = [start];
  for (let h = 0; h < maxHops; h++) {
    const next = [];
    G.edges.forEach((e, i) => {
      if (frontier.includes(e.from) && rels.includes(e.rel)) {
        edges.push(i);
        if (!reached.has(e.to)) { reached.set(e.to, h + 1); next.push(e.to); }
      }
    });
    if (!next.length) break;
    levels.push(next);
    frontier = next;
  }
  return { reached, edges, levels };
}

// --- vis-network setup ------------------------------------------------------
let network, nodes, edges;

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

function baseNode(n) {
  const s = TYPE_STYLE[n.type];
  return {
    id: n.id, label: n.name, x: n.x, y: n.y, shape: s.shape,
    color: { background: s.bg, border: s.bd },
    font: { color: "#fff", size: 14, face: "Arial" },
    borderWidth: 2, size: 18, margin: 9, widthConstraint: { maximum: 120 }
  };
}
function baseEdge(e, i) {
  return {
    id: i, from: e.from, to: e.to,
    color: { color: REL_COLOR[e.rel] }, dashes: REL_DASH[e.rel],
    width: 2, arrows: { to: { enabled: true, scaleFactor: 0.8 } },
    smooth: { type: "curvedCW", roundness: 0.1 }
  };
}

function initNetwork() {
  nodes = new vis.DataSet(G.nodes.map(baseNode));
  edges = new vis.DataSet(G.edges.map(baseEdge));
  const enableMouse = !isInIframe();
  network = new vis.Network(document.getElementById("network"),
    { nodes, edges }, {
      layout: { improvedLayout: false },
      physics: { enabled: false },
      interaction: {
        hover: true, selectConnectedEdges: false, dragNodes: true,
        dragView: enableMouse, zoomView: enableMouse,
        navigationButtons: true, keyboard: { enabled: false }
      }
    });
  network.once("afterDrawing", () =>
    network.moveTo({ position: { x: 40, y: 30 }, scale: 0.38, animation: false }));

  network.on("click", params => {
    if (params.nodes.length) {
      const n = G.nodes.find(x => x.id === params.nodes[0]);
      document.getElementById("info").innerHTML =
        `To match this node: <code>MATCH (n:${n.type} {name: "${n.name}"}) RETURN n</code>`;
    }
  });
}

function resetGraphStyle() {
  nodes.forEach(n => {
    const orig = G.nodes.find(x => x.id === n.id);
    const s = TYPE_STYLE[orig.type];
    nodes.update({ id: n.id, color: { background: s.bg, border: s.bd },
      borderWidth: 2, opacity: 1 });
  });
  edges.forEach(e => {
    const orig = G.edges[e.id];
    edges.update({ id: e.id, color: { color: REL_COLOR[orig.rel] }, width: 2 });
  });
}

function dimAll() {
  nodes.forEach(n => nodes.update({ id: n.id, opacity: 0.2 }));
  edges.forEach(e => edges.update({ id: e.id, color: { opacity: 0.12 } }));
}

function highlightNode(id) {
  nodes.update({ id, opacity: 1, borderWidth: 4,
    color: { border: MATCH_COLOR } });
}
function highlightEdge(i) {
  edges.update({ id: i, color: { color: MATCH_COLOR, opacity: 1 }, width: 4 });
}

// --- Execute ---------------------------------------------------------------
let running = false;

function renderResults(cols, rows, stats) {
  const thead = document.querySelector("#results thead");
  const tbody = document.querySelector("#results tbody");
  thead.innerHTML = "<tr>" + cols.map(c => `<th>${c}</th>`).join("") + "</tr>";
  if (!rows.length) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="${cols.length}">No nodes matched this pattern.</td></tr>`;
  } else {
    tbody.innerHTML = rows.map(r =>
      "<tr>" + r.map(c => `<td>${c}</td>`).join("") + "</tr>").join("");
  }
  document.getElementById("stats").textContent = stats;
}

function execute() {
  if (running) return;
  const idx = parseInt(document.getElementById("template").value, 10);
  const tpl = TEMPLATES[idx];
  const result = tpl.run();
  const animate = document.getElementById("animate").checked;
  const speed = parseInt(document.getElementById("speed").value, 10);
  const t0 = performance.now();

  resetGraphStyle();
  dimAll();

  const finalize = () => {
    const ms = Math.max(5, Math.round(performance.now() - t0)) % 40 + 8; // simulated
    renderResults(tpl.cols, result.rows,
      `Matched ${result.nodes.length} node(s), traversed ${result.edges.length} relationship(s) in ${ms}ms.`);
    running = false;
  };

  if (!animate || !result.animLevels) {
    // Simple highlight (no step animation)
    result.nodes.forEach(highlightNode);
    result.edges.forEach(highlightEdge);
    finalize();
    return;
  }

  // Step-by-step traversal animation by BFS level
  running = true;
  document.getElementById("stats").textContent = "Executing traversal...";
  let step = 0;
  const levels = result.animLevels;
  const tick = () => {
    if (step < levels.length) {
      levels[step].forEach(highlightNode);
      // highlight edges leading into this level
      result.edges.forEach(i => {
        const e = G.edges[i];
        if (levels[step].includes(e.to)) highlightEdge(i);
      });
      step++;
      setTimeout(tick, speed);
    } else {
      // ensure all matched nodes/edges shown
      result.nodes.forEach(highlightNode);
      result.edges.forEach(highlightEdge);
      finalize();
    }
  };
  tick();
}

function loadTemplate() {
  const idx = parseInt(document.getElementById("template").value, 10);
  const tpl = TEMPLATES[idx];
  document.getElementById("query").value = tpl.query;
  document.getElementById("desc").textContent = tpl.desc;
}

document.addEventListener("DOMContentLoaded", () => {
  initNetwork();
  loadTemplate();

  document.getElementById("template").addEventListener("change", loadTemplate);
  document.getElementById("run-btn").addEventListener("click", execute);
  document.getElementById("clear-btn").addEventListener("click", () => {
    resetGraphStyle();
    document.querySelector("#results thead").innerHTML = "";
    document.querySelector("#results tbody").innerHTML = "";
    document.getElementById("stats").textContent = "Results cleared. Execute a query to begin.";
  });
  document.getElementById("speed").addEventListener("input", e =>
    document.getElementById("speed-val").textContent = e.target.value);
});
