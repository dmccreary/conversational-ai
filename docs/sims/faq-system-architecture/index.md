---
title: FAQ System Architecture
description: Mermaid data-flow diagram showing how an FAQ system processes a user question through input processing, semantic matching, retrieval, and response delivery, with a feedback loop.
image: faq-system-architecture.png
og:image: faq-system-architecture.png
status: draft
library: Mermaid
---

# FAQ System Architecture

A frequently-asked-questions bot answers a user by finding the stored question
that best matches what they typed and returning its answer. This diagram traces
the query *"how do I reset password"* through input processing, semantic matching
against an FAQ database, and response delivery, then shows how user feedback
flows back to improve the system. Hover over any box for details.

## Interactive Demo

<iframe src="main.html" width="100%" height="762" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following iframe:

```html
<iframe src="main.html" width="100%" height="762" scrolling="no"></iframe>
```

## Overview

The pipeline has five stages, color-coded in the diagram:

1. **User interface** (purple) — the chat window where the user asks a question
   and later reads the answer.
2. **Input processing** (blue) — text normalization (lowercasing, punctuation
   removal), synonym expansion, and embedding generation turn raw text into a
   numeric vector.
3. **Semantic matching** (green) — similarity calculation, ranking, and a
   confidence threshold compare the query vector against stored FAQs.
4. **FAQ database** (orange) — curated question-and-answer pairs stored as
   embeddings; the matching engine queries it and receives candidates.
5. **Response delivery** (teal) — the top-ranked answer is returned (here with
   confidence 0.87), and thumbs-up/down feedback loops back to the database.

The dotted feedback arrow is what lets the system improve over time: answers that
users mark unhelpful can be revised or re-ranked.

## Lesson Plan

- **Trace the flow:** Have students follow the query from the chat window to the
  returned answer, naming each stage.
- **Explain semantic matching:** Why use embeddings and similarity instead of
  exact keyword matching?
- **Discuss the threshold:** What should the bot do when no FAQ scores above the
  confidence threshold?
- **Analyze the feedback loop:** How does thumbs-up/down feedback make the system
  better, and what could go wrong with it?

## References

- [Chapter 6: Building Chatbots — Intent](../../chapters/06-building-chatbots-intent/index.md)
- [Semantic search (Wikipedia)](https://en.wikipedia.org/wiki/Semantic_search)
- [Word embedding (Wikipedia)](https://en.wikipedia.org/wiki/Word_embedding)
