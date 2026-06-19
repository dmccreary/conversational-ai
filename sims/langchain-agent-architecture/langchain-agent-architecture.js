// CANVAS_HEIGHT: 660
// LangChain Agent Architecture - interactive p5.js MicroSim.
// Demonstrates how a LangChain agent dynamically selects and executes tools in a
// reasoning loop, in contrast with static intent-based routing. The agent steps
// through: receive query -> LLM reasons -> select a tool -> execute tool ->
// feed result back to the LLM -> format final response.

// ---- Canvas layout (responsive width) ----
let canvasWidth = 900;       // initial width, reset to container width each frame
let drawHeight = 520;        // visualization area (top) + execution log
let controlHeight = 140;     // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 14;

// ---- Controls ----
let querySelect, runButton, resetButton, speedSlider, reasoningCheckbox;

// ---- Tool definitions (stored as JS objects, per spec) ----
const tools = [
    { key: 'vector', name: 'Vector DB Search', icon: '▤' },   // database-ish glyph
    { key: 'sql',    name: 'SQL Query',        icon: '▦' },   // table-ish glyph
    { key: 'calc',   name: 'Calculator',       icon: '÷' },   // division sign
    { key: 'web',    name: 'Web Search',       icon: '◉' },   // globe-ish glyph
    { key: 'api',    name: 'Custom API',       icon: '⚙' }    // gear
];

// ---- Example queries, each defined as an ordered list of agent steps ----
// step.type: 'query' | 'reason' | 'tool' | 'result' | 'format' | 'output'
const examples = {
    revenue: {
        label: "What's the revenue for Q3?",
        steps: [
            { type: 'query',  text: 'User query received: "What\'s the revenue for Q3?"' },
            { type: 'reason', text: 'LLM reasoning: I need financial data from the database.' },
            { type: 'tool',   tool: 'sql', text: 'Tool selected: SQL Query' },
            { type: 'result', tool: 'sql', text: 'SQL executed: SELECT revenue FROM financials WHERE quarter=3  ->  2.4M' },
            { type: 'format', text: 'LLM reasoning: I have the data, now format it for the user.' },
            { type: 'output', text: 'Final output: "Q3 revenue was $2.4 million."' }
        ]
    },
    ceo: {
        label: 'Who is the CEO of company X?',
        steps: [
            { type: 'query',  text: 'User query received: "Who is the CEO of company X?"' },
            { type: 'reason', text: 'LLM reasoning: This is a current fact; I should search the web.' },
            { type: 'tool',   tool: 'web', text: 'Tool selected: Web Search' },
            { type: 'result', tool: 'web', text: 'Web Search returned: "Jane Doe, CEO since 2021."' },
            { type: 'format', text: 'LLM reasoning: I have a confident answer, format the response.' },
            { type: 'output', text: 'Final output: "The CEO of company X is Jane Doe."' }
        ]
    },
    calc: {
        label: 'Calculate 15% of $8,450 (multi-step)',
        steps: [
            { type: 'query',  text: 'User query received: "Calculate 15% of $8,450 of last year\'s total."' },
            { type: 'reason', text: 'LLM reasoning: First I need last year\'s total from the database.' },
            { type: 'tool',   tool: 'sql', text: 'Tool selected: SQL Query' },
            { type: 'result', tool: 'sql', text: 'SQL executed: SELECT total FROM sales WHERE year=2025  ->  8450' },
            { type: 'reason', text: 'LLM reasoning: Now compute 15 percent of 8450 with the calculator.' },
            { type: 'tool',   tool: 'calc', text: 'Tool selected: Calculator' },
            { type: 'result', tool: 'calc', text: 'Calculator executed: 8450 * 0.15  ->  1267.50' },
            { type: 'format', text: 'LLM reasoning: I have the result, format the response.' },
            { type: 'output', text: 'Final output: "15% of $8,450 is $1,267.50."' }
        ]
    }
};

