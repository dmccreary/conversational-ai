---
title: Transformer Architecture for Language Models
description: Interactive diagram of a decoder-only transformer showing the upward flow from token IDs through attention and feed-forward blocks to a next-token probability distribution.
image: transformer-architecture-for-language-models.png
og:image: transformer-architecture-for-language-models.png
status: draft
library: Mermaid.js
---

# Transformer Architecture for Language Models

The decoder-only transformer is the architecture behind modern large language
models such as GPT and Claude. This diagram traces the upward flow of information
from raw token IDs, through token embeddings, positional encoding, a stack of
transformer blocks, and finally a softmax that produces a probability
distribution over the next token. Tensor dimensions are annotated at each stage.

## Interactive Demo

<iframe src="main.html" width="100%" height="1502" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Hover over any layer (or the transformer block) to read what it does and the
shape of the data flowing through it.

To embed this MicroSim in another page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="1502" scrolling="no"></iframe>
```

## Overview

A transformer turns a sequence of token IDs into a prediction for the next token.
Unlike recurrent networks, it processes all tokens in parallel and uses
self-attention so that each token can draw on context from the others, subject
to a causal mask that prevents looking ahead.

## How It Works

Reading the diagram from bottom to top:

1. **Input Text -> Token IDs** - text is split into tokens and mapped to integers.
2. **Token Embedding** - each ID becomes a dense 768-dimensional vector.
3. **Positional Encoding** - position information is added so order matters.
4. **Transformer Block (x N)** - each block applies multi-head self-attention,
   then a feed-forward network, each wrapped in a residual connection and layer
   normalization. GPT-3 stacks 96 such blocks.
5. **Final Layer Norm -> LM Head** - the final hidden states are normalized and
   projected to one score per vocabulary token (e.g. 50,000 scores per position).
6. **Softmax & Sampling** - scores become probabilities; the model samples or
   picks the most likely next token.

Key ideas illustrated: parallel processing, self-attention with causal masking,
residual connections, and deep stacking.

## Lesson Plan

- **Warm up:** Ask why a model that processes tokens in parallel still needs to
  know their order, motivating positional encoding.
- **Explore:** Hover each layer and record how the tensor shape changes (or stays
  the same) as data flows upward.
- **Discuss:** What does causal masking prevent, and why is it essential for
  next-token prediction?
- **Extend:** Have students estimate how the parameter count grows when N goes
  from 12 to 96 layers.

## References

- [Chapter 4: Large Language Models Tokenization](../../chapters/04-large-language-models-tokenization/index.md)
- [Attention Is All You Need (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
- [Transformer (deep learning architecture) - Wikipedia](https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture))
