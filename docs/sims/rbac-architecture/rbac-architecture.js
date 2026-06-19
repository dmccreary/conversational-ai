// CANVAS_HEIGHT: 660
// RBAC Architecture - hover interaction logic.
// The Mermaid layered diagram is defined inline in main.html. This file wires
// the right-hand info panel so hovering over a node shows an educational
// description. The numbered authorization-check flow is rendered as static HTML
// in the info panel (see main.html).

const nodeInfo = {
    'Alice': 'Alice is assigned the Sales Manager role, which inherits Sales Rep and Employee permissions.',
    'Bob': 'Bob is assigned the Sales Rep role, inheriting the base Employee permissions.',
    'Carol': 'Carol is assigned the HR Specialist role, which inherits Employee permissions.',
    'DanU': 'Dan is assigned the Finance role, which inherits Employee permissions.',
    'SalesMgr': 'Sales Manager inherits Sales Rep (and therefore Employee). Adds read_team_sales and approve_discounts.',
    'SalesRep': 'Sales Rep inherits Employee. Adds read_sales and write_sales_notes.',
    'HRSpec': 'HR Specialist inherits Employee. Adds read_hr_data and read_pii.',
    'Finance': 'Finance inherits Employee. Adds read_financial.',
    'Employee': 'The base role. Every other role (except Admin) inherits from it. Grants read_public_faq.',
    'Admin': 'A standalone role holding the wildcard (*) permission, which grants everything.',
    'PFaq': 'read_public_faq: view public FAQ content. Granted by the base Employee role.',
    'PSales': 'read_sales: read sales data. Granted by Sales Rep.',
    'PTeam': 'read_team_sales: read aggregated team sales. Granted by Sales Manager.',
    'PHr': 'read_hr_data: read HR records. Granted by HR Specialist.',
    'PPii': 'read_pii: read personally identifiable information. Granted by HR Specialist.',
    'PFin': 'read_financial: read financial reports. Granted by Finance.',
    'PNotes': 'write_sales_notes: add notes to sales records. Granted by Sales Rep.',
    'PDisc': 'approve_discounts: approve discount requests. Granted by Sales Manager.',
    'PStar': '* (wildcard): grants every permission. Held only by the Admin role.'
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
                panel.innerHTML = 'Hover over a user, role, or permission for details.';
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
