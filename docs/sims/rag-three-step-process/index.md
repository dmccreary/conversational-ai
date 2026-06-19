---
title: RAG Three-Step Process
description: An interactive flowchart of the Retrieval-Augmented Generation pattern showing how a user query flows through retrieval, augmentation, and generation.
image: rag-three-step-process.png
og:image: rag-three-step-process.png
status: draft
library: Mermaid
---

# RAG Three-Step Process

Retrieval-Augmented Generation (RAG) grounds a large language model's answers in
your own documents. This diagram traces a single user question through the three
sequential steps of the pattern - **Retrieval**, **Augmentation**, and
**Generation** - and shows the data stores that support each step. Hover over any
node to read what happens there.

## Interactive Demo

<iframe src="main.html" width="100%" height="962" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="962" scrolling="no"></iframe>
```

## Overview

The flowchart reads top to bottom and uses color to distinguish the kinds of
elements in a RAG pipeline:

- **Green** nodes are the user-facing input (the query) and output (the response).
- **Blue** rectangles are the three process steps that the RAG system performs.
- **Orange** parallelograms are the intermediate data produced between steps:
  the retrieved documents and the augmented prompt.
- **Purple** cylinders are the data stores: the document corpus that is embedded
  ahead of time and the vector database that serves similarity searches.

Solid arrows show the primary flow of control, while dashed arrows show data
retrieval and the supporting flows (such as embedding the corpus into the vector
database or passing the original query forward into augmentation).

## Lesson Plan

- **Trace the flow:** Have students follow the query from top to bottom, naming
  each of the three RAG steps in order.
- **Identify the stores:** Ask why the document corpus and vector database are
  drawn as separate side elements rather than process steps.
- **Compare to a plain LLM:** Discuss what each step adds that a bare LLM call
  (with no retrieval) would lack.
- **Hover and summarize:** Students hover each node and write a one-sentence
  summary of its role, then reassemble the sentences into a paragraph describing
  RAG end to end.

## References

- [Chapter 9: RAG Pattern](../../chapters/09-rag-pattern/index.md)
- [Mermaid.js Documentation](https://mermaid.js.org/)
