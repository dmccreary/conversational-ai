// AI Flywheel Visualization
// Interactive infographic of the self-reinforcing chatbot improvement cycle.
// CANVAS_HEIGHT: 560
// Four colored quadrants rotate clockwise; hover shows metrics, click shows a
// case study, and "Advance Time" speeds the flywheel to show momentum building.

(function () {
  'use strict';

  // ---- Geometry ----
  const VB = 640;            // SVG viewBox is square VB x VB
  const CX = VB / 2;
  const CY = VB / 2;
  const R_OUTER = 210;       // outer radius of the four quadrant ring
  const R_INNER = 100;       // inner radius (hub edge)
  const R_HUB = 92;          // rotating hub radius

  // ---- Quadrant definitions (clockwise from top) ----
  // angle ranges in degrees, 0 = up (12 o'clock), increasing clockwise
  const QUADS = [
    {
      id: 'usage',
      title: 'Increased Usage',
      start: -45, end: 45,
      fill: '#1e88e5', fillLight: '#90caf9',
      label: 'Increased\nUsage',
      metrics: [
        'Queries per day: 500 → 1,200 → 2,800',
        'Active users: +180%'
      ],
      caseStudy: 'A support bot launched to one team. As word spread, daily ' +
        'queries grew 5.6x in three quarters and active users climbed 180%.'
    },
    {
      id: 'feedback',
      title: 'More Feedback Data',
      start: 45, end: 135,
      fill: '#2e9e5b', fillLight: '#a5d6a7',
      label: 'More\nFeedback Data',
      metrics: [
        'Feedback events: 1,500 → 12,000',
        'Labeled examples per intent: 5 → 45'
      ],
      caseStudy: 'Thumbs up/down events grew 8x. Each intent went from a ' +
        'handful of labeled examples to dozens, enough to retrain reliably.'
    },
    {
      id: 'models',
      title: 'Better Models',
      start: 135, end: 225,
      fill: '#f57c00', fillLight: '#ffcc80',
      label: 'Better\nModels',
      metrics: [
        'Intent accuracy: 72% → 89% → 94%',
        'Response quality: 3.2 → 4.1 → 4.6 / 5'
      ],
      caseStudy: 'Retraining on the richer dataset lifted intent accuracy from ' +
        '72% to 94% and raised the average response-quality score to 4.6/5.'
    },
    {
      id: 'satisfaction',
      title: 'Higher Satisfaction',
      start: 225, end: 315,
      fill: '#7b3fb5', fillLight: '#ce93d8',
      label: 'Higher\nSatisfaction',
      metrics: [
        'Thumbs-up ratio: 58% → 73% → 84%',
        'Task completion: 61% → 79% → 88%'
      ],
      caseStudy: 'Better answers paid off: positive ratings rose to 84% and ' +
        'task completion to 88%, turning casual users into daily users.'
    }
  ];

  // Causal labels placed between quadrants (at the 4 corner directions)
  const CAUSAL = [
    { angle: 90,  text: 'More\ninteractions =\nmore data' },           // usage -> feedback
    { angle: 180, text: 'Larger datasets =\nhigher accuracy' },        // feedback -> models
    { angle: 270, text: 'Better\nresponses =\nhappier users' },        // models -> satisfaction
    { angle: 0,   text: 'Happy users =\nmore engagement' }             // satisfaction -> usage
  ];

  // Timeline stages controlling spin speed
  const STAGES = [
    { label: 'Month 1-3', speed: 0.15, note: 'Slow start — little data yet.' },
    { label: 'Month 4-6', speed: 0.45, note: 'Picking up — data compounding.' },
    { label: 'Month 7-9', speed: 0.95, note: 'Accelerating — the flywheel spins fast.' }
  ];

  let stageIdx = 0;
  let spinning = true;
  let angle = 0;          // current hub rotation in degrees
  let selectedId = null;

  const NS = 'http://www.w3.org/2000/svg';

  function deg2rad(d) { return (d - 90) * Math.PI / 180; } // 0 deg = up

  function polar(cx, cy, r, deg) {
    const a = deg2rad(deg);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }

  // Build an annular sector path (donut wedge) between two radii and angles
  function sectorPath(cx, cy, rOut, rIn, a0, a1) {
    const [x0o, y0o] = polar(cx, cy, rOut, a0);
    const [x1o, y1o] = polar(cx, cy, rOut, a1);
    const [x1i, y1i] = polar(cx, cy, rIn, a1);
    const [x0i, y0i] = polar(cx, cy, rIn, a0);
    const large = (a1 - a0) % 360 > 180 ? 1 : 0;
    return [
      'M', x0o, y0o,
      'A', rOut, rOut, 0, large, 1, x1o, y1o,
      'L', x1i, y1i,
      'A', rIn, rIn, 0, large, 0, x0i, y0i,
      'Z'
    ].join(' ');
  }

  function el(tag, attrs, text) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // multi-line text helper
  function multiText(parent, x, y, lines, attrs, lineHeight) {
    const t = el('text', Object.assign({ x: x, y: y }, attrs));
    lines.forEach((ln, i) => {
      const ts = el('tspan', { x: x, dy: i === 0 ? 0 : lineHeight }, ln);
      t.appendChild(ts);
    });
    parent.appendChild(t);
    return t;
  }

  let svg, hub, hubGroup;

  function buildSVG() {
    const col = document.getElementById('svgcol');
    svg = el('svg', { viewBox: '0 0 ' + VB + ' ' + VB, preserveAspectRatio: 'xMidYMid meet' });

    // gradient defs
    const defs = el('defs', {});
    QUADS.forEach(q => {
      const g = el('radialGradient', { id: 'grad-' + q.id, cx: '50%', cy: '50%', r: '75%' });
      g.appendChild(el('stop', { offset: '0%', 'stop-color': q.fillLight }));
      g.appendChild(el('stop', { offset: '100%', 'stop-color': q.fill }));
      defs.appendChild(g);
    });
    svg.appendChild(defs);

    // outer momentum ring (gold)
    svg.appendChild(el('circle', {
      cx: CX, cy: CY, r: R_OUTER + 14, fill: 'none',
      stroke: '#d4af37', 'stroke-width': 9, 'stroke-dasharray': '4 10', opacity: 0.6
    }));

    // four quadrant sectors
    QUADS.forEach(q => {
      const path = el('path', {
        d: sectorPath(CX, CY, R_OUTER, R_INNER, q.start, q.end),
        fill: 'url(#grad-' + q.id + ')',
        stroke: '#ffffff', 'stroke-width': 3,
        class: 'quad', 'data-id': q.id
      });
      path.addEventListener('mouseenter', () => showInfo(q, false));
      path.addEventListener('click', () => { selectQuad(q.id); showInfo(q, true); });
      svg.appendChild(path);

      // quadrant label at mid radius / mid angle
      const mid = (q.start + q.end) / 2;
      const [lx, ly] = polar(CX, CY, (R_OUTER + R_INNER) / 2, mid);
      multiText(svg, lx, ly - 6, q.label.split('\n'), {
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#ffffff', 'font-size': 19, 'font-weight': 'bold',
        'pointer-events': 'none', 'paint-order': 'stroke',
        stroke: 'rgba(0,0,0,0.25)', 'stroke-width': 0.6
      }, 21);
    });

    // causal relationship labels between quadrants
    CAUSAL.forEach(c => {
      const [cx, cy] = polar(CX, CY, R_OUTER + 50, c.angle);
      multiText(svg, cx, cy, c.text.split('\n'), {
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#5d4a00', 'font-size': 13, 'font-weight': 'bold',
        'pointer-events': 'none'
      }, 15);
    });

    // small clockwise arc-arrows showing flow direction along the ring
    CAUSAL.forEach(c => {
      const a0 = c.angle - 18, a1 = c.angle + 18;
      const [x0, y0] = polar(CX, CY, R_OUTER + 4, a0);
      const [x1, y1] = polar(CX, CY, R_OUTER + 4, a1);
      const arc = el('path', {
        d: 'M ' + x0 + ' ' + y0 + ' A ' + (R_OUTER + 6) + ' ' + (R_OUTER + 6) +
           ' 0 0 1 ' + x1 + ' ' + y1,
        fill: 'none', stroke: '#d4af37', 'stroke-width': 5,
        'marker-end': 'url(#arrowGold)'
      });
      svg.appendChild(arc);
    });

    // arrow marker
    const marker = el('marker', {
      id: 'arrowGold', markerWidth: 8, markerHeight: 8, refX: 4, refY: 4,
      orient: 'auto', markerUnits: 'strokeWidth'
    });
    marker.appendChild(el('path', { d: 'M0,0 L8,4 L0,8 Z', fill: '#d4af37' }));
    defs.appendChild(marker);

    // rotating hub group (center)
    hubGroup = el('g', {});
    hub = el('g', {}); // inner rotating element
    // hub disk
    hub.appendChild(el('circle', { cx: CX, cy: CY, r: R_HUB, fill: '#fff8e1', stroke: '#d4af37', 'stroke-width': 4 }));
    // rotating circular arrows inside hub
    const rArrow = R_HUB - 24;
    for (let k = 0; k < 2; k++) {
      const base = k * 180;
      const [ax, ay] = polar(CX, CY, rArrow, base - 70);
      const [bx, by] = polar(CX, CY, rArrow, base + 70);
      const ar = el('path', {
        d: 'M ' + ax + ' ' + ay + ' A ' + rArrow + ' ' + rArrow + ' 0 0 1 ' + bx + ' ' + by,
        fill: 'none', stroke: '#d4af37', 'stroke-width': 7, 'marker-end': 'url(#arrowGold)'
      });
      hub.appendChild(ar);
    }
    hubGroup.appendChild(hub);
    svg.appendChild(hubGroup);

    // static center text (does NOT rotate) drawn on top
    multiText(svg, CX, CY - 12,
      ['Continuous', 'Improvement', 'Cycle'],
      { 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#5d4a00', 'font-size': 17, 'font-weight': 'bold', 'pointer-events': 'none' },
      19);
    multiText(svg, CX, CY + 46, ['Each rotation', 'builds momentum'],
      { 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#7a6400', 'font-size': 11.5, 'pointer-events': 'none' }, 13);

    col.appendChild(svg);
  }

  function selectQuad(id) {
    selectedId = id;
    svg.querySelectorAll('.quad').forEach(p => {
      p.classList.toggle('quad-sel', p.getAttribute('data-id') === id);
    });
  }

  function showInfo(q, withCase) {
    document.getElementById('infoTitle').textContent = q.title;
    const body = document.getElementById('infoBody');
    let html = '<ul>';
    q.metrics.forEach(m => { html += '<li>' + m + '</li>'; });
    html += '</ul>';
    if (withCase) {
      html += '<div class="case">Case study: ' + q.caseStudy + '</div>';
    } else {
      html += '<div style="font-size:12px;color:#666;">Click the quadrant for a case study.</div>';
    }
    body.innerHTML = html;
  }

  // ---- Animation loop ----
  let lastT = 0;
  function tick(t) {
    if (!lastT) lastT = t;
    const dt = (t - lastT) / 1000;
    lastT = t;
    if (spinning) {
      angle += STAGES[stageIdx].speed * 90 * dt; // degrees/sec scaled by speed
      angle %= 360;
      hub.setAttribute('transform', 'rotate(' + angle + ' ' + CX + ' ' + CY + ')');
    }
    requestAnimationFrame(tick);
  }

  function updateStageLabel() {
    document.getElementById('monthLbl').textContent = STAGES[stageIdx].label;
  }

  function init() {
    buildSVG();
    updateStageLabel();

    document.getElementById('spinBtn').addEventListener('click', function () {
      spinning = !spinning;
      this.textContent = spinning ? 'Pause Spin' : 'Resume Spin';
    });
    document.getElementById('advBtn').addEventListener('click', function () {
      stageIdx = (stageIdx + 1) % STAGES.length;
      updateStageLabel();
      // briefly reflect the note in the info card when nothing selected
      if (!selectedId) {
        document.getElementById('infoTitle').textContent = STAGES[stageIdx].label;
        document.getElementById('infoBody').textContent = STAGES[stageIdx].note;
      }
    });

    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
