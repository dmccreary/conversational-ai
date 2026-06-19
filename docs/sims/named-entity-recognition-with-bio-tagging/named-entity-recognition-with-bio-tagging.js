// CANVAS_HEIGHT: 532
// Named Entity Recognition with BIO Tagging - p5.js MicroSim
// Learning objective: Demonstrate how NER models label each token in a sequence
// with BIO tags to identify entity boundaries and types.
//
// BIO scheme:
//   B-XXX  = Beginning of an entity of type XXX
//   I-XXX  = Inside (continuation) of an entity of type XXX
//   O      = Outside any entity

// ---- Canvas layout constants ----
let canvasWidth = 900;          // initial width (responsive)
let drawHeight = 440;           // drawing area height
let controlHeight = 92;         // control area height (3 rows)
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// ---- Controls ----
let sentenceSelect;
let showBioCheckbox;
let showTypesCheckbox;
let highlightOnlyCheckbox;
let customInput;
let customButton;

// ---- Entity type colors (light backgrounds) ----
const ENTITY_COLORS = {
    'PERSON': '#cfe8ff',  // light blue
    'ORG':    '#ffe0b2',  // light orange
    'LOC':    '#c8e6c9',  // light green
    'DATE':   '#fff9c4',  // light yellow
    'MISC':   '#e1bee7',  // light purple
    'O':      '#ffffff'   // white
};
const ENTITY_BORDER = {
    'PERSON': '#1976d2',
    'ORG':    '#ef6c00',
    'LOC':    '#2e7d32',
    'DATE':   '#f9a825',
    'MISC':   '#7b1fa2',
    'O':      '#bdbdbd'
};

// ---- Pre-labeled example sentences ----
// Each token: [text, bioTag] where bioTag is "O", "B-TYPE", or "I-TYPE".
const EXAMPLES = [
    {
        label: '1. John Smith works at Apple in San Francisco',
        tokens: [
            ['John', 'B-PERSON'], ['Smith', 'I-PERSON'], ['works', 'O'], ['at', 'O'],
            ['Apple', 'B-ORG'], ['in', 'O'], ['San', 'B-LOC'], ['Francisco', 'I-LOC']
        ]
    },
    {
        label: '2. The meeting is scheduled for January 15th in New York',
        tokens: [
            ['The', 'O'], ['meeting', 'O'], ['is', 'O'], ['scheduled', 'O'], ['for', 'O'],
            ['January', 'B-DATE'], ['15th', 'I-DATE'], ['in', 'O'],
            ['New', 'B-LOC'], ['York', 'I-LOC']
        ]
    },
    {
        label: '3. Dr. Emily Johnson published research at MIT last year',
        tokens: [
            ['Dr.', 'O'], ['Emily', 'B-PERSON'], ['Johnson', 'I-PERSON'], ['published', 'O'],
            ['research', 'O'], ['at', 'O'], ['MIT', 'B-ORG'], ['last', 'B-DATE'], ['year', 'I-DATE']
        ]
    },
    {
        label: '4. Amazon launched new products in Europe and Asia',
        tokens: [
            ['Amazon', 'B-ORG'], ['launched', 'O'], ['new', 'O'], ['products', 'O'], ['in', 'O'],
            ['Europe', 'B-LOC'], ['and', 'O'], ['Asia', 'B-LOC']
        ]
    },
    {
        label: '5. The conference will be held on March 3rd, 2024',
        tokens: [
            ['The', 'O'], ['conference', 'O'], ['will', 'O'], ['be', 'O'], ['held', 'O'],
            ['on', 'O'], ['March', 'B-DATE'], ['3rd,', 'I-DATE'], ['2024', 'I-DATE']
        ]
    }
];

