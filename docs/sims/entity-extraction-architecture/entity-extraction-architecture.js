// CANVAS_HEIGHT: 700
// Entity Extraction Architecture - hover interaction logic.
// The Mermaid flowchart is defined inline in main.html. This file wires the
// right-hand info panel so hovering over a node shows an educational description.

const nodeInfo = {
    'Query': 'The raw user query enters the system and is sent to all three extraction strategies in parallel.',
    'Regex': 'Hand-written regular expressions match well-structured patterns such as emails, phone numbers, and codes.',
    'DateP': 'A date parser converts phrases like "March 15th" into a normalized calendar date.',
    'NumE': 'A number extractor pulls quantities such as "2" from the text.',
    'BERT': 'A fine-tuned BERT model reads the sentence and produces contextual token embeddings for NER.',
    'TokC': 'A token-classification head labels each token with an entity type using the BIO scheme.',
    'MLout': 'The ML branch outputs typed entities with confidence scores: Person 0.94, Location 0.89.',
    'GPT': 'A large language model is prompted with a few examples (few-shot) to extract entities flexibly.',
    'Custom': 'The LLM can recognize custom or rare entity types that the rules and ML model miss.',
    'Fallback': 'The LLM branch (dotted in spec) is used mainly when the other branches return low confidence.',
    'Merge': 'The merging layer resolves conflicts. Priority is Rules > ML > LLM for known patterns, and confidences are aggregated.',
    'Link': 'Entity linking canonicalizes mentions: "Boston" becomes Boston, MA (BST-MA-US) and "John Smith" resolves to Account #7834.',
    'Output': 'The final structured dictionary holds normalized, ID-linked entities ready for downstream actions.'
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
        // Flowchart node ids look like "flowchart-Query-3".
        const nodeId = node.id.replace('flowchart-', '').split('-')[0];
        if (nodeInfo[nodeId]) {
            node.style.cursor = 'pointer';
            node.addEventListener('mouseenter', (e) => {
                panel.innerHTML = nodeInfo[nodeId];
                positionPanel(e);
            });
            node.addEventListener('mousemove', positionPanel);
            node.addEventListener('mouseleave', () => {
                panel.innerHTML = 'Hover over a box to learn what each extraction stage does.';
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
