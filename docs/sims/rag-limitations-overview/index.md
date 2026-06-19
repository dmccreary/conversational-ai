---
title: RAG Limitations Overview
description: An interactive infographic covering the three main categories of RAG limitations - context length, hallucination, and factual accuracy - with examples and mitigations.
image: rag-limitations-overview.png
og:image: rag-limitations-overview.png
status: draft
library: HTML/CSS/JavaScript
---

# RAG Limitations Overview

Retrieval-Augmented Generation is powerful, but it is not magic. This interactive
infographic groups the most common RAG failures into three categories - **context
length limits**, **hallucination**, and **factual accuracy** - and pairs each with
a concrete example and a set of mitigation strategies. It closes by pointing to
GraphRAG for the cases where standard RAG simply cannot keep up.

## Interactive Demo

<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>
```

## Overview

Each of the three cards represents a category of limitation:

- **Context Length Limits (blue):** When the relevant material is larger than the
  model's context window, you must drop documents and risk losing critical detail.
- **Hallucination (red):** The model can generate fluent, confident text that is
  not supported by - or even contradicts - the retrieved context.
- **Factual Accuracy (orange):** When the corpus itself is outdated, contradictory,
  or incomplete, the answer inherits those flaws.

**Interactions:**

- **Hover** any card to reveal its mitigation strategies, which slide in below the
  impact statement.
- **Click** the colored example box to expand a detailed walkthrough of the
  scenario, and click again to collapse it.
- A **warning icon** in the corner of each card marks it as a severity hotspot.

The bottom panel, **"When RAG Isn't Enough,"** links forward to GraphRAG for
multi-hop reasoning and relationship analysis.

## Lesson Plan

- **Name the failure:** Present students with a flawed RAG answer and have them
  classify which of the three limitations it illustrates.
- **Match the mitigation:** For each card, ask students to predict the mitigations
  before hovering to reveal them.
- **Severity ranking:** Discuss which limitation is most dangerous in a given
  domain (for example, medical versus marketing).
- **Bridge to GraphRAG:** Use the bottom panel to motivate why a graph-based
  approach addresses the relationship and reasoning gaps RAG leaves open.

## References

- [Chapter 9: RAG Pattern](../../chapters/09-rag-pattern/index.md)
- [Chapter 10: Knowledge Graphs and GraphRAG](../../chapters/10-knowledge-graphs-graphrag/index.md)
- [Hallucination (artificial intelligence) - Wikipedia](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence))
