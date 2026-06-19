// Dimensionality Reduction Visualization - p5.js MicroSim
// CANVAS_HEIGHT: 560
// Learning objective: show how high-dimensional word embeddings can be projected
// to 2D while preserving relative distances. Students compare PCA, t-SNE, and
// UMAP layouts of the same 30 words, colored by semantic category.

// ----- Canvas layout (standard MicroSim pattern: draw area on top, controls below) -----
let canvasWidth = 700;
let drawHeight = 470;
let controlHeight = 90;        // 2 rows of controls (35 each) + padding
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// ----- Controls -----
let methodSelect, dimsSlider, connectCheckbox, colorCheckbox, randomizeButton;

// ----- Data -----
// Four semantic categories. Each method has a hand-authored 2D layout (values in
// 0..1 unit space) that clusters categories sensibly, with method-specific spread
// so the difference between PCA / t-SNE / UMAP is visible.
const categories = {
    animals:    { color: '#2e7d32', label: 'Animals' },
    countries:  { color: '#1565c0', label: 'Countries' },
    verbs:      { color: '#e65100', label: 'Verbs' },
    adjectives: { color: '#6a1b9a', label: 'Adjectives' }
};

// Words with a per-category index used to synthesize layouts.
const words = [
    // animals
    { w: 'cat', c: 'animals' }, { w: 'dog', c: 'animals' }, { w: 'horse', c: 'animals' },
    { w: 'lion', c: 'animals' }, { w: 'tiger', c: 'animals' }, { w: 'wolf', c: 'animals' },
    { w: 'rabbit', c: 'animals' }, { w: 'mouse', c: 'animals' },
    // countries
    { w: 'France', c: 'countries' }, { w: 'Japan', c: 'countries' }, { w: 'Brazil', c: 'countries' },
    { w: 'Egypt', c: 'countries' }, { w: 'Canada', c: 'countries' }, { w: 'India', c: 'countries' },
    { w: 'Kenya', c: 'countries' },
    // verbs
    { w: 'run', c: 'verbs' }, { w: 'jump', c: 'verbs' }, { w: 'walk', c: 'verbs' },
    { w: 'swim', c: 'verbs' }, { w: 'write', c: 'verbs' }, { w: 'read', c: 'verbs' },
    { w: 'sing', c: 'verbs' },
    // adjectives
    { w: 'happy', c: 'adjectives' }, { w: 'sad', c: 'adjectives' }, { w: 'bright', c: 'adjectives' },
    { w: 'dark', c: 'adjectives' }, { w: 'fast', c: 'adjectives' }, { w: 'slow', c: 'adjectives' },
    { w: 'warm', c: 'adjectives' }, { w: 'cold', c: 'adjectives' }
];

// Cluster centers (unit space) per category, distinct per method.
const clusterCenters = {
    pca:  { animals: [0.25, 0.30], countries: [0.72, 0.25], verbs: [0.28, 0.74], adjectives: [0.74, 0.74] },
    tsne: { animals: [0.20, 0.22], countries: [0.80, 0.20], verbs: [0.22, 0.80], adjectives: [0.78, 0.78] },
    umap: { animals: [0.30, 0.35], countries: [0.70, 0.30], verbs: [0.32, 0.70], adjectives: [0.68, 0.70] }
};

// Per-method cluster spread (t-SNE makes tight clusters, PCA looser, UMAP medium).
const clusterSpread = { pca: 0.16, tsne: 0.085, umap: 0.12 };

// Quality metric label per method (illustrative).
const methodMetric = {
    pca:  'Variance explained: 62%',
    tsne: 'KL stress (perplexity 30): 0.18',
    umap: 'Neighbor preservation: 0.91'
};

let layouts = {};          // method -> array of {x, y} in unit space
let displayPos = [];       // current animated screen positions
let targetPos = [];        // target screen positions
let hoverIndex = -1;
let selectedIndex = -1;
let seed = 42;

// Simple seeded RNG so "Randomize word set" is reproducible per click.
function rng() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
}

function buildLayouts() {
    layouts = {};
    for (const method of ['pca', 'tsne', 'umap']) {
        const spread = clusterSpread[method];
        const centers = clusterCenters[method];
        layouts[method] = words.map((item) => {
            const ctr = centers[item.c];
            // Deterministic jitter from a hash of word + method + seed.
            let h = seed;
            const key = item.w + method;
            for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) & 0x7fffffff;
            const jx = ((h % 1000) / 1000 - 0.5) * 2 * spread;
            const jy = (((h >> 7) % 1000) / 1000 - 0.5) * 2 * spread;
            return { x: ctr[0] + jx, y: ctr[1] + jy };
        });
    }
}

function unitToScreen(u) {
    const plotX = margin + 50;
    const plotY = margin + 30;
    const plotW = canvasWidth - plotX - margin - 150; // leave room for legend on right
    const plotH = drawHeight - plotY - margin - 10;
    return { x: plotX + u.x * plotW, y: plotY + u.y * plotH };
}

function setTargets() {
    const method = methodSelect.value();
    targetPos = layouts[method].map(unitToScreen);
    if (displayPos.length === 0) {
        displayPos = targetPos.map(p => ({ x: p.x, y: p.y }));
    }
}

