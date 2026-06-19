// CANVAS_HEIGHT: 1380
// Intent Classification Pipeline - hover interaction logic.
// The Mermaid flowchart is defined inline in main.html. This file wires the
// right-hand info panel so hovering over a node shows an educational description.

const nodeInfo = {
    'Query': 'The raw user message enters the pipeline. Here: "I need to change my reservation for tomorrow."',
    'Norm': 'Text normalization lowercases the text and removes punctuation so surface differences do not matter.',
    'Tok': 'Tokenization splits the normalized text into individual words or sub-word tokens.',
    'Stop': 'Stopword filtering is optional (dashed): removing common words like "the" can help bag-of-words models.',
    'TFIDF': 'TF-IDF turns tokens into a sparse vector weighted by term frequency and rarity. Simple and fast.',
    'BERT': 'BERT encoding produces contextual embeddings. Recommended because it generalizes better to new phrasings.',
    'Model': 'A neural network maps the feature vector to intent scores using a softmax output layer.',
    'Probs': 'The softmax produces a probability for every intent. Here modify_reservation wins with 0.87.',
    'Thresh': 'A confidence threshold (0.70) decides whether the prediction is trustworthy enough to act on.',
    'Final': 'Because 0.87 >= 0.70, the system proceeds with the modify_reservation action.',
    'Escalate': 'Queries that fall below the threshold are escalated to a human agent instead of guessing.'
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
                panel.innerHTML = 'Hover over a box to follow a query from text to predicted intent.';
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
