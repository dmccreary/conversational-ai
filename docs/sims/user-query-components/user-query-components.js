// CANVAS_HEIGHT: 490
// User Query Components - hover interaction logic.
// The Mermaid flowchart is defined inline in main.html. This file wires the
// right-hand info panel so hovering over a node shows an educational description.

const nodeInfo = {
    'Query': 'The raw natural-language message from the user. It bundles together both what the user wants (intent) and the specifics (entities).',
    'Intent': 'The intent is the user\'s goal or action. Here it is "Book Flight", which tells the system which workflow to run.',
    'Entities': 'Entities are the specific pieces of information in the query that the system must extract to act.',
    'Dest': 'The destination entity: "San Francisco". It fills the destination slot of the flight search.',
    'Date': 'The date entity: "next Tuesday". A relative date the system must resolve to a calendar date.',
    'Action': 'The system action chosen by the intent: searching for available flights.',
    'Params': 'Parameters are the structured slots filled by the entities: destination and date.',
    'Actionable': 'Combining the intent (action) with the entities (parameters) yields a complete, executable request.'
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
                panel.innerHTML = 'Hover over a box to see how a query becomes an actionable request.';
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
