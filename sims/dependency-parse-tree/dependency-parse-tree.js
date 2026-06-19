// CANVAS_HEIGHT: 640
// Dependency Parse Tree MicroSim
// Renders a Mermaid dependency tree for the sentence
// "Show me the sales report for the last quarter" and wires up a
// right-side info panel that updates as the reader hovers each word node.
//
// The Mermaid definition lives in main.html inside <pre class="mermaid">.
// This file holds the per-node descriptions and the hover/positioning logic
// described in the mermaid-guide.

// Map of Mermaid node ID -> educational description shown in the info panel.
const nodeInfo = {
  Show:    'Root verb (VB). The head of the entire sentence. Every other word ultimately depends on "Show".',
  me:      '"me" (PRP) is the indirect object via the "dative" relation - the recipient of the showing action. Core argument (red).',
  report:  '"report" (NN) is the direct object (dobj) of "Show" - the thing being shown. Core argument (red).',
  the1:    '"the" (DT) attaches to "report" with the determiner relation (det). Modifier (blue).',
  sales:   '"sales" (NN) modifies "report" as a noun-noun compound (compound) - it forms "sales report". Modifier (blue).',
  for:     '"for" (IN) is a preposition (prep) attaching to "report" and introducing a prepositional phrase. Prepositional (green).',
  quarter: '"quarter" (NN) is the object of the preposition "for" (pobj). Prepositional (green).',
  the2:    '"the" (DT) is the determiner (det) of "quarter". Modifier (blue).',
  last:    '"last" (JJ) is an adjectival modifier (amod) of "quarter" - "the last quarter". Modifier (blue).'
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
        panel.innerHTML = 'Hover a word to see its grammatical role.';
      });
    }
  });
}

// Poll until Mermaid has finished rendering the SVG and its node elements.
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
