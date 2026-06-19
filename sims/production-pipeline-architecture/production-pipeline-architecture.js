// CANVAS_HEIGHT: 1180
// Production Pipeline Architecture MicroSim
// Renders a Mermaid flowchart of a production-grade NLP pipeline with a cache
// layer, three confidence-based processing paths (fast / standard / complex),
// graceful error fallback, and a write-back cache loop. Hover any component for
// details.
//
// The Mermaid definition lives in main.html. This file holds the per-node
// info-panel descriptions and the hover/positioning logic.

const nodeInfo = {
  Input:    'Input layer: the raw user message plus request metadata (user_id, session_id, timestamp).',
  Pre:      'Preprocessing: text normalization and tokenization standardize the message before routing.',
  Cache:    'Cache lookup: has this exact query been processed recently? A hit (under 5ms) bypasses the entire pipeline.',
  Confidence: 'Confidence router: estimate query complexity and route to the fast, standard, or complex path accordingly.',
  F1:       'Fast path: simple pattern matching against high-confidence templates. Part of the under-50ms route that handles most traffic.',
  F2:       'Fast path: keyword extraction that feeds directly into the intent handler. Cheapest route in the pipeline.',
  S1:       'Standard path: part-of-speech tagging for moderate-complexity queries (about 100ms total for the path).',
  S2:       'Standard path: lemmatization reduces words to base forms for more reliable intent classification.',
  S3:       'Standard path: named entity recognition extracts the entities the dialog manager needs.',
  C1:       'Complex path: dependency parsing for hard or low-confidence queries (about 300ms total for the path).',
  C2:       'Complex path: coreference resolution links pronouns to the entities they refer to.',
  C3:       'Complex path: semantic role labeling identifies who did what to whom for advanced semantic parsing.',
  Error:    'Error handling: every component is wrapped in try/catch. On failure the system degrades gracefully and logs the error for debugging.',
  Output:   'Output layer: structured annotations, extracted intents and entities. Results are cached and passed to the dialog manager.',
  Hit:      'Cache hit: return the cached result immediately without re-running any NLP component.'
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
