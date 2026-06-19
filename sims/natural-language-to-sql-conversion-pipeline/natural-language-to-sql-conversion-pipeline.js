// CANVAS_HEIGHT: 720
// Natural Language to SQL Conversion Pipeline MicroSim
// Renders a Mermaid flowchart showing how a natural language question becomes
// an executed SQL query through three parallel conversion strategies that
// converge at a selection/validation layer, then pass through a safety/
// execution layer before formatting results. Hover any component for details.
//
// The Mermaid definition lives in main.html. This file holds the per-node
// info-panel descriptions and the hover/positioning logic.

const nodeInfo = {
  Question: 'Input: the user natural language question, normalized (lowercased, abbreviations expanded) before conversion.',
  T1:       'Template path: match the question against known template patterns. Handles about 90% of queries with HIGH confidence.',
  T2:       'Template path: extract parameters and substitute them into the templates SQL. Fast and safe.',
  L1:       'LLM path: build a schema-aware prompt and have a language model generate SQL for novel queries. MEDIUM confidence.',
  L2:       'LLM path: the model returns a SQL candidate that still must be validated before execution.',
  P1:       'Semantic parsing path (experimental): parse the question into a logical form, then translate that form into SQL. MEDIUM confidence.',
  P2:       'Semantic parsing path: generate SQL from the logical form. Used mainly for research and hard queries.',
  Select:   'Selection: compare the SQL candidates and confidence scores from all strategies and pick the highest-confidence result.',
  Schema:   'Schema validation: verify that every table and column referenced by the SQL actually exists in the database schema.',
  Pattern:  'Pattern validation: ensure the query has a safe structure (no destructive statements, no unbounded scans).',
  Sanitize: 'Parameter sanitization: clean and bind parameters to prevent SQL injection.',
  Safety:   'Safety and execution: run the parameterized query with a 5-second timeout and a 1000-row result limit, catching errors.',
  Output:   'Output: format results for conversational display, cache the query for similar future questions, and log it for analytics.',
  Escalate: 'Fallback: if validation fails or execution errors out, escalate to a human or return a safe error message.'
};

const panel = document.getElementById('panel');
const panelWrap = document.getElementById('panelWrap');

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
      node.style.cursor = 'pointer';
      node.addEventListener('mouseenter', (e) => {
        panel.innerHTML = nodeInfo[nodeId];
        positionPanel(e);
      });
      node.addEventListener('mousemove', positionPanel);
      node.addEventListener('mouseleave', () => {
        panel.innerHTML = 'Hover a component to see what it does.';
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