// ---- Animation / agent state ----
let currentKey = 'revenue';
let running = false;
let stepIndex = -1;          // index into the current example's steps
let stepStartMs = 0;
let stepDurationMs = 500;    // controlled by the slider
let elapsedSimMs = 0;        // simulated timeline shown in the log
let logLines = [];           // [{ t: ms, text: '...' }]
let activeTool = null;       // tool key currently highlighted
let highlightLLM = false;
let highlightQuery = false;
let highlightOutput = false;
let finalAnswer = '';

// ---- Colors (named where possible) ----
const COL_INPUT = '#3b82f6';   // blue
const COL_LLM = '#22c55e';     // green
const COL_TOOL = '#f97316';    // orange
const COL_FLOW = '#8b5cf6';    // purple
const COL_IDLE = '#cbd5e1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Row 1: query dropdown + Run + Reset
    querySelect = createSelect();
    querySelect.parent(document.querySelector('main'));
    for (const k in examples) querySelect.option(examples[k].label, k);
    querySelect.selected(examples[currentKey].label);
    querySelect.changed(onQueryChange);
    querySelect.position(margin, drawHeight + 12);
    querySelect.style('font-size', '13px');

    runButton = createButton('Run Agent');
    runButton.parent(document.querySelector('main'));
    runButton.mousePressed(runAgent);

    resetButton = createButton('Reset');
    resetButton.parent(document.querySelector('main'));
    resetButton.mousePressed(resetAgent);

    // Row 2: speed slider + reasoning checkbox
    speedSlider = createSlider(100, 2000, 500, 100);
    speedSlider.parent(document.querySelector('main'));
    speedSlider.position(sliderLeftMargin, drawHeight + 52);

    reasoningCheckbox = createCheckbox(' Show intermediate reasoning', true);
    reasoningCheckbox.parent(document.querySelector('main'));
    reasoningCheckbox.position(margin, drawHeight + 95);
    reasoningCheckbox.style('font-size', '14px');

    positionRow1Controls();
    describe('Interactive diagram of a LangChain agent reasoning loop. A user query flows to an LLM that selects one of five tools, executes it, and formats a final response. Controls let you choose an example query, run the agent, set animation speed, and toggle reasoning display.', LABEL);
}

function positionRow1Controls() {
    // Place Run and Reset to the right of the dropdown.
    const selW = querySelect.elt.offsetWidth || 230;
    runButton.position(margin + selW + 12, drawHeight + 12);
    const runW = runButton.elt.offsetWidth || 90;
    resetButton.position(margin + selW + 12 + runW + 8, drawHeight + 12);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(720, container.offsetWidth);
    }
    if (typeof speedSlider !== 'undefined') {
        speedSlider.size(min(360, canvasWidth - sliderLeftMargin - margin - 320));
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    positionRow1Controls();
}

function onQueryChange() {
    currentKey = querySelect.value();
    resetAgent();
}

function runAgent() {
    if (running) return;
    resetAgent();
    running = true;
    stepIndex = 0;
    stepStartMs = millis();
    applyStep(examples[currentKey].steps[0]);
}

function resetAgent() {
    running = false;
    stepIndex = -1;
    elapsedSimMs = 0;
    logLines = [];
    activeTool = null;
    highlightLLM = false;
    highlightQuery = false;
    highlightOutput = false;
    finalAnswer = '';
}

// Apply the visual + log effects of a single step.
function applyStep(step) {
    highlightLLM = false;
    highlightQuery = false;
    highlightOutput = false;
    activeTool = null;

    if (step.type === 'query') highlightQuery = true;
    else if (step.type === 'reason' || step.type === 'format') highlightLLM = true;
    else if (step.type === 'tool') activeTool = step.tool;
    else if (step.type === 'result') activeTool = step.tool;
    else if (step.type === 'output') { highlightOutput = true; finalAnswer = step.text.replace('Final output: ', ''); }

    // Add to execution log (respecting the reasoning checkbox for reason steps).
    const showReason = reasoningCheckbox.checked();
    const isReason = (step.type === 'reason' || step.type === 'format');
    if (!isReason || showReason) {
        logLines.push({ t: elapsedSimMs, text: step.text });
    }
}

