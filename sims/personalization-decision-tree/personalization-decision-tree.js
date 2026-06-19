// Personalization Decision Tree
// Hover interaction for the Mermaid personalization decision-tree flowchart.
// Maps each node id to a description shown in the right-hand info panel.
// CANVAS_HEIGHT: 800

const nodeInfo = {
  'Start': 'A user query arrives, e.g. "Show me sales data." The system begins ' +
           'evaluating how much it can personalize the response.',
  'Auth': 'Is the user identity known? Authentication gates every form of ' +
          'personalization.',
  'Generic': 'Not authenticated: return a generic response scoped to public ' +
             'information only, with standard verbosity and format. ' +
             'Example: "I can show public sales trends. Please log in for details."',
  'Load': 'Authenticated: fetch the user profile, preferences, history, and the ' +
          'current session context.',
  'Perm': 'Is the user authorized for the requested data? Permission checks are ' +
          'security-critical and run before any data is returned.',
  'Denied': 'No permission: politely explain the access restriction and suggest ' +
            'an alternative. Example: "Your role does not include sales data ' +
            'access. Want me to help request permission?"',
  'Prefs': 'Does the user have explicit preference settings (verbosity, format, ' +
           'scope)? Explicit preferences override learned behavior.',
  'Defaults': 'No preferences: use defaults — standard verbosity, table format, ' +
              'and the full available scope.',
  'Apply': 'Preferences exist: apply the preferred verbosity level, format ' +
           '(chart vs. table), and data scope (team vs. company).',
  'History': 'Analyze behavioral patterns: common query types, typical ' +
             'follow-ups, and expertise level inferred from query complexity.',
  'Match': 'Does this query match a known pattern for this user? About 80% of ' +
           'queries match a pattern after 20+ interactions.',
  'Enhanced': 'Pattern matched: provide the data plus proactive follow-ups the ' +
              'user usually asks for. Example: "Here is Q3 sales by region. Want ' +
              'the Q2 comparison and Q4 projection too?"',
  'Standard': 'No pattern match: provide the requested data with the user’s ' +
              'permission scope, preferences, and role-appropriate context.',
  'Log': 'Record the query and response, capture satisfaction feedback, and ' +
         'update the user history so future personalization improves.',
  'End': 'The user receives a tailored response and implicit learning continues.'
};

(function () {
  'use strict';

  const panel = document.getElementById('panel');
  const DEFAULT = panel ? panel.textContent : '';

  function setupNodeHover() {
    document.querySelectorAll('.node').forEach(node => {
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
