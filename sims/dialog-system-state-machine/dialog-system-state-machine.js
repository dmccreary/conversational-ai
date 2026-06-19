// CANVAS_HEIGHT: 1080
// Dialog System State Machine - hover interaction logic.
// The Mermaid state diagram is defined inline in main.html. This file wires up
// the right-hand info panel so that hovering over a state shows a description.

// Map state node IDs (as used in the Mermaid stateDiagram-v2 source) to
// educational hover text describing what the dialog system does in that state.
const nodeInfo = {
    'Greeting': 'System welcomes the user and offers to help with flight booking.',
    'CollectDestination': 'System asks "Where would you like to fly?" if the destination slot is empty.',
    'CollectOrigin': 'System asks "Where will you depart from?" if the origin slot is empty.',
    'CollectDate': 'System asks "What date?" and resolves relative references like "next Monday".',
    'CollectTime': 'System asks "What time of day: morning, afternoon, or evening?"',
    'AllSlotsFilled': 'Decision point: checks whether destination, origin, date, and time are all collected.',
    'DisplayOptions': 'System queries the flight database and shows available flights matching the criteria.',
    'ConfirmSelection': 'User selects a flight; the system confirms details before booking.',
    'BookingComplete': 'System provides a confirmation number and sends an email receipt.'
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

// In stateDiagram-v2, each state renders as a <g class="node ... id="state-Greeting-1">.
// We find which known state ID is a substring of the element id.
function resolveStateId(elementId) {
    if (!elementId) return null;
    for (const key of Object.keys(nodeInfo)) {
        if (elementId.indexOf(key) !== -1) return key;
    }
    return null;
}

function setupNodeHover() {
    const nodes = document.querySelectorAll('.node, .statediagram-state, g[id^="state-"]');
    nodes.forEach(node => {
        const stateId = resolveStateId(node.id);
        if (stateId && nodeInfo[stateId]) {
            node.style.cursor = 'pointer';
            node.addEventListener('mouseenter', (e) => {
                panel.innerHTML = '<strong>' + stateId.replace(/([A-Z])/g, ' $1').trim() + '</strong><br>' + nodeInfo[stateId];
                positionPanel(e);
            });
            node.addEventListener('mousemove', positionPanel);
            node.addEventListener('mouseleave', () => {
                panel.innerHTML = 'Hover over a state to see what the dialog system does.';
            });
        }
    });
}

function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv && mermaidDiv.querySelector('svg');
    if (svg && document.querySelectorAll('g[id^="state-"], .statediagram-state').length > 0) {
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
