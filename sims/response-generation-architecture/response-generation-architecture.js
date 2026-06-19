// CANVAS_HEIGHT: 470
// Response Generation Architecture - Mermaid left-to-right flowchart of the full
// pipeline from user input to a validated response, including the three-way
// response-strategy decision (template, retrieval, LLM), context-injection
// points, and the quality-checker validation feedback loop.

mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        subGraphTitleMargin: { top: 10, bottom: 14 }
    }
});

// Hover descriptions keyed by Mermaid node id.
const nodeInfo = {
    'Input': 'The raw user message enters the pipeline. Everything downstream is driven by what the user asked.',
    'Intent': 'Intent classification determines the kind of request (FAQ, factual lookup, or open-ended) which selects the response strategy.',
    'Context': 'Context retrieval fetches conversation history and relevant knowledge that is injected into both strategy selection and formatting.',
    'Strategy': 'The response strategy selector routes the request down one of three paths based on the detected intent.',
    'Template': 'The template engine handles simple, known queries with fast pre-written responses (Intent: FAQ).',
    'Retrieval': 'The retrieval system answers factual questions by looking up authoritative content (Intent: Factual).',
    'LLM': 'The LLM generator handles complex, open-ended questions by generating a response (Intent: Complex).',
    'Formatter': 'The response formatter combines the chosen output with injected context into a coherent reply.',
    'Quality': 'The quality checker validates the response. On failure it loops back to regenerate; on pass it is sent to the user.',
    'Output': 'The validated response is returned to the user.'
};

const panel = document.getElementById('panel');
const panelWrap = document.getElementById('panelWrap');
const defaultText = 'Hover a stage to follow a user message from intent classification through one of three response strategies to a validated reply.';

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
            node.addEventListener('mouseenter', (e) => {
                panel.textContent = nodeInfo[nodeId];
                positionPanel(e);
            });
            node.addEventListener('mousemove', (e) => positionPanel(e));
            node.addEventListener('mouseleave', () => {
                panel.textContent = defaultText;
                panel.style.top = '8px';
            });
        }
    });
}

function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv ? mermaidDiv.querySelector('svg') : null;
    if (svg && document.querySelectorAll('.node').length > 0) {
        setupNodeHover();
    } else {
        setTimeout(waitForMermaid, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(waitForMermaid, 100));
} else {
    setTimeout(waitForMermaid, 100);
}
