// Graph Data Model Visualization
// CANVAS_HEIGHT: 640
// Interactive vis-network graph of a small IT infrastructure: business services,
// applications, infrastructure, and databases connected by DEPENDS_ON, HOSTS, and
// CONNECTS_TO relationships. Demonstrates the node/edge/property data model with
// filtering, neighbor highlighting, multi-hop traversal, critical-path and impact
// analysis. Graph data is inlined so it renders from file:// and inside an iframe.

const graphData = {
  metadata: { title: "Graph Data Model", lastUpdated: "2026-06-19" },
  nodes: [
    { id: "customer-portal", label: "Customer Portal", type: "BusinessService",
      x: 0, y: -320, props: { owner: "Digital Team", sla_tier: "Tier-1" } },
    { id: "web-app", label: "Web App", type: "Application",
      x: -260, y: -90, props: { version: "2.1", language: "Python" } },
    { id: "api-gateway", label: "API Gateway", type: "Application",
      x: 280, y: -90, props: { version: "1.4", language: "Go" } },
    { id: "vm-web-01", label: "VM-Web-01", type: "Infrastructure",
      x: -480, y: 170, props: { type: "virtual", region: "us-east-1", cores: 8 } },
    { id: "customer-db", label: "Customer DB", type: "Database",
      x: -250, y: 220, props: { type: "PostgreSQL", size_gb: 250 } },
    { id: "cache-01", label: "Cache-01", type: "Infrastructure",
      x: 20, y: 170, props: { type: "redis", region: "us-east-1", cores: 2 } },
    { id: "vm-api-01", label: "VM-API-01", type: "Infrastructure",
      x: 500, y: 170, props: { type: "virtual", region: "us-east-1", cores: 4 } },
    { id: "auth-db", label: "Auth DB", type: "Database",
      x: 270, y: 220, props: { type: "PostgreSQL", size_gb: 80 } }
  ],
  edges: [
    { from: "customer-portal", to: "web-app", type: "DEPENDS_ON", props: { criticality: "critical" } },
    { from: "customer-portal", to: "api-gateway", type: "DEPENDS_ON", props: { criticality: "high" } },
    { from: "web-app", to: "customer-db", type: "DEPENDS_ON", props: { criticality: "critical" } },
    { from: "api-gateway", to: "auth-db", type: "DEPENDS_ON", props: { criticality: "high" } },
    { from: "vm-web-01", to: "web-app", type: "HOSTS", props: { deployment_date: "2024-02-10" } },
    { from: "vm-api-01", to: "api-gateway", type: "HOSTS", props: { deployment_date: "2024-03-01" } },
    { from: "web-app", to: "customer-db", type: "CONNECTS_TO", props: { port: 5432, protocol: "tcp" } },
    { from: "web-app", to: "cache-01", type: "CONNECTS_TO", props: { port: 6379, protocol: "tcp" } },
    { from: "api-gateway", to: "auth-db", type: "CONNECTS_TO", props: { port: 5432, protocol: "tcp" } },
    { from: "vm-web-01", to: "vm-api-01", type: "CONNECTS_TO", props: { port: 443, protocol: "https" } }
  ]
};

// Node-type styling: shape + color
const TYPE_STYLE = {
  BusinessService: { shape: "hexagon", bg: "#1e88e5", bd: "#0d47a1", font: "#fff" },
  Application:     { shape: "box",     bg: "#43a047", bd: "#1b5e20", font: "#fff" },
  Infrastructure:  { shape: "diamond", bg: "#90a4ae", bd: "#455a64", font: "#fff" },
  Database:        { shape: "database",bg: "#fb8c00", bd: "#e65100", font: "#fff" }
};

const EDGE_STYLE = {
  DEPENDS_ON:  { color: "#e53935", dashes: false },
  HOSTS:       { color: "#1e88e5", dashes: [8, 6] },
  CONNECTS_TO: { color: "#43a047", dashes: [2, 4] }
};

const CRIT_WIDTH = { critical: 5, high: 3.5, medium: 2.5, low: 1.5 };

let network, nodes, edges;
let impactMode = false;
let criticalActive = false;

function degree(id) {
  return graphData.edges.filter(e => e.from === id || e.to === id).length;
}