function nearestNeighbors(idx, k) {
    const here = displayPos[idx];
    const dists = displayPos.map((p, i) => ({ i, d: dist(here.x, here.y, p.x, p.y) }));
    dists.sort((a, b) => a.d - b.d);
    return dists.slice(1, k + 1).map(o => o.i);
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    buildLayouts();

    // Row 1: method dropdown + dims slider
    methodSelect = createSelect();
    methodSelect.option('PCA', 'pca');
    methodSelect.option('t-SNE', 'tsne');
    methodSelect.option('UMAP', 'umap');
    methodSelect.selected('tsne');
    methodSelect.parent(document.querySelector('main'));
    methodSelect.position(70, drawHeight + 10);
    methodSelect.changed(() => { setTargets(); });

    dimsSlider = createSlider(0, 3, 2, 1); // index into [50,100,300,768]; default 300D
    dimsSlider.parent(document.querySelector('main'));

    // Row 2: checkboxes + button
    connectCheckbox = createCheckbox(' Connections', true);
    connectCheckbox.parent(document.querySelector('main'));
    connectCheckbox.position(10, drawHeight + 48);

    colorCheckbox = createCheckbox(' Color by category', true);
    colorCheckbox.parent(document.querySelector('main'));
    colorCheckbox.position(150, drawHeight + 48);

    randomizeButton = createButton('Randomize word set');
    randomizeButton.parent(document.querySelector('main'));
    randomizeButton.position(330, drawHeight + 48);
    randomizeButton.mousePressed(() => {
        seed = Math.floor(Math.random() * 1e9);
        buildLayouts();
        setTargets();
        selectedIndex = -1;
    });

    layoutControls();
    setTargets();
    displayPos = targetPos.map(p => ({ x: p.x, y: p.y }));

    describe('A 2D scatter plot of 30 word embeddings colored by category. ' +
        'Switch between PCA, t-SNE, and UMAP projections, toggle connection lines ' +
        'and category coloring, hover to highlight nearest neighbors, and click a ' +
        'word to inspect its high-dimensional vector.', LABEL);
}

function layoutControls() {
    const dimsLeft = 360;
    dimsSlider.position(dimsLeft, drawHeight + 12);
    dimsSlider.size(Math.max(80, canvasWidth - dimsLeft - margin));
}

function draw() {
    updateCanvasSize();

    // Drawing area
    noStroke();
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    // Control area
    noStroke();
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    drawAxes();

    // Title
    noStroke();
    fill('black');
    textSize(20);
    textAlign(CENTER, TOP);
    text('Projecting Word Embeddings to 2D', (canvasWidth - 150) / 2, 8);
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);

    // Animate positions toward target
    for (let i = 0; i < displayPos.length; i++) {
        displayPos[i].x += (targetPos[i].x - displayPos[i].x) * 0.15;
        displayPos[i].y += (targetPos[i].y - displayPos[i].y) * 0.15;
    }

    // Hover detection
    hoverIndex = -1;
    for (let i = 0; i < displayPos.length; i++) {
        if (dist(mouseX, mouseY, displayPos[i].x, displayPos[i].y) < 12 && mouseY < drawHeight) {
            hoverIndex = i;
            break;
        }
    }

    const neighbors = hoverIndex >= 0 ? nearestNeighbors(hoverIndex, 5) : [];

    // Connection lines
    if (connectCheckbox.checked()) {
        drawConnections(neighbors);
    }

    // Word points + labels
    drawWords(neighbors);

    drawLegend();
    drawMetrics();
    drawControlLabels();

    if (selectedIndex >= 0) drawVectorPopup();
}

