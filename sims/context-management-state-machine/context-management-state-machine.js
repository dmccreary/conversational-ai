// CANVAS_HEIGHT: 620
// Context Management State Machine - Mermaid state-style flowchart showing how
// conversation context evolves across the states of a multi-turn conversation.

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
    'NewSession': 'User initiates the conversation. Context is empty except for the user profile that identifies who is talking.',
    'Single': 'Only the current user message is in context. This is sufficient for simple, standalone FAQ queries.',
    'Multi': 'The last 3 to 5 message pairs are kept in context. This enables pronoun resolution and natural follow-up questions.',
    'Task': 'Structured state tracks progress through a multi-step workflow such as a booking or a troubleshooting flow.',
    'LongTerm': 'User preferences and history from previous sessions are loaded to inform the current conversation.',
    'SizeCheck': 'Before each response the system checks whether the context exceeds the model token limit or a relevance threshold.',
    'Summarize': 'An LLM compresses older context into a short summary, replacing the full message history to free up tokens.',
    'End': 'The user ends the conversation or the session times out. Context is archived to user history and session state is cleared.'
};

const panel = document.getElementById('panel');
const panelWrap = document.getElementById('panelWrap');
const defaultText = 'Hover a state to see how conversation context evolves across a multi-turn conversation.';

function positionPanel(evt) {
    const r = panelWrap.getBoundingClientRect();
    const panelH = panel.offsetHeight || 120;
    const wrapH = panelWrap.offsetHeight;
    const y = evt.clientY - r.top - 20;
    const top = Math.max(8, Math.min(wrapH - panelH - 60, y));
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