function isInIframe() {
  try { return window.self !== window.top; } catch (e) { return true; }
}

function buildNodes() {
  return graphData.nodes.map(n => {
    const s = TYPE_STYLE[n.type];
    const deg = degree(n.id);
    return {
      id: n.id,
      label: n.label,
      x: n.x,
      y: n.y,
      shape: s.shape,
      color: { background: s.bg, border: s.bd,
               highlight: { background: s.bg, border: "#ffca28" } },
      font: { color: s.font, size: 15, face: "Arial" },
      borderWidth: 2,
      size: 18 + deg * 2,          // degree centrality -> node size (capped spread)
      margin: 10,
      widthConstraint: { maximum: 130 },
      _type: n.type,
      _props: n.props
    };
  });
}

function buildEdges() {
  return graphData.edges.map((e, i) => {
    const s = EDGE_STYLE[e.type];
    const crit = e.props && e.props.criticality;
    return {
      id: "e" + i,
      from: e.from, to: e.to,
      color: { color: s.color, highlight: "#ffca28" },
      dashes: s.dashes,
      width: crit ? CRIT_WIDTH[crit] : 2,
      arrows: { to: { enabled: true, scaleFactor: 0.9 } },
      smooth: { type: "curvedCW", roundness: 0.12 },
      _type: e.type,
      _props: e.props
    };
  });
}

function initNetwork() {
  nodes = new vis.DataSet(buildNodes());
  edges = new vis.DataSet(buildEdges());
  const enableMouse = !isInIframe();
  const options = {
    layout: { improvedLayout: false },
    physics: { enabled: false },
    interaction: {
      hover: true,
      selectConnectedEdges: false,
      dragNodes: true,
      dragView: enableMouse,
      zoomView: enableMouse,
      navigationButtons: true,
      keyboard: { enabled: false }
    }
  };
  const container = document.getElementById("network");
  network = new vis.Network(container, { nodes, edges }, options);

  network.once("afterDrawing", () => {
    // Fixed, moderate framing so the whole 8-node graph is visible without the
    // over-zoom that network.fit() produces on small graphs.
    network.moveTo({ position: { x: 10, y: 10 }, scale: 0.44, animation: false });
  });

  network.on("hoverNode", params => showNodeInfo(params.node));
  network.on("click", onClick);
  network.on("doubleClick", onDoubleClick);
  network.on("selectEdge", params => {
    if (params.edges.length) showEdgeInfo(params.edges[0]);
  });
}

function showNodeInfo(id) {
  const n = graphData.nodes.find(x => x.id === id);
  if (!n) return;
  const props = Object.entries(n.props)
    .map(([k, v]) => `<span class="prop"><b>${k}:</b> ${v}</span>`).join("");
  setInfo(`${n.label} <em>(${n.type})</em>`, props || "No properties");
}

function showEdgeInfo(eid) {
  const idx = parseInt(eid.replace("e", ""), 10);
  const e = graphData.edges[idx];
  if (!e) return;
  const props = Object.entries(e.props || {})
    .map(([k, v]) => `<span class="prop"><b>${k}:</b> ${v}</span>`).join("");
  setInfo(`${e.from} -[${e.type}]-> ${e.to}`, props || "No properties");
}

function setInfo(title, body) {
  document.getElementById("info-body").innerHTML =
    `<div style="font-weight:bold;margin-bottom:4px">${title}</div>${body}`;
}

// Highlight a set of node ids (and edges between them). Others dim.
function highlight(idSet, edgeIds) {
  nodes.forEach(node => {
    const on = idSet.has(node.id);
    nodes.update({ id: node.id, opacity: on ? 1 : 0.18,
      font: { color: on ? TYPE_STYLE[node._type].font : "#bbb", size: 15 } });
  });
  edges.forEach(edge => {
    const on = edgeIds ? edgeIds.has(edge.id) : true;
    edges.update({ id: edge.id, color: { opacity: on ? 1 : 0.12 } });
  });
}

function clearHighlight() {
  criticalActive = false;
  document.getElementById("critical-btn").classList.remove("active");
  nodes.forEach(node => nodes.update({ id: node.id, opacity: 1,
    font: { color: TYPE_STYLE[node._type].font, size: 15 } }));
  edges.forEach(edge => edges.update({ id: edge.id, color: { opacity: 1 } }));
}