function draw() {
    updateCanvasSize();

    // Advance the animation timeline.
    stepDurationMs = speedSlider.value();
    if (running && stepIndex >= 0) {
        if (millis() - stepStartMs >= stepDurationMs) {
            elapsedSimMs += stepDurationMs;
            stepIndex++;
            const steps = examples[currentKey].steps;
            if (stepIndex < steps.length) {
                stepStartMs = millis();
                applyStep(steps[stepIndex]);
            } else {
                running = false;
            }
        }
    }

    // Background regions
    noStroke();
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    drawTitle();
    drawDiagram();
    drawExecutionLog();
    drawControlLabels();
}

function drawTitle() {
    noStroke();
    fill('black');
    textSize(20);
    textAlign(CENTER, TOP);
    text('LangChain Agent: Dynamic Tool Selection Loop', canvasWidth / 2, 8);
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawDiagram() {
    const cx = canvasWidth / 2;
    // Vertical band reserved for the diagram (left ~58% of width); log on the right.
    const diagW = canvasWidth * 0.58;
    const dcx = diagW / 2;

    // Query box (top)
    const qy = 48;
    drawBox(dcx - 150, qy, 300, 42, 'User Query', highlightQuery ? COL_INPUT : COL_IDLE,
            highlightQuery ? 'white' : '#334155', examples[currentKey].label, 12);

    // LLM reasoning box (center)
    const ly = 140;
    let llmSub = 'Reasons about which tool to use';
    if (highlightLLM) {
        const s = examples[currentKey].steps[stepIndex];
        if (s) llmSub = s.text.replace('LLM reasoning: ', '');
    }
    drawBox(dcx - 170, ly, 340, 58, 'LLM Reasoning (Agent)', highlightLLM ? COL_LLM : COL_IDLE,
            highlightLLM ? 'white' : '#334155', llmSub, 11);

    // Tool row (5 tools)
    const ty = 270;
    const toolW = (diagW - margin * 2 - 4 * 12) / 5;
    const toolH = 60;
    for (let i = 0; i < tools.length; i++) {
        const tx = margin + i * (toolW + 12);
        const isActive = activeTool === tools[i].key;
        drawToolBox(tx, ty, toolW, toolH, tools[i], isActive);
    }

    // Result aggregation + final output (bottom)
    const ry = 380;
    const inResult = stepIndex >= 0 && examples[currentKey].steps[stepIndex] &&
                     examples[currentKey].steps[stepIndex].type === 'result';
    drawBox(dcx - 170, ry, 340, 46, 'Result Aggregation', inResult ? COL_FLOW : COL_IDLE,
            inResult ? 'white' : '#334155',
            inResult ? examples[currentKey].steps[stepIndex].text.split('->')[1].trim() : 'Combines tool outputs', 11);

    const oy = 452;
    drawBox(dcx - 170, oy, 340, 46, 'Final Response', highlightOutput ? COL_INPUT : COL_IDLE,
            highlightOutput ? 'white' : '#334155',
            highlightOutput ? finalAnswer : 'Returned to the user', 11);

    // Arrows connecting the flow
    stroke(COL_FLOW);
    strokeWeight(2);
    drawArrow(dcx, qy + 42, dcx, ly);                 // query -> LLM
    // LLM -> active tool (or center of tool row)
    let toolTargetX = dcx;
    if (activeTool) {
        const idx = tools.findIndex(t => t.key === activeTool);
        toolTargetX = margin + idx * (toolW + 12) + toolW / 2;
        stroke(COL_TOOL); strokeWeight(3);
    } else { stroke(COL_IDLE); strokeWeight(2); }
    drawArrow(dcx, ly + 58, toolTargetX, ty);
    // tool -> result (feedback up to LLM then down)
    stroke(activeTool ? COL_TOOL : COL_IDLE);
    drawArrow(toolTargetX, ty + toolH, dcx, ry);
    stroke(inResult ? COL_FLOW : COL_IDLE); strokeWeight(2);
    drawArrow(dcx, ry + 46, dcx, oy);
    // feedback loop label: tool result -> LLM
    stroke(COL_LLM); strokeWeight(1.5); drawingContext.setLineDash([5, 4]);
    line(dcx + 175, ry + 23, dcx + 230, ry + 23);
    line(dcx + 230, ry + 23, dcx + 230, ly + 29);
    drawArrow(dcx + 230, ly + 29, dcx + 170, ly + 29);
    drawingContext.setLineDash([]);
    noStroke();
    fill(COL_LLM);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text('result feeds back to LLM', dcx + 230, ly - 6);
    textSize(defaultTextSize);

    strokeWeight(1);
}

function drawBox(x, y, w, h, title, fillColor, textColor, subtitle, subSize) {
    push();
    stroke('#94a3b8');
    strokeWeight(1.5);
    fill(fillColor);
    rect(x, y, w, h, 8);
    noStroke();
    fill(textColor);
    textAlign(CENTER, TOP);
    textSize(13);
    textStyle(BOLD);
    text(title, x + w / 2, y + 6);
    textStyle(NORMAL);
    textSize(subSize || 11);
    text(truncate(subtitle, w - 16, subSize || 11), x + w / 2, y + 24);
    pop();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawToolBox(x, y, w, h, tool, isActive) {
    push();
    stroke(isActive ? '#9a3412' : '#94a3b8');
    strokeWeight(isActive ? 2.5 : 1.2);
    fill(isActive ? COL_TOOL : '#f1f5f9');
    rect(x, y, w, h, 8);
    noStroke();
    fill(isActive ? 'white' : '#475569');
    textAlign(CENTER, TOP);
    textSize(20);
    text(tool.icon, x + w / 2, y + 6);
    textSize(10.5);
    text(tool.name, x + w / 2, y + 36);
    pop();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawExecutionLog() {
    const lx = canvasWidth * 0.60;
    const lw = canvasWidth - lx - margin;
    const ly = 44;
    const lh = drawHeight - ly - 16;

    push();
    stroke('#94a3b8');
    strokeWeight(1.2);
    fill('white');
    rect(lx, ly, lw, lh, 6);
    noStroke();
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text('Execution Log', lx + 10, ly + 8);
    textStyle(NORMAL);

    textSize(11);
    fill('#334155');
    let yy = ly + 32;
    const lineH = 30;
    // Show the most recent lines that fit.
    const maxLines = Math.floor((lh - 36) / lineH);
    const start = Math.max(0, logLines.length - maxLines);
    for (let i = start; i < logLines.length; i++) {
        const entry = logLines[i];
        fill('#0ea5e9');
        text('[' + entry.t + 'ms]', lx + 10, yy);
        fill('#334155');
        const wrapped = wrapText(entry.text, lw - 24, 11);
        text(wrapped, lx + 10, yy + 13);
        yy += lineH + (wrapped.split('\n').length - 1) * 13;
    }
    if (logLines.length === 0) {
        fill('#94a3b8');
        text('Press "Run Agent" to trace the reasoning loop step by step.', lx + 10, yy);
    }
    pop();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawControlLabels() {
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Example query:', margin, drawHeight + 4);
    text('Animation speed: ' + speedSlider.value() + ' ms/step', margin, drawHeight + 60);
    textSize(defaultTextSize);
}

// ---- helpers ----
function drawArrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    const a = atan2(y2 - y1, x2 - x1);
    const sz = 7;
    push();
    translate(x2, y2);
    rotate(a);
    fill(drawingContext.strokeStyle);
    noStroke();
    triangle(0, 0, -sz, -sz / 2, -sz, sz / 2);
    pop();
}

function truncate(str, maxPx, sz) {
    textSize(sz);
    if (textWidth(str) <= maxPx) return str;
    let s = str;
    while (s.length > 4 && textWidth(s + '...') > maxPx) s = s.slice(0, -1);
    return s + '...';
}

function wrapText(str, maxPx, sz) {
    textSize(sz);
    const words = str.split(' ');
    let lines = [];
    let cur = '';
    for (const w of words) {
        const test = cur ? cur + ' ' + w : w;
        if (textWidth(test) > maxPx && cur) { lines.push(cur); cur = w; }
        else cur = test;
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 2).join('\n');
}