let currentTokens = EXAMPLES[0].tokens;   // active token list
let usingCustom = false;
let tokenBoxes = [];                       // computed layout rects for hover

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Row 1: example sentence dropdown
    sentenceSelect = createSelect();
    sentenceSelect.parent(document.querySelector('main'));
    for (let i = 0; i < EXAMPLES.length; i++) {
        sentenceSelect.option(EXAMPLES[i].label, i);
    }
    sentenceSelect.changed(onSelectChange);
    sentenceSelect.position(120, drawHeight + 8);

    // Row 2: toggles
    showBioCheckbox = createCheckbox('Show BIO tags', true);
    showBioCheckbox.parent(document.querySelector('main'));
    showBioCheckbox.position(10, drawHeight + 38);

    showTypesCheckbox = createCheckbox('Show entity types', true);
    showTypesCheckbox.parent(document.querySelector('main'));
    showTypesCheckbox.position(150, drawHeight + 38);

    highlightOnlyCheckbox = createCheckbox('Highlight entities only', false);
    highlightOnlyCheckbox.parent(document.querySelector('main'));
    highlightOnlyCheckbox.position(310, drawHeight + 38);

    // Row 3: custom sentence input + button
    customInput = createInput('Type your own sentence...');
    customInput.parent(document.querySelector('main'));
    customInput.position(10, drawHeight + 64);
    customInput.size(280);

    customButton = createButton('Tag Custom Sentence');
    customButton.parent(document.querySelector('main'));
    customButton.position(300, drawHeight + 64);
    customButton.mousePressed(onCustomTag);

    describe('Interactive named entity recognition visualization. Tokens from a ' +
        'sentence are shown in boxes color-coded by entity type and labeled with ' +
        'BIO tags. Users can pick example sentences, toggle tags and types, and ' +
        'run simple rule-based tagging on their own sentence.', LABEL);
}

function onSelectChange() {
    usingCustom = false;
    const idx = parseInt(sentenceSelect.value());
    currentTokens = EXAMPLES[idx].tokens;
}

