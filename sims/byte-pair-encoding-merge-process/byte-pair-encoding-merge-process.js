// Byte Pair Encoding Merge Process - Mermaid flowchart MicroSim
// CANVAS_HEIGHT: 1640
// Shows how BPE iteratively merges the most frequent character pairs in a
// training corpus to build a subword vocabulary. Top-down flow with an
// info panel that explains each step on hover.

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

// Mermaid diagram definition. Use <br/> for line breaks (never \n).
const diagramDefinition = `flowchart TD
    Corpus["Training Corpus<br/>database x100, data x80<br/>backup x90, based x70"]:::corpusNode
    Chars["Initial Vocabulary - 10 characters<br/>a b c d e k p s t u<br/>database to d a t a b a s e"]:::charNode
    Freq["Pair Frequency Analysis<br/>da=180  ta=180  se=170  ba=160<br/>pick most frequent pair"]:::freqNode
    Iter1["Iteration 1: Merge da freq=180<br/>vocab + da  (size 11)<br/>database to da t a b a s e"]:::earlyNode
    Iter2["Iteration 2: Merge ta freq=180<br/>vocab + ta  (size 12)<br/>database to da ta b a s e"]:::earlyNode
    Iter3["Iteration 3: Merge data freq=180<br/>vocab + data  (size 13)<br/>database to data b a s e"]:::lateNode
    Iter4["Iteration 4: Merge ba then base<br/>vocab + ba + base<br/>database to data base"]:::lateNode
    IterN["After N iterations<br/>Vocabulary size = 30,000<br/>common patterns became tokens"]:::lateNode
    Final["Learned Tokens<br/>database  data  backup  base"]:::wordNode
    Examples["Final Tokenization<br/>database to one token<br/>databases to database + s"]:::wordNode

    Corpus --> Chars --> Freq
    Freq -->|merge| Iter1 -->|merge| Iter2 -->|merge| Iter3 -->|merge| Iter4 -->|merge| IterN
    IterN --> Final --> Examples

    classDef corpusNode fill:#fff3cd,stroke:#333,stroke-width:2px,color:#212529,font-size:15px
    classDef charNode fill:#e0e0e0,stroke:#333,stroke-width:2px,color:#212529,font-size:15px
    classDef freqNode fill:#fb8c00,stroke:#333,stroke-width:2px,color:#fff,font-size:15px
    classDef earlyNode fill:#bbdefb,stroke:#333,stroke-width:2px,color:#0d2c54,font-size:15px
    classDef lateNode fill:#1976d2,stroke:#333,stroke-width:2px,color:#fff,font-size:15px
    classDef wordNode fill:#2e7d32,stroke:#333,stroke-width:2px,color:#fff,font-size:15px

    linkStyle default stroke:#fb8c00,stroke-width:2px,font-size:14px`;

// Hover descriptions keyed by Mermaid node id.
const nodeInfo = {
    'Corpus': 'The training corpus contains words with frequency counts. BPE uses these statistics to decide which character pairs are worth merging.',
    'Chars': 'Every word starts split into single characters. The initial vocabulary is just the 10 distinct characters seen in the corpus.',
    'Freq': 'BPE counts how often each adjacent character pair appears across the whole corpus, then greedily picks the most frequent pair to merge next.',
    'Iter1': 'Merge the pair "da" (frequency 180). The new token "da" is added to the vocabulary and every occurrence of d-a is replaced.',
    'Iter2': 'Merge "ta" (frequency 180). After this, "data" is represented as the two subword tokens da + ta.',
    'Iter3': 'Now da and ta form a frequent pair, so they merge into the whole word "data" as a single token. Merges build on earlier merges.',
    'Iter4': 'Continuing, "ba" then "base" merge. The word "database" is now just data + base, two tokens.',
    'IterN': 'After thousands of iterations the vocabulary reaches a target size (e.g. 30,000). Frequency-based merging ensures common patterns become single tokens.',
    'Final': 'Frequent whole words like database, data, and backup end up as single learned tokens, which makes encoding short and efficient.',
    'Examples': 'Common words become one token. Rare words like "databases" fall back to learned subwords (database + s), so nothing is ever truly out-of-vocabulary.'
};

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
});

// Info panel follow-Y logic.
function positionPanel(evt) {
    const panel = document.getElementById('panel');
    const panelWrap = document.getElementById('panelWrap');
    const r = panelWrap.getBoundingClientRect();
    const panelH = panel.offsetHeight || 120;
    const wrapH = panelWrap.offsetHeight;
    const y = evt.clientY - r.top - 20;
    const top = Math.max(8, Math.min(wrapH - panelH - 20, y));
    panel.style.top = `${top}px`;
}

function setupNodeHover() {
    const panel = document.getElementById('panel');
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
                panel.textContent = 'Hover over a node to see how each Byte Pair Encoding step works.';
            });
        }
    });
}

async function render() {
    const el = document.getElementById('bpeDiagram');
    const { svg } = await mermaid.render('bpeSvg', diagramDefinition);
    el.innerHTML = svg;
    // Poll until nodes exist, then wire up hover.
    (function wait() {
        if (document.querySelectorAll('.node').length > 0) {
            setupNodeHover();
        } else {
            setTimeout(wait, 100);
        }
    })();
}

render();
