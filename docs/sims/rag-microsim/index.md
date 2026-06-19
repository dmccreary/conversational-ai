---
title: RAG MicroSim
description: An interactive p5.js simulator that runs the three RAG steps - retrieval, augmentation, and generation - on a mini document corpus you can query.
image: rag-microsim.png
og:image: rag-microsim.png
status: draft
library: p5.js
---

# RAG MicroSim

This MicroSim lets you experiment with Retrieval-Augmented Generation end to end.
Type a question, choose a document corpus, and run the three RAG steps. You will
see which documents are retrieved (with relevance scores), how the augmented prompt
is assembled from color-coded sections, and what response the system generates.

## Interactive Demo

<iframe src="main.html" width="100%" height="742" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="742" scrolling="no"></iframe>
```

## Overview

The simulator is divided into three working areas:

- **Top:** a query box and a corpus selector (Company Policies, Product Docs, or
  HR Handbook). Selecting a corpus loads a sample question.
- **Left panel:** the top-K **retrieved documents**, each with a green relevance
  bar and a numeric score. The best match is highlighted.
- **Right panel:** the **augmented prompt** built from three color-coded sections -
  `[System]` in purple, `[Context]` in orange, `[Query]` in blue - followed by the
  **generated response**.

A three-step progress indicator shows which stage is running. Pressing **Run RAG
Process** animates through Retrieval, Augmentation, and Generation in sequence.

**Controls:**

- **K slider (1-10):** how many documents to retrieve.
- **Temperature slider (0-1):** simulated generation variability; it changes how
  the response is phrased.
- **Include sources in prompt** checkbox: toggles whether document titles are cited.
- **Run RAG Process** and **Reset** buttons.

Retrieval uses keyword-overlap scoring as a stand-in for cosine similarity over
embeddings, and generation is template-based - no real model is called - so the
behavior is deterministic and easy to reason about.

## Lesson Plan

- **Vary K:** Set K to 1, then to 5, and discuss how more documents change the
  context (and the risk of irrelevant material).
- **Inspect the prompt:** Have students point to the `[System]`, `[Context]`, and
  `[Query]` sections and explain each one's job.
- **Toggle sources:** Turn off "Include sources" and discuss what is lost for
  citations and trust.
- **Different queries:** Ask the same question against different corpora and observe
  how retrieval scores shift.
- **Temperature:** Compare a low-temperature and high-temperature response and
  relate it to factual reliability.

## References

- [Chapter 9: RAG Pattern](../../chapters/09-rag-pattern/index.md)
- [Retrieval-Augmented Generation - Wikipedia](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
- [p5.js Reference](https://p5js.org/reference/)
