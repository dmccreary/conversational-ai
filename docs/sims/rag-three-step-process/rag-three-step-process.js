// RAG Three-Step Process
// CANVAS_HEIGHT: 960
// Mermaid flowchart hover-info logic. The diagram definition lives in main.html;
// this file maps each node id to an educational description shown in the right panel.

const nodeInfo = {
    'Q': "User asks: \"What is our company's remote work policy?\" This natural-language question is the entry point to the RAG pipeline.",
    'R': "Step 1 - Retrieval: Search the document corpus for relevant documents using semantic search with embeddings. Returns the top K most similar documents.",
    'DOCS': "Retrieved Documents. Example results: Employee Handbook (2023), Remote Work Guidelines, IT Security Policy.",
    'A': "Step 2 - Augmentation: Combine the user's original query with the retrieved document content to build an enriched prompt.",
    'PROMPT': "Augmented Prompt contains: System instructions + retrieved document excerpts + the original user query.",
    'G': "Step 3 - Generation: Send the augmented prompt to the LLM. The model generates a response grounded in both its training and the provided context.",
    'RESP': "The chatbot responds: \"According to our 2023 Employee Handbook, employees may work remotely up to 3 days per week...\"",
    'CORPUS': "Document Corpus: the raw collection of company documents that gets embedded and indexed ahead of time.",
    'VDB': "Vector Database: stores document embeddings and performs fast nearest-neighbor similarity search at query time."
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
            node.addEventListener('mouseenter', (e) => {
                panel.textContent = nodeInfo[nodeId];
                positionPanel(e);
            });
            node.addEventListener('mousemove', positionPanel);
            node.addEventListener('mouseleave', () => {
                panel.textContent = 'Hover a node for details.';
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