function drawAxes() {
    const p0 = unitToScreen({ x: 0, y: 0 });
    const p1 = unitToScreen({ x: 1, y: 1 });
    stroke('#b0bec5');
    strokeWeight(1);
    line(p0.x, p1.y, p0.x, p0.y);   // left vertical
    line(p0.x, p1.y, p1.x, p1.y);   // bottom horizontal
    noStroke();
    fill('#546e7a');
    textSize(12);
    textAlign(CENTER, TOP);
    text('Dimension 1 (semantic feature space)', (p0.x + p1.x) / 2, p1.y + 6);
    push();
    translate(p0.x - 28, (p0.y + p1.y) / 2);
    rotate(-HALF_PI);
    text('Dimension 2 (semantic feature space)', 0, 0);
    pop();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawConnections(neighbors) {
    const method = methodSelect.value();
    for (let i = 0; i < displayPos.length; i++) {
        const nbrs = nearestNeighbors(i, 2);
        for (const j of nbrs) {
            if (j <= i) continue;
            const d = dist(displayPos[i].x, displayPos[i].y, displayPos[j].x, displayPos[j].y);
            const alpha = map(constrain(d, 20, 200), 20, 200, 90, 8);
            const highlight = neighbors.includes(i) || neighbors.includes(j) ||
                i === hoverIndex || j === hoverIndex;
            stroke(highlight ? color(229, 57, 53, 200) : color(120, 120, 120, alpha));
            strokeWeight(highlight ? 2 : 1);
            line(displayPos[i].x, displayPos[i].y, displayPos[j].x, displayPos[j].y);
        }
    }
}

function drawWords(neighbors) {
    textSize(13);
    textAlign(LEFT, CENTER);
    for (let i = 0; i < displayPos.length; i++) {
        const item = words[i];
        const p = displayPos[i];
        const isHover = i === hoverIndex;
        const isNeighbor = neighbors.includes(i);
        const isSelected = i === selectedIndex;

        let c;
        if (colorCheckbox.checked()) {
            c = color(categories[item.c].color);
        } else {
            c = color('#5c6bc0');
        }
        if (hoverIndex >= 0 && !isHover && !isNeighbor) {
            c.setAlpha(70);
        }

        noStroke();
        fill(c);
        const r = isHover ? 9 : (isNeighbor ? 8 : 6);
        ellipse(p.x, p.y, r, r);
        if (isSelected) {
            noFill();
            stroke('#e53935');
            strokeWeight(2);
            ellipse(p.x, p.y, r + 8, r + 8);
        }

        noStroke();
        fill(isHover || isNeighbor || hoverIndex < 0 ? color(33, 33, 33) : color(120, 120, 120));
        if (isHover) { textStyle(BOLD); } else { textStyle(NORMAL); }
        text(item.w, p.x + 8, p.y);
    }
    textStyle(NORMAL);
    textSize(defaultTextSize);
}

function drawLegend() {
    const lx = canvasWidth - 140;
    let ly = margin + 30;
    noStroke();
    fill('white');
    stroke('#cfd8dc');
    rect(lx - 8, ly - 8, 130, 110, 6);
    noStroke();
    fill('#37474f');
    textSize(13);
    textStyle(BOLD);
    text('Category', lx, ly + 4);
    textStyle(NORMAL);
    ly += 22;
    for (const key in categories) {
        fill(categories[key].color);
        ellipse(lx + 6, ly, 11, 11);
        noStroke();
        fill('#37474f');
        text(categories[key].label, lx + 18, ly);
        ly += 20;
    }
    textSize(defaultTextSize);
}

function drawMetrics() {
    const method = methodSelect.value();
    const dimsOptions = [50, 100, 300, 768];
    // Annotation panel in the upper-left of the plot (clear of axes and clusters).
    const bx = margin + 56, by = margin + 30, bw = 220, bh = 46;
    fill(255, 255, 255, 235);
    stroke('#cfd8dc');
    strokeWeight(1);
    rect(bx, by, bw, bh, 6);
    noStroke();
    fill('#455a64');
    textSize(12);
    textAlign(LEFT, TOP);
    text('Projecting ' + dimsOptions[dimsSlider.value()] + 'D embeddings to 2D', bx + 8, by + 8);
    text(methodMetric[method], bx + 8, by + 26);
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawControlLabels() {
    const dimsOptions = [50, 100, 300, 768];
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Method:', 10, drawHeight + 22);
    text('Original dims: ' + dimsOptions[dimsSlider.value()] + 'D', 230, drawHeight + 22);
    textSize(defaultTextSize);
}

function drawVectorPopup() {
    const item = words[selectedIndex];
    // Synthesize a short pseudo-vector for the selected word.
    let h = 0;
    for (let i = 0; i < item.w.length; i++) h = (h * 31 + item.w.charCodeAt(i)) & 0x7fffffff;
    const vals = [];
    for (let i = 0; i < 6; i++) {
        h = (h * 1103515245 + 12345) & 0x7fffffff;
        vals.push(((h % 2000) / 1000 - 1).toFixed(2));
    }
    const boxW = 230, boxH = 96;
    let bx = displayPos[selectedIndex].x + 14;
    let by = displayPos[selectedIndex].y + 14;
    if (bx + boxW > canvasWidth - margin) bx = displayPos[selectedIndex].x - boxW - 14;
    if (by + boxH > drawHeight - 5) by = drawHeight - boxH - 5;

    fill(255, 255, 255, 245);
    stroke('#90a4ae');
    strokeWeight(1);
    rect(bx, by, boxW, boxH, 8);
    noStroke();
    fill('#1a3a6c');
    textSize(14);
    textStyle(BOLD);
    text('"' + item.w + '"  (' + categories[item.c].label + ')', bx + 10, by + 14);
    textStyle(NORMAL);
    fill('#37474f');
    textSize(12);
    text('First 6 of 300 dimensions:', bx + 10, by + 36);
    text('[' + vals.join(', ') + ', ...]', bx + 10, by + 56);
    text('(click empty space to close)', bx + 10, by + 78);
    textSize(defaultTextSize);
}

function mousePressed() {
    if (mouseY > drawHeight) return;
    let clicked = -1;
    for (let i = 0; i < displayPos.length; i++) {
        if (dist(mouseX, mouseY, displayPos[i].x, displayPos[i].y) < 12) { clicked = i; break; }
    }
    selectedIndex = clicked;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    layoutControls();
    setTargets();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(560, container.offsetWidth);
    }
}
