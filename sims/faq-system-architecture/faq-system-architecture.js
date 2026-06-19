// CANVAS_HEIGHT: 760
// FAQ System Architecture - hover interaction logic.
// The Mermaid data-flow diagram is defined inline in main.html. This file wires
// the right-hand info panel so hovering over a node shows a description.

const nodeInfo = {
    'UI': 'The chat window where the user types a question and later sees the answer.',
    'Norm': 'Text normalization lowercases the query and strips punctuation so wording differences do not matter.',
    'Syn': 'Synonym expansion adds related terms (e.g., "reset" ~ "change") to widen the match.',
    'Embed': 'Embedding generation turns the processed query into a numeric vector for semantic comparison.',
    'Sim': 'Similarity calculation scores the query vector against every stored FAQ vector.',
    'Rank': 'The ranking algorithm orders candidate answers from most to least similar.',
    'Thresh': 'A confidence threshold filters out weak matches so the bot does not answer when unsure.',
    'DB': 'The FAQ database stores curated question-and-answer pairs as embeddings.',
    'Response': 'Response delivery returns the top-ranked answer, here with confidence 0.87.',
    'Feedback': 'Thumbs up/down feedback flows back to the database to improve future answers.'
};

const panel = document.getElementById('panel');
const panelWrap = document.getElementById('panelWrap');

function positionPanel(evt) {
    const r = panelWrap.getBoundingClientRect();
    const panelH = panel.offsetHeight || 120;
    const wrapH = panelWrap.offsetHeight;
    const y = evt.clientY - r.top - 20;
    const top = Math.max(8, Math.min(wrapH - panelH - 40, y));
    panel.style.top = `${top}px`;
}

function setupNodeHover() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        const nodeId = node.id.replace('flowchart-', '').split('-')[0];
        if (nodeInfo[nodeId]) {
            node.style.cursor = 'pointer';
            node.addEventListener('mouseenter', (e) => {
                panel.innerHTML = nodeInfo[nodeId];
                positionPanel(e);
            });
            node.addEventListener('mousemove', positionPanel);
            node.addEventListener('mouseleave', () => {
                panel.innerHTML = 'Hover over a box to see how an FAQ system answers a question.';
            });
        }
    });
}

function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv && mermaidDiv.querySelector('svg');
    if (svg && document.querySelectorAll('.node').length > 0) {
        setupNodeHover();
    } else {
        setTimeout(waitForMermaid, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(waitForMermaid, 150));
} else {
    setTimeout(waitForMermaid, 150);
}
