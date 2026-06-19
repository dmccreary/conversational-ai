// Vector Index Comparison - p5.js MicroSim
// CANVAS_HEIGHT: 710
// Three side-by-side conceptual 2D scatter panels showing how Flat (brute force),
// IVF (clustered), and HNSW (multi-layer graph) indexes organize vectors for
// search. A red star marks the query; blue points are searched, gray are skipped.
// A comparison table (HTML, below the canvas) summarizes the trade-offs.

let canvasWidth = 820;
let drawHeight = 470;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;
let defaultTextSize = 16;

let showSkippedCheckbox;
let dataPoints = [];     // shared base point cloud (unit space 0..1) per panel
let clusterAssign = [];  // cluster index per point for IVF
let query = { x: 0.55, y: 0.5 };
let tableEl;

const NUM_POINTS = 90;
const NUM_CLUSTERS = 6;
const clusterColors = ['#bbdefb', '#c8e6c9', '#ffe0b2', '#f8bbd0', '#d1c4e9', '#b2dfdb'];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    showSkippedCheckbox = createCheckbox(' Show skipped vectors (gray)', true);
    showSkippedCheckbox.parent(document.querySelector('main'));
    showSkippedCheckbox.position(10, drawHeight + 14);

    generatePoints();
    buildTable();

    describe('Three conceptual scatter-plot panels comparing Flat, IVF, and HNSW ' +
        'vector indexes. The red star is the query vector. Flat compares the query ' +
        'to every vector; IVF only searches the nearest clusters; HNSW navigates a ' +
        'multi-layer graph. A comparison table below summarizes speed, accuracy, and memory.');
}

function generatePoints() {
    // Cluster centers for IVF visualization.
    const centers = [];
    for (let i = 0; i < NUM_CLUSTERS; i++) {
        centers.push({ x: 0.15 + Math.random() * 0.7, y: 0.15 + Math.random() * 0.7 });
    }
    dataPoints = [];
    clusterAssign = [];
    for (let i = 0; i < NUM_POINTS; i++) {
        const c = i % NUM_CLUSTERS;
        const ctr = centers[c];
        const p = {
            x: constrain(ctr.x + (Math.random() - 0.5) * 0.18, 0.03, 0.97),
            y: constrain(ctr.y + (Math.random() - 0.5) * 0.18, 0.03, 0.97)
        };
        dataPoints.push(p);
        clusterAssign.push(c);
    }
    dataPoints._centers = centers;
}

function panelRect(idx) {
    const gap = 10;
    const w = (canvasWidth - margin * 2 - gap * 2) / 3;
    const x = margin + idx * (w + gap);
    const y = 84;            // leave room for the main title + panel titles above
    const h = drawHeight - y - 62;
    return { x, y, w, h };
}

function toPanel(r, u) {
    return { x: r.x + 10 + u.x * (r.w - 20), y: r.y + 10 + u.y * (r.h - 20) };
}

function draw() {
    updateCanvasSize();

    noStroke();
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    noStroke();
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    noStroke();
    fill('black');
    textSize(20);
    textAlign(CENTER, TOP);
    text('How Vector Indexes Organize Data for Search', canvasWidth / 2, 10);
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);

    drawFlatPanel(panelRect(0));
    drawIVFPanel(panelRect(1));
    drawHNSWPanel(panelRect(2));

    drawLegend();
}

function panelFrame(r, title, subtitle, metrics) {
    noStroke();
    fill('white');
    stroke('#cfd8dc');
    strokeWeight(1);
    rect(r.x, r.y, r.w, r.h, 6);
    noStroke();
    fill('#1a3a6c');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(title, r.x + r.w / 2, r.y - 38);
    textStyle(NORMAL);
    fill('#546e7a');
    textSize(11);
    text(subtitle, r.x + r.w / 2, r.y - 21);
    // Metrics under panel
    fill('#37474f');
    textSize(11);
    text(metrics, r.x + r.w / 2, r.y + r.h + 6);
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawQueryStar(p) {
    push();
    translate(p.x, p.y);
    fill('#e53935');
    stroke('#b71c1c');
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < 10; i++) {
        const ang = -HALF_PI + i * TWO_PI / 10;
        const rad = (i % 2 === 0) ? 8 : 3.5;
        vertex(cos(ang) * rad, sin(ang) * rad);
    }
    endShape(CLOSE);
    pop();
}

function drawFlatPanel(r) {
    panelFrame(r, 'Flat Index (Brute Force)',
        'Compare query to every vector',
        'Search time: O(n)   Accuracy: 100%');
    const q = toPanel(r, query);
    // Arrows from query to ALL points
    stroke(120, 120, 120, 60);
    strokeWeight(0.6);
    for (const u of dataPoints) {
        const p = toPanel(r, u);
        line(q.x, q.y, p.x, p.y);
    }
    // All points searched (blue)
    noStroke();
    fill('#1565c0');
    for (const u of dataPoints) {
        const p = toPanel(r, u);
        ellipse(p.x, p.y, 6, 6);
    }
    drawQueryStar(q);
}

