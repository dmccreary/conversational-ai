// Knowledge Source Categories
// CANVAS_HEIGHT: 640
// Renders a clean SVG diagram contrasting External (public) and Internal (private)
// knowledge sources, with a central RAG System that retrieves from both based on
// user permissions. Built as inline SVG so it scales responsively in an iframe.

const W = 900, H = 640;

// Color palette
const GREEN = "#43a047", GREEN_D = "#1b5e20", GREEN_L = "#e8f5e9";
const BLUE  = "#1e88e5", BLUE_D  = "#0d47a1", BLUE_L  = "#e3f2fd";
const PURPLE = "#8e24aa", PURPLE_D = "#4a148c";
const GRAY = "#eceff1", GRAY_BD = "#90a4ae", TEXT = "#263238";

// Helper builders -----------------------------------------------------------
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function sourceCard(x, y, w, h, glyph, label) {
  return `
    <g class="src-box">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"
            fill="${GRAY}" stroke="${GRAY_BD}" stroke-width="1.5"/>
      <text x="${x + w/2}" y="${y + 26}" text-anchor="middle"
            font-size="22">${glyph}</text>
      <text x="${x + w/2}" y="${y + h - 12}" text-anchor="middle"
            font-size="12.5" fill="${TEXT}">${esc(label)}</text>
    </g>`;
}

function domainColumn(opts) {
  const { x, w, fill, light, stroke, title, subtitle, sources } = opts;
  const top = 150, dh = 360;
  let cards = "";
  const cw = (w - 60) / 2, ch = 78, gapx = 20, gapy = 18;
  const startX = x + 20, startY = top + 92;
  sources.forEach((s, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const cx = startX + col * (cw + gapx);
    const cy = startY + row * (ch + gapy);
    cards += sourceCard(cx, cy, cw, ch, s.glyph, s.label);
  });
  return `
    <g>
      <rect x="${x}" y="${top}" width="${w}" height="${dh}" rx="14"
            fill="${light}" stroke="${stroke}" stroke-width="2.5"/>
      <text x="${x + w/2}" y="${top + 34}" text-anchor="middle"
            font-size="20" font-weight="bold" fill="${stroke}">${esc(title)}</text>
      <text x="${x + w/2}" y="${top + 58}" text-anchor="middle"
            font-size="13" fill="${TEXT}">${esc(subtitle)}</text>
      <rect x="${x + w/2 - 130}" y="${top + 70}" width="260" height="0"
            fill="${fill}"/>
      ${cards}
    </g>`;
}

// External and Internal source lists ---------------------------------------
const external = [
  { glyph: "📖", label: "Wikipedia" },
  { glyph: "📄", label: "ArXiv" },
  { glyph: "📰", label: "News" },
  { glyph: "💬", label: "Stack Overflow" }
];
const internal = [
  { glyph: "🏢", label: "Company Wiki" },
  { glyph: "🗄️", label: "Database" },
  { glyph: "✉️", label: "Email" },
  { glyph: "📁", label: "File Share" }
];

// Layout coordinates
const colW = 300;
const leftX = 20;
const rightX = W - colW - 20;
const ragCx = W / 2, ragCy = 80, ragW = 220, ragH = 78;

