---
title: RAG vs GraphRAG Architecture Comparison
description: A side-by-side architecture comparison of standard RAG and GraphRAG, highlighting structural differences, capability gaps, and a capability table.
image: rag-vs-graphrag-architecture-comparison.png
og:image: rag-vs-graphrag-architecture-comparison.png
status: draft
library: HTML/CSS/JavaScript
---

# RAG vs GraphRAG Architecture Comparison

Standard RAG and GraphRAG both ground a language model in your own data, but they
do it with very different architectures. This diagram places the two pipelines
side by side so you can see exactly where they diverge - and why GraphRAG unlocks
capabilities that flat document retrieval cannot.

## Diagram

<iframe src="main.html" width="100%" height="982" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="982" scrolling="no"></iframe>
```

## Overview

The left column shows **Standard RAG** in muted gray-blue tones: a linear pipeline
that embeds the query, runs a vector search over a flat document corpus, builds an
augmented prompt, and calls the LLM. Red callouts mark its limits - no multi-hop
reasoning, disconnected documents, and no lasting strategic asset.

The right column shows **GraphRAG** in full color. A query router decides whether a
question is best answered by the graph, by documents, or both, then runs a **dual
path**: a Cypher query against the knowledge graph alongside a vector search over
documents. The two result sets merge into a hybrid augmented prompt before the LLM
generates a response with structured citations. Green callouts highlight its
advantages - multi-hop traversal, relationship reasoning, and a reusable knowledge
graph (the "corporate nervous system").

A center **VS** separator divides the two, and the **capability table** at the
bottom summarizes where each approach excels. Hovering a table row gently
emphasizes the diagrams above.

## Lesson Plan

- **Spot the divergence:** Have students identify the first point in the pipeline
  where GraphRAG differs from standard RAG (the query router and dual path).
- **Map limits to advantages:** For each red callout on the left, find the green
  callout on the right that addresses it.
- **Read the table:** Discuss why both systems are "Excellent" at simple Q&A but
  differ sharply on relationship queries.
- **When to choose which:** Use the bottom annotations to argue when standard RAG
  is sufficient and when GraphRAG is worth the added complexity.

## References

- [Chapter 10: Knowledge Graphs and GraphRAG](../../chapters/10-knowledge-graphs-graphrag/index.md)
- [Chapter 9: RAG Pattern](../../chapters/09-rag-pattern/index.md)
- [Retrieval-Augmented Generation - Wikipedia](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