function drawIVFPanel(r) {
    panelFrame(r, 'IVF Index (Inverted File)',
        'Search nearest cluster(s) only',
        'Search time: O(k log n)   Accuracy: ~95%');
    const q = toPanel(r, query);
    const centers = dataPoints._centers;
    // Find 2 nearest cluster centers to the query.
    const cd = centers.map((c, i) => ({ i, d: dist(q.x, q.y, toPanel(r, c).x, toPanel(r, c).y) }));
    cd.sort((a, b) => a.d - b.d);
    const searched = [cd[0].i, cd[1].i];
    // Points
    for (let i = 0; i < dataPoints.length; i++) {
        const p = toPanel(r, dataPoints[i]);
        const c = clusterAssign[i];
        const inSearched = searched.includes(c);
        if (inSearched) {
            noStroke();
            fill('#1565c0');
            ellipse(p.x, p.y, 6, 6);
        } else if (showSkippedCheckbox.checked()) {
            noStroke();
            fill('#bdbdbd');
            ellipse(p.x, p.y, 5, 5);
        }
    }
    // Cluster centroids
    for (let i = 0; i < centers.length; i++) {
        const cp = toPanel(r, centers[i]);
        const inSearched = searched.includes(i);
        noStroke();
        fill(inSearched ? color('#0d47a1') : color(150, 150, 150, 160));
        ellipse(cp.x, cp.y, 12, 12);
        // arrows from query to searched centroids
        if (inSearched) {
            stroke('#e53935');
            strokeWeight(1.5);
            line(q.x, q.y, cp.x, cp.y);
        }
    }
    drawQueryStar(q);
}

function drawHNSWPanel(r) {
    panelFrame(r, 'HNSW Index (Graph)',
        'Navigate multi-layer graph',
        'Search time: O(log n)   Accuracy: ~98%');
    // Three layers stacked vertically inside the panel.
    const layers = [
        { y: 0.18, n: 4, color: '#90caf9', label: 'Layer 2 (sparse)' },
        { y: 0.50, n: 8, color: '#64b5f6', label: 'Layer 1' },
        { y: 0.82, n: 14, color: '#1565c0', label: 'Layer 0 (dense)' }
    ];
    const nodePos = [];
    for (let li = 0; li < layers.length; li++) {
        const ly = layers[li];
        const row = [];
        for (let i = 0; i < ly.n; i++) {
            const ux = (i + 1) / (ly.n + 1);
            const p = toPanel(r, { x: ux, y: ly.y });
            row.push(p);
        }
        nodePos.push(row);
    }
    // Intra-layer connections
    stroke('#90a4ae');
    strokeWeight(0.8);
    for (let li = 0; li < layers.length; li++) {
        const row = nodePos[li];
        for (let i = 0; i < row.length - 1; i++) {
            line(row[i].x, row[i].y, row[i + 1].x, row[i + 1].y);
        }
    }
    // Inter-layer links (entry point descends)
    stroke('#cfd8dc');
    strokeWeight(0.8);
    for (let li = 0; li < layers.length - 1; li++) {
        const a = nodePos[li];
        const b = nodePos[li + 1];
        for (let i = 0; i < a.length; i++) {
            const tgt = b[Math.min(Math.floor(i * b.length / a.length), b.length - 1)];
            line(a[i].x, a[i].y, tgt.x, tgt.y);
        }
    }
    // Search path (red): entry at top layer -> descend -> nearest in layer 0
    const path = [
        nodePos[0][0],
        nodePos[1][2],
        nodePos[2][6],
        nodePos[2][7]
    ];
    stroke('#e53935');
    strokeWeight(2.2);
    noFill();
    for (let i = 0; i < path.length - 1; i++) {
        line(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
    }
    // Nodes
    for (let li = 0; li < layers.length; li++) {
        noStroke();
        fill(layers[li].color);
        for (const p of nodePos[li]) ellipse(p.x, p.y, li === 2 ? 7 : 9, li === 2 ? 7 : 9);
        // layer label
        fill('#78909c');
        textSize(9);
        textAlign(LEFT, CENTER);
        text(layers[li].label, r.x + 6, toPanel(r, { x: 0, y: layers[li].y }).y);
    }
    // Mark query target with a star at the final path node.
    drawQueryStar(path[path.length - 1]);
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawLegend() {
    // Bottom-of-canvas legend strip inside control area top edge.
    const ly = drawHeight - 18;
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    let lx = margin + 4;
    // query star
    drawQueryStarSmall(lx + 4, ly);
    fill('#37474f'); text('Query', lx + 14, ly); lx += 60;
    fill('#1565c0'); ellipse(lx + 4, ly, 8, 8); noStroke(); fill('#37474f'); text('Searched', lx + 14, ly); lx += 78;
    fill('#bdbdbd'); ellipse(lx + 4, ly, 8, 8); noStroke(); fill('#37474f'); text('Skipped', lx + 14, ly); lx += 72;
    stroke('#e53935'); strokeWeight(2); line(lx, ly, lx + 16, ly); noStroke();
    fill('#37474f'); text('Search path', lx + 20, ly);
    textSize(defaultTextSize);
}

function drawQueryStarSmall(x, y) {
    push();
    translate(x, y);
    fill('#e53935');
    noStroke();
    beginShape();
    for (let i = 0; i < 10; i++) {
        const ang = -HALF_PI + i * TWO_PI / 10;
        const rad = (i % 2 === 0) ? 6 : 2.6;
        vertex(cos(ang) * rad, sin(ang) * rad);
    }
    endShape(CLOSE);
    pop();
}

function buildTable() {
    tableEl = createElement('div');
    tableEl.parent(document.querySelector('main'));
    tableEl.html(`
    <table class="cmp">
      <tr><th>Index Type</th><th>Search Speed</th><th>Accuracy</th><th>Memory</th><th>Build Time</th></tr>
      <tr><td>Flat</td><td>Slow (linear)</td><td>100%</td><td>Low</td><td>Instant</td></tr>
      <tr><td>IVF</td><td>Fast</td><td>~95%</td><td>Medium</td><td>Minutes</td></tr>
      <tr><td>HNSW</td><td>Very Fast</td><td>~98%</td><td>High</td><td>Hours</td></tr>
      <tr><td>PQ</td><td>Very Fast</td><td>~90%</td><td>Very Low</td><td>Minutes</td></tr>
    </table>`);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(680, container.offsetWidth);
    }
}
