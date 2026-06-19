// CANVAS_HEIGHT: 800
// Rasa Architecture Components - Mermaid layered architecture diagram showing how
// a message flows through Rasa: channels -> NLU pipeline -> Core dialog management
// -> custom actions -> output, with Rasa X feeding training data back.

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
    'Slack': 'A messaging channel. Rasa connectors let the same bot serve Slack, Teams, a web widget, and more.',
    'Teams': 'Microsoft Teams channel connector, one of many input channels Rasa supports out of the box.',
    'Web': 'An embedded web chat widget channel that sends user messages into the Rasa pipeline.',
    'Tokenizer': 'Splits the raw user message into tokens (words or subwords) for downstream processing.',
    'Featurizer': 'Converts tokens into numeric features such as word embeddings that the classifier can consume.',
    'Intent': 'Predicts the user intent (the goal behind the message) and outputs confidence scores.',
    'Entity': 'Extracts structured entities such as dates, names, and amounts from the message.',
    'Tracker': 'The Tracker Store records the full conversation history and current slots for each session.',
    'Policy': 'The Dialog Policy decides the next action using ML, rules, or both, based on tracked state.',
    'ActionSrv': 'The Action Server runs the chosen action, which may be a simple response or custom code.',
    'DBConn': 'A custom action that reads from or writes to a database to fulfill the user request.',
    'APIClient': 'A custom action that calls an external API, for example to look up an order or a balance.',
    'BizLogic': 'Custom Python functions encoding business rules that shape the bot response.',
    'Review': 'Rasa X conversation review UI lets teams read real conversations and flag failures.',
    'Annotate': 'Rasa X annotation tools turn reviewed conversations into new labeled training data.',
    'Dashboard': 'Rasa X dashboard tracks model performance metrics over time.',
    'Output': 'Final response templates and generated messages sent back to the user channel.',
    'ExternalSys': 'External systems (databases, CRMs, third-party APIs) reached by custom actions.'
};

const panel = document.getElementById('panel');
const panelWrap = document.getElementById('panelWrap');
const defaultText = 'Hover a component to see its role in the Rasa pipeline, from channel input through NLU, dialog management, and custom actions.';

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
