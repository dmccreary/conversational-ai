// CANVAS_HEIGHT: 858
// Chat Widget Integration Patterns - Mermaid layered architecture diagram.
// Initializes Mermaid and wires up the right-side hover info panel that
// describes each component in the website -> widget -> backend pipeline.

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
    'HTML': 'The host web page. The widget must coexist with the page DOM without breaking existing layout or styles.',
    'SiteJS': 'JavaScript already running on the site. The widget should avoid global namespace and event collisions.',
    'Embed': 'Three embed methods: a script tag (simplest, self-contained bundle), an NPM package (build-time, tree-shakable for React/Vue), or an iFrame (fully sandboxed, cross-domain).',
    'FloatBtn': 'The collapsed launcher. A small floating button anchored to a page corner that opens the chat window when clicked.',
    'ChatWin': 'The expanded chat window containing the message list, input box, and controls.',
    'MsgComp': 'Reusable message components that render user bubbles, bot bubbles, rich cards, and typing indicators.',
    'ConnMgr': 'The connection manager. Opens and maintains the transport to the backend and handles reconnect and fallback logic.',
    'WS': 'WebSocket: a persistent, bidirectional channel. Best for interactive conversations with real-time streaming.',
    'SSE': 'Server-Sent Events: a simpler one-way server push channel when the client rarely needs to stream upstream.',
    'Poll': 'Long polling: repeated HTTP requests used as a fallback that works through restrictive corporate firewalls.',
    'Gateway': 'The API gateway terminates WebSocket and REST traffic, authenticates requests, and routes them to backend services.',
    'Framework': 'The chatbot framework (Rasa, Dialogflow, etc.) performs intent detection and generates the response.',
    'Session': 'The session manager tracks per-user conversation state across multiple turns and messages.',
    'Local': 'LocalStorage keeps a client-side copy of recent conversation history so the widget can restore on reload.',
    'Cookie': 'A session cookie identifies the returning user so the backend can link the conversation to a profile.',
    'DB': 'The database stores long-term conversation history for analytics, auditing, and personalization.'
};

const panel = document.getElementById('panel');
const panelWrap = document.getElementById('panelWrap');
const defaultText = 'Hover a node to learn how each part of the chat widget integration works.';

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
