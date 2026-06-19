// CANVAS_HEIGHT: 1140
// POS Tagging Process Flow MicroSim
// Renders a Mermaid flowchart of the part-of-speech tagging algorithm: load a
// trained model, iterate left-to-right over the tokens, handle known vs.
// unknown words, and accumulate the tagged sequence. Hover any step for the
// detailed explanation from the specification.
//
// The Mermaid definition lives in main.html. This file holds the per-node
// info-panel descriptions and the hover/positioning logic.

const nodeInfo = {
  Start:   'Input: a tokenized sentence. The sentence has already been preprocessed and split into tokens, e.g. [Can, you, show, sales, ?].',
  Init:    'Initialize: load the trained model containing P(tag|word) emission probabilities and P(tag|previous_tags) transition probabilities.',
  ForEach: 'For each word in sequence: process words left-to-right so the tagger can use context from previously assigned tags.',
  Lookup:  'Lookup word in vocabulary: check whether this word appeared during training and what tags and probabilities it was seen with.',
  Known:   'Decision - Word known? Has this word appeared in the training data with tagged examples?',
  UseProb: 'Use trained probabilities: apply the Viterbi algorithm combining P(tag|word) times P(tag|previous_tags) to score each candidate tag.',
  Unknown: 'Apply unknown-word heuristics: use capitalization and suffixes - "-ly" suggests RB, "-tion" suggests NN, a capitalized word suggests NNP.',
  Assign:  'Assign most probable tag: select the tag with the highest probability given the current word and the context history.',
  More:    'Decision - More words? Are there remaining tokens in the sentence to tag?',
  Return:  'Return tagged sequence. Output: [(Can, MD), (you, PRP), (show, VB), (sales, NNS), (?, .)].',
  End:     'Tagged sentence ready for parsing. POS tags enable syntactic parsing and entity extraction downstream.'
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
