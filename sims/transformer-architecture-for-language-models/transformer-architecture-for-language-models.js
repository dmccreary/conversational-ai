// Transformer Architecture for Language Models - Mermaid diagram MicroSim
// CANVAS_HEIGHT: 1500
// Decoder-only transformer (the architecture behind modern LLMs). Information
// flows bottom-to-top from input tokens through embedding, positional encoding,
// stacked transformer blocks, and finally a softmax over the vocabulary.
// Tensor dimensions are shown at each stage to build intuition.

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

// flowchart BT = bottom-to-top, matching the upward flow of information.
const diagramDefinition = `flowchart BT
    Input["Input Text: The database is<br/>Token IDs 464, 14983, 318<br/>dim seq_len x 1"]:::ioNode
    Embed["Token Embedding Layer<br/>lookup table to dense vectors<br/>dim seq_len x 768"]:::embNode
    Pos["Positional Encoding<br/>add position info with sin and cos<br/>dim seq_len x 768"]:::embNode

    subgraph Block["Transformer Block (repeated N times, e.g. N=96)"]
        direction BT
        Attn["Multi-Head Self-Attention<br/>12 heads, causal masking<br/>softmax of QK^T over sqrt d_k times V"]:::attnNode
        AddN1["Add and Normalize<br/>residual + layer norm"]:::normNode
        FFN["Feed-Forward Network<br/>768 to 3072 to 768, GELU"]:::ffnNode
        AddN2["Add and Normalize<br/>residual + layer norm"]:::normNode
        Attn --> AddN1 --> FFN --> AddN2
    end

    FinalNorm["Final Layer Normalization<br/>dim seq_len x 768"]:::normNode
    Head["Output Projection - LM Head<br/>768 to 50000 per position<br/>dim seq_len x vocab"]:::embNode
    Softmax["Softmax and Sampling<br/>P backup = 0.23, P offline = 0.15<br/>pick next token"]:::ioNode

    Input --> Embed --> Pos --> Attn
    AddN2 --> FinalNorm --> Head --> Softmax

    classDef ioNode fill:#fff3cd,stroke:#333,stroke-width:2px,color:#212529,font-size:15px
    classDef embNode fill:#bbdefb,stroke:#333,stroke-width:2px,color:#0d2c54,font-size:15px
    classDef attnNode fill:#43a047,stroke:#333,stroke-width:2px,color:#fff,font-size:15px
    classDef ffnNode fill:#8e24aa,stroke:#333,stroke-width:2px,color:#fff,font-size:15px
    classDef normNode fill:#e0e0e0,stroke:#333,stroke-width:2px,color:#212529,font-size:15px

    linkStyle default stroke:#fb8c00,stroke-width:2px,font-size:14px`;

const nodeInfo = {
    'Input': 'Raw text is split into tokens and mapped to integer IDs. This is the only place text exists; everything above works on numbers. Shape: sequence_length x 1.',
    'Embed': 'A learned lookup table converts each token ID into a dense vector (e.g. 768 numbers). Similar tokens get similar vectors. Shape becomes seq_len x 768.',
    'Pos': 'Attention has no built-in notion of order, so position information is added to each embedding using sine and cosine patterns (or learned position vectors).',
    'Attn': 'Each token computes Query, Key, and Value vectors and attends to other tokens. Causal masking prevents a token from seeing future tokens, enforcing autoregression. 12 heads run in parallel.',
    'AddN1': 'A residual (skip) connection adds the attention input back to its output, then layer normalization stabilizes the values. This helps deep networks train.',
    'FFN': 'A two-layer MLP processes each position independently, expanding 768 to 3072 then back to 768 with a GELU nonlinearity. This is where much of the model capacity lives.',
    'AddN2': 'Another residual connection plus layer normalization closes the block. The output has the same shape as the input, so blocks can be stacked.',
    'FinalNorm': 'After the last transformer block, a final layer normalization cleans up the hidden states before projecting to vocabulary logits.',
    'Head': 'The language-model head is a linear layer projecting each 768-dim hidden state to a score for every token in the vocabulary (e.g. 50,000 scores per position).',
    'Softmax': 'Softmax turns the last positions scores into a probability distribution over the next token. The model then samples or takes the most likely token.',
    'Block': 'A transformer block = self-attention + feed-forward, each wrapped in a residual connection and layer norm. GPT-3 stacks 96 of these; larger models use 100+.'
};

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        subGraphTitleMargin: { top: 10, bottom: 14 }
    }
});

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
    const nodes = document.querySelectorAll('.node, .cluster');
    nodes.forEach(node => {
        let nodeId = node.id.replace('flowchart-', '').split('-')[0];
        if (!nodeInfo[nodeId] && node.classList.contains('cluster')) {
            nodeId = 'Block';
        }
        if (nodeInfo[nodeId]) {
            node.style.cursor = 'pointer';
            node.addEventListener('mouseenter', (e) => {
                panel.textContent = nodeInfo[nodeId];
                positionPanel(e);
            });
            node.addEventListener('mousemove', positionPanel);
            node.addEventListener('mouseleave', () => {
                panel.textContent = 'Hover over a layer to see what it does and its tensor dimensions.';
            });
        }
    });
}

async function render() {
    const el = document.getElementById('txDiagram');
    const { svg } = await mermaid.render('txSvg', diagramDefinition);
    el.innerHTML = svg;
    (function wait() {
        if (document.querySelectorAll('.node').length > 0) {
            setupNodeHover();
        } else {
            setTimeout(wait, 100);
        }
    })();
}

render();