// Simple rule-based NER for custom sentences:
// Consecutive capitalized words form a MISC entity (B- then I-); a 4-digit
// number or a month name is tagged DATE; everything else is O.
function onCustomTag() {
    const text = customInput.value().trim();
    if (!text) return;
    const months = ['january','february','march','april','may','june','july',
                    'august','september','october','november','december'];
    const words = text.split(/\s+/);
    const tagged = [];
    let prevWasCap = false;
    for (let w of words) {
        const clean = w.replace(/[^A-Za-z0-9']/g, '');
        let tag = 'O';
        if (/^\d{4}$/.test(clean) || months.indexOf(clean.toLowerCase()) !== -1) {
            tag = 'B-DATE';
            prevWasCap = false;
        } else if (/^[A-Z][a-z']*$/.test(clean) && clean.length > 1) {
            tag = prevWasCap ? 'I-MISC' : 'B-MISC';
            prevWasCap = true;
        } else {
            prevWasCap = false;
        }
        tagged.push([w, tag]);
    }
    currentTokens = tagged;
    usingCustom = true;
}

function entityTypeOf(tag) {
    if (tag === 'O') return 'O';
    return tag.split('-')[1];
}

function draw() {
    updateCanvasSize();

    // Drawing area background + border
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    // Control area background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    noStroke();
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    text('Named Entity Recognition with BIO Tagging', canvasWidth / 2, 12);

    // Subtitle / current sentence
    textSize(14);
    fill('#555');
    const sentence = currentTokens.map(t => t[0]).join(' ');
    text(usingCustom ? 'Custom: ' + sentence : sentence, canvasWidth / 2, 42);

    // Draw tokens
    drawTokens();

    // Legend
    drawLegend();

    // Control labels
    drawControlLabels();

    // Tooltip on hover
    drawTooltip();
}

function drawTokens() {
    tokenBoxes = [];
    const showBio = showBioCheckbox.checked();
    const showTypes = showTypesCheckbox.checked();
    const highlightOnly = highlightOnlyCheckbox.checked();

    const boxH = 56;
    const padX = 14;
    const gap = 10;
    const startY = 90;
    const maxRowWidth = canvasWidth - 2 * margin;

    // Pre-measure widths to support wrapping into multiple rows.
    textSize(18);
    textStyle(BOLD);
    let rows = [];
    let row = [];
    let rowW = 0;
    for (let i = 0; i < currentTokens.length; i++) {
        const tok = currentTokens[i][0];
        const w = Math.max(textWidth(tok) + padX * 2, 54);
        if (rowW + w + gap > maxRowWidth && row.length > 0) {
            rows.push({ items: row, width: rowW });
            row = [];
            rowW = 0;
        }
        row.push({ index: i, w: w });
        rowW += w + gap;
    }
    if (row.length > 0) rows.push({ items: row, width: rowW });

    let y = startY;
    for (let r of rows) {
        let x = (canvasWidth - (r.width - gap)) / 2; // center each row
        for (let item of r.items) {
            const i = item.index;
            const [tok, tag] = currentTokens[i];
            const type = entityTypeOf(tag);
            const isEntity = (type !== 'O');
            const boxW = item.w;

            // Background color
            let bg = ENTITY_COLORS[type] || '#ffffff';
            let border = ENTITY_BORDER[type] || '#bdbdbd';
            let alpha = 255;
            if (highlightOnly && !isEntity) alpha = 90; // fade O tokens

            push();
            if (highlightOnly && !isEntity) {
                drawingContext.globalAlpha = 0.35;
            }
            stroke(border);
            strokeWeight(isEntity ? 2 : 1);
            fill(bg);
            rect(x, y, boxW, boxH, 6);

            // Token text
            noStroke();
            fill('#212121');
            textSize(18);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text(tok, x + boxW / 2, y + (showBio || showTypes ? boxH * 0.34 : boxH / 2));

            // BIO tag (small, below token)
            if (showBio) {
                textSize(12);
                textStyle(NORMAL);
                fill(isEntity ? border : '#9e9e9e');
                text(tag, x + boxW / 2, y + boxH * 0.74);
            } else if (showTypes && isEntity) {
                textSize(12);
                textStyle(NORMAL);
                fill(border);
                text(type, x + boxW / 2, y + boxH * 0.74);
            }
            pop();

            // Bracket / arrow for I- continuation tokens linking to their B- token
            if (tag.startsWith('I-') && tokenBoxes.length > 0) {
                const prev = tokenBoxes[tokenBoxes.length - 1];
                if (prev && prev.y === y) {
                    stroke(border);
                    strokeWeight(2);
                    const ay = y - 6;
                    line(prev.x + prev.w / 2, ay, x + boxW / 2, ay);
                    // small down ticks
                    line(prev.x + prev.w / 2, ay, prev.x + prev.w / 2, ay + 6);
                    line(x + boxW / 2, ay, x + boxW / 2, ay + 6);
                    noStroke();
                }
            }

            tokenBoxes.push({ x: x, y: y, w: boxW, h: boxH, tok: tok, tag: tag, type: type });
            x += boxW + gap;
        }
        y += boxH + 36;
    }
    textStyle(NORMAL);
    textAlign(LEFT, CENTER);
}

function drawLegend() {
    const items = [
        ['PERSON', 'Person'],
        ['ORG', 'Organization'],
        ['LOC', 'Location'],
        ['DATE', 'Date'],
        ['MISC', 'Misc'],
        ['O', 'Outside (O)']
    ];
    const swatch = 16;
    const gap = 10;
    textSize(13);
    textStyle(NORMAL);
    // Measure total width to center
    let total = 0;
    const widths = items.map(it => {
        const w = swatch + 6 + textWidth(it[1]) + gap * 2;
        total += w;
        return w;
    });
    let x = (canvasWidth - total) / 2;
    const y = drawHeight - 34;
    for (let i = 0; i < items.length; i++) {
        const [type, name] = items[i];
        stroke(ENTITY_BORDER[type]);
        strokeWeight(1);
        fill(ENTITY_COLORS[type]);
        rect(x, y, swatch, swatch, 3);
        noStroke();
        fill('#333');
        textAlign(LEFT, CENTER);
        text(name, x + swatch + 6, y + swatch / 2);
        x += widths[i];
    }
}

function drawControlLabels() {
    noStroke();
    fill('black');
    textSize(14);
    textStyle(NORMAL);
    textAlign(LEFT, CENTER);
    text('Example:', 10, drawHeight + 18);
}

function drawTooltip() {
    if (mouseY < 0 || mouseY > drawHeight) return;
    for (let b of tokenBoxes) {
        if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
            const lines = [
                'Token: ' + b.tok,
                'BIO tag: ' + b.tag,
                'Entity: ' + (b.type === 'O' ? 'none (outside)' : b.type)
            ];
            textSize(13);
            textStyle(NORMAL);
            let tw = 0;
            for (let l of lines) tw = Math.max(tw, textWidth(l));
            const pad = 8;
            const boxW = tw + pad * 2;
            const boxH = lines.length * 18 + pad * 2;
            let tx = mouseX + 12;
            let ty = mouseY + 12;
            if (tx + boxW > canvasWidth) tx = canvasWidth - boxW - 4;
            if (ty + boxH > drawHeight) ty = mouseY - boxH - 8;
            stroke('#333');
            fill(255, 255, 255, 240);
            rect(tx, ty, boxW, boxH, 6);
            noStroke();
            fill('#212121');
            textAlign(LEFT, TOP);
            for (let i = 0; i < lines.length; i++) {
                text(lines[i], tx + pad, ty + pad + i * 18);
            }
            break;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    if (customInput) customInput.size(Math.min(280, canvasWidth - 220));
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
        if (canvasWidth < 360) canvasWidth = 360;
    }
}