const svg = `
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Knowledge source categories diagram">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3"
            orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L8,3 L0,6 Z" fill="${PURPLE_D}"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="${W/2}" y="34" text-anchor="middle" font-size="22" font-weight="bold"
        fill="#1a3a6c">Knowledge Source Categories</text>

  <!-- Dashed boundary separating external / internal -->
  <line x1="${W/2}" y1="135" x2="${W/2}" y2="${H - 80}"
        stroke="#9e9e9e" stroke-width="2" stroke-dasharray="8 6"/>

  <!-- Domain columns -->
  ${domainColumn({ x: leftX, w: colW, fill: GREEN, light: GREEN_L, stroke: GREEN,
    title: "External Knowledge", subtitle: "Anyone can access", sources: external })}
  ${domainColumn({ x: rightX, w: colW, fill: BLUE, light: BLUE_L, stroke: BLUE,
    title: "Internal Knowledge", subtitle: "Organization-specific", sources: internal })}

  <!-- Domain inner box labels: "Public Knowledge Bases" / "Private Documents" -->
  <text x="${leftX + colW/2}" y="${150 + 80}" text-anchor="middle"
        font-size="13" font-weight="bold" fill="${GREEN_D}">Public Knowledge Bases</text>
  <text x="${rightX + colW/2}" y="${150 + 80}" text-anchor="middle"
        font-size="13" font-weight="bold" fill="${BLUE_D}">Private Documents</text>

  <!-- RAG System (center top) -->
  <rect x="${ragCx - ragW/2}" y="${ragCy - ragH/2}" width="${ragW}" height="${ragH}"
        rx="12" fill="${PURPLE}" stroke="${PURPLE_D}" stroke-width="2.5"/>
  <text x="${ragCx}" y="${ragCy - 6}" text-anchor="middle" font-size="19"
        font-weight="bold" fill="#fff">RAG System</text>
  <text x="${ragCx}" y="${ragCy + 16}" text-anchor="middle" font-size="11.5"
        fill="#f3e5f5">Retrieves based on user permissions</text>

  <!-- Bidirectional arrows from RAG System to both domains -->
  <path d="M ${ragCx - 70} ${ragCy + 30} C ${leftX + colW + 30} ${ragCy + 40},
           ${leftX + colW + 10} 130, ${leftX + colW/2} 148"
        fill="none" stroke="${PURPLE_D}" stroke-width="2.5" marker-end="url(#arrow)"/>
  <path d="M ${leftX + colW/2} 148 C ${leftX + colW + 30} 120,
           ${leftX + colW + 60} ${ragCy + 50}, ${ragCx - 72} ${ragCy + 34}"
        fill="none" stroke="${PURPLE_D}" stroke-width="2.5" marker-end="url(#arrow)" opacity="0.45"/>

  <path d="M ${ragCx + 70} ${ragCy + 30} C ${rightX - 30} ${ragCy + 40},
           ${rightX - 10} 130, ${rightX + colW/2} 148"
        fill="none" stroke="${PURPLE_D}" stroke-width="2.5" marker-end="url(#arrow)"/>
  <path d="M ${rightX + colW/2} 148 C ${rightX - 30} 120,
           ${rightX - 60} ${ragCy + 50}, ${ragCx + 72} ${ragCy + 34}"
        fill="none" stroke="${PURPLE_D}" stroke-width="2.5" marker-end="url(#arrow)" opacity="0.45"/>

  <!-- Access labels -->
  <text x="${leftX + colW/2}" y="120" text-anchor="middle" font-size="12"
        font-weight="bold" fill="${GREEN_D}">Publicly Accessible</text>
  <text x="${rightX + colW/2}" y="120" text-anchor="middle" font-size="12"
        font-weight="bold" fill="${BLUE_D}">Access Restricted</text>

  <!-- Authentication footer labels -->
  <g>
    <rect x="${leftX}" y="${H - 64}" width="${colW}" height="46" rx="8"
          fill="#fff" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="${leftX + colW/2}" y="${H - 42}" text-anchor="middle" font-size="12.5"
          font-weight="bold" fill="${GREEN_D}">No Authentication Required</text>
    <text x="${leftX + colW/2}" y="${H - 26}" text-anchor="middle" font-size="10.5"
          fill="${TEXT}">Open web data</text>
  </g>
  <g>
    <rect x="${rightX}" y="${H - 64}" width="${colW}" height="46" rx="8"
          fill="#fff" stroke="${BLUE}" stroke-width="1.5"/>
    <text x="${rightX + colW/2}" y="${H - 42}" text-anchor="middle" font-size="12.5"
          font-weight="bold" fill="${BLUE_D}">Authentication + Authorization</text>
    <text x="${rightX + colW/2}" y="${H - 26}" text-anchor="middle" font-size="10.5"
          fill="${TEXT}">Required per user</text>
  </g>

  <!-- Center caption -->
  <text x="${W/2}" y="${H - 38}" text-anchor="middle" font-size="11" fill="#616161"
        transform="rotate(0)">RAG retrieves</text>
  <text x="${W/2}" y="${H - 24}" text-anchor="middle" font-size="11" fill="#616161">from both</text>
</svg>`;

document.getElementById("wrap").innerHTML = svg;