// Neighbors (immediate) of a node
function neighbors(id) {
  const ns = new Set([id]);
  const es = new Set();
  edges.forEach(e => {
    if (e.from === id || e.to === id) {
      ns.add(e.from); ns.add(e.to); es.add(e.id);
    }
  });
  return { ns, es };
}

// Downstream BFS up to depth (following DEPENDS_ON / CONNECTS_TO outward)
function downstream(id, depth) {
  const ns = new Set([id]);
  const es = new Set();
  let frontier = [id];
  for (let d = 0; d < depth; d++) {
    const next = [];
    edges.forEach(e => {
      if (frontier.includes(e.from) && !ns.has(e.to)) {
        ns.add(e.to); next.push(e.to); es.add(e.id);
      } else if (frontier.includes(e.from)) {
        es.add(e.id);
      }
    });
    frontier = next;
    if (!frontier.length) break;
  }
  return { ns, es };
}

function onClick(params) {
  if (params.nodes.length) {
    const id = params.nodes[0];
    if (impactMode) {
      const depth = parseInt(document.getElementById("depth").value, 10);
      const { ns, es } = downstream(id, depth);
      highlight(ns, es);
      const n = graphData.nodes.find(x => x.id === id);
      setInfo(`Impact of ${n.label}`,
        `<span class="prop">${ns.size - 1} downstream node(s) affected within ${depth} hop(s).</span>`);
    } else {
      const { ns, es } = neighbors(id);
      highlight(ns, es);
      showNodeInfo(id);
    }
  } else if (!params.edges.length) {
    clearHighlight();
  }
}

function onDoubleClick(params) {
  if (params.nodes.length) {
    const id = params.nodes[0];
    const depth = parseInt(document.getElementById("depth").value, 10);
    const { ns, es } = downstream(id, Math.max(depth, 3));
    highlight(ns, es);
    const n = graphData.nodes.find(x => x.id === id);
    setInfo(`Dependency tree: ${n.label}`,
      `<span class="prop">${ns.size - 1} reachable node(s).</span>`);
  }
}

function showCriticalPath() {
  criticalActive = !criticalActive;
  const btn = document.getElementById("critical-btn");
  if (!criticalActive) { clearHighlight(); return; }
  btn.classList.add("active");
  const es = new Set(), ns = new Set();
  graphData.edges.forEach((e, i) => {
    if (e.props && e.props.criticality === "critical") {
      es.add("e" + i); ns.add(e.from); ns.add(e.to);
    }
  });
  highlight(ns, es);
  setInfo("Critical Path", `<span class="prop">All <b>critical</b> DEPENDS_ON edges are highlighted.</span>`);
}

function applyFilters() {
  const checked = new Set(
    Array.from(document.querySelectorAll(".type-filter:checked")).map(c => c.value));
  graphData.nodes.forEach(n => {
    nodes.update({ id: n.id, hidden: !checked.has(n.type) });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNetwork();

  document.querySelectorAll(".type-filter").forEach(cb =>
    cb.addEventListener("change", applyFilters));

  const depth = document.getElementById("depth");
  depth.addEventListener("input", () => {
    document.getElementById("depth-val").textContent = depth.value;
  });

  document.getElementById("critical-btn").addEventListener("click", showCriticalPath);

  document.getElementById("impact-btn").addEventListener("click", () => {
    impactMode = !impactMode;
    const btn = document.getElementById("impact-btn");
    btn.classList.toggle("active", impactMode);
    setInfo("Impact Analysis " + (impactMode ? "ON" : "OFF"),
      impactMode
        ? `<span class="prop">Click any node to highlight everything downstream within the traversal depth.</span>`
        : `<span class="prop">Back to normal mode. Click a node to see its neighbors.</span>`);
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    impactMode = false;
    document.getElementById("impact-btn").classList.remove("active");
    document.querySelectorAll(".type-filter").forEach(c => { c.checked = true; });
    applyFilters();
    clearHighlight();
    network.moveTo({ position: { x: 10, y: 10 }, scale: 0.44, animation: true });
  });
});
