// CANVAS_HEIGHT: 1040
// NLP Pipeline Architecture MicroSim
// Renders a layered Mermaid flowchart showing how raw text flows through four
// processing layers (preprocessing, morphology, syntax, semantics) on its way
// to a structured representation ready for intent recognition.
//
// The Mermaid definition lives in main.html. This file holds the per-node
// info-panel descriptions and the hover/positioning logic.

const nodeInfo = {
  Raw:     'Raw text input: "Hey, can you show me last quarter sales?" This is the unprocessed user utterance that enters the pipeline.',
  Norm:    'Text normalization standardizes casing, expands contractions, and strips noise so downstream stages see consistent input. (Character level)',
  Tok:     'Tokenization splits the normalized text into discrete tokens (words, punctuation, subwords). Output: a list of tokens.',
  Stem:    'Stemming chops words down to a crude root by removing suffixes (e.g., "sales" to "sale"). Fast but approximate.',
  Lemma:   'Lemmatization maps each word to its dictionary base form using morphology (e.g., "showing" to "show"). Output: root forms.',
  POS:     'Part-of-speech tagging labels each token with its grammatical category (noun, verb, determiner). Adds grammatical tags.',
  Dep:     'Dependency parsing builds the grammatical tree linking each word to its head. Output: sentence structure.',
  NER:     'Named entity recognition identifies and types spans like dates, organizations, and quantities ("last quarter").',
  Coref:   'Coreference resolution links pronouns and references to the entities they point to. Output: entity relationships.',
  Out:     'Structured output: tokens, lemmas, POS tags, dependencies, and entities - ready for intent recognition and query execution.'
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
        panel.innerHTML = 'Hover a stage to learn what that layer does.';
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
