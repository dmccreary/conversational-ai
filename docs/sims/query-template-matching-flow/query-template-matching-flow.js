// CANVAS_HEIGHT: 1620
// Query Template Matching Flow MicroSim
// Renders a Mermaid flowchart for matching a user's natural language question
// to a SQL query template: normalize, score similarity, validate parameters
// (with a clarification loop), substitute into SQL, execute, and format the
// response. Hover any step for the detailed explanation.
//
// The Mermaid definition lives in main.html. This file holds the per-node
// info-panel descriptions and the hover/positioning logic.

const nodeInfo = {
  Start:    'User asks a natural language question. Example: "What were Northeast sales in Q4?"',
  Normalize:'Normalize the question: lowercase, expand contractions, and remove filler words to "what were northeast sales in q4".',
  Similar:  'Calculate similarity to every template pattern using fuzzy matching or semantic similarity to find the best match.',
  Match:    'Decision - template match found? Does the best similarity score exceed the threshold (for example 0.75)?',
  Select:   'Select the best matching template. Example: "sales_by_region" matched with score 0.92.',
  Unsupported:'No template matches the question pattern. Return an "unsupported query" message and suggest similar supported questions.',
  Extract:  'Extract parameters from the question: "Northeast" fills {region} and "Q4" fills {time_period}.',
  Validate: 'Validate extracted parameters: is "Northeast" in the valid regions list? Is "Q4" a valid temporal expression?',
  Valid:    'Decision - parameters valid? Are all required parameters present and passing validation?',
  Request:  'Request missing or invalid parameters with a clarifying question, then loop back to re-extract.',
  Calc:     'Calculate dynamic parameter values: convert "Q4" into the date range 2024-10-01 to 2024-12-31.',
  Substitute:'Substitute parameters into the SQL template: replace {region} with "Northeast" and {date_filter} with the WHERE clause.',
  Execute:  'Execute the parameterized SQL query against the database.',
  Success:  'Decision - query successful? Did the query execute without errors?',
  LogError: 'Log the technical error and show the user a friendly message: "Sorry, I encountered an error retrieving that data."',
  Format:   'Format the results using a response template: "Total sales in Northeast for Q4 2024: 1,234,567 dollars."',
  End:      'Return the formatted conversational response, with data, to the user.'
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
        panel.innerHTML = 'Hover a step to see how it works.';
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
