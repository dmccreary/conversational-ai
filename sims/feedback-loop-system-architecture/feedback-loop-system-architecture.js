// Feedback Loop System Architecture
// Hover interaction for the Mermaid feedback-loop workflow. Maps each node id
// to a description shown in the right-hand info panel.
// CANVAS_HEIGHT: 720

const nodeInfo = {
  'U': 'User Interaction: a user asks a question, the chatbot answers, and the ' +
       'user clicks thumbs-down. The negative signal starts the loop.',
  'C': 'Feedback Collection: the frontend captures the full interaction context ' +
       '(query text, response text, feedback type, timestamp, user ID) and posts ' +
       'it to an API endpoint.',
  'S': 'Data Storage: the feedback record is written to a database, indexed by ' +
       'timestamp, intent, and response quality, and tied to the conversation session.',
  'A': 'Analysis and Pattern Detection: dashboards aggregate feedback by intent ' +
       'and an ML model surfaces failure patterns, e.g. "Intent X has a 40% ' +
       'thumbs-down rate."',
  'DB': 'Feedback Analytics Database: the central hub that stores every feedback ' +
        'event, powers the dashboards and reports, and enables historical trend ' +
        'analysis for both analysis and validation.',
  'H': 'Human Review: a product manager reviews the flagged intent, examines ' +
       'failed conversations, and identifies the root cause, e.g. "knowledge base ' +
       'missing Q3 2024 data."',
  'R': 'Corrective Action: the team updates the knowledge base, retrains the ' +
       'retrieval index, and refines the prompt template. Typical cycle time is ' +
       '1-2 weeks.',
  'V': 'Validation: a 50/50 A/B test compares the updated version against the old ' +
       'one. A statistical test (p < 0.05) confirms a 15% rise in thumbs-up.',
  'D': 'Deployment: the validated improvement rolls out to 100% of users, the ' +
       'monitoring dashboard updates, and the change is logged. The cycle then ' +
       'restarts with a new, higher baseline.'
};

(function () {
  'use strict';

  const panel = document.getElementById('panel');
  const DEFAULT = panel ? panel.textContent : '';

  function setupNodeHover() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
      const nodeId = node.id.replace('flowchart-', '').split('-')[0];
      if (nodeInfo[nodeId]) {
        node.addEventListener('mouseenter', () => { panel.textContent = nodeInfo[nodeId]; });
        node.addEventListener('mouseleave', () => { panel.textContent = DEFAULT; });
      }
    });
  }

  function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv ? mermaidDiv.querySelector('svg') : null;
    if (svg && document.querySelectorAll('.node').length > 0) {
      setupNodeHover();
    } else {
      setTimeout(waitForMermaid, 120);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(waitForMermaid, 150));
  } else {
    setTimeout(waitForMermaid, 150);
  }
})();
