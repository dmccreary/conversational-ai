---
title: Entity Extraction Architecture
description: Mermaid block diagram showing how modern entity extraction combines rule-based, ML, and LLM strategies in parallel, then merges and links the results into a structured output.
image: entity-extraction-architecture.png
og:image: entity-extraction-architecture.png
status: draft
library: Mermaid
---

# Entity Extraction Architecture

Production chatbots rarely rely on a single technique to pull entities out of a
user's message. Instead they run several strategies **in parallel** and combine
their results. This diagram traces the query *"Book 2 tickets to Boston on March
15th for John Smith"* through three extraction branches (rules, an ML model, and
an LLM), a merging layer, and an entity-linking layer that produces a clean,
ID-linked dictionary. Hover over any box for details.

## Interactive Demo

<iframe src="main.html" width="100%" height="702" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following iframe:

```html
<iframe src="main.html" width="100%" height="702" scrolling="no"></iframe>
```

## Overview

The architecture has four conceptual layers:

1. **Parallel extraction** — the query flows simultaneously into three branches:
    - **Rules** (green) are fast and high-precision for well-structured data:
      regex patterns, a date parser ("March 15th"), and a number extractor ("2").
    - **ML model** (blue) is a BERT-based NER with a token-classification head;
      it returns typed entities with confidence scores (Person 0.94, Location 0.89).
    - **LLM** (purple) provides a flexible fallback, used mainly when the other
      branches are uncertain or the entity type is unusual.
2. **Merging** (orange) resolves conflicts. The priority order is
   **Rules > ML > LLM** for known patterns, and confidence scores are aggregated.
3. **Entity linking** (teal) canonicalizes mentions against a knowledge base:
   "Boston" becomes *Boston, MA* with ID `BST-MA-US`, and "John Smith" resolves
   to *Account #7834*.
4. **Structured output** (gray) is the final dictionary of normalized,
   ID-linked entities that downstream code can act on directly.

Combining deterministic rules, a trained model, and an LLM gives broad coverage
while keeping precision high where it matters.

## Lesson Plan

- **Compare the strategies:** Have students list the strengths and weaknesses of
  rules vs. ML vs. LLM extraction and explain why a system would use all three.
- **Trace the example:** Identify which branch extracts each entity in the sample
  query (quantity, date, destination, passenger).
- **Discuss conflict resolution:** Why is the priority Rules > ML > LLM? When
  might that order be wrong?
- **Explain entity linking:** Why is converting "Boston" to a canonical ID more
  useful than keeping the raw text?

## References

- [Chapter 6: Building Chatbots — Intent](../../chapters/06-building-chatbots-intent/index.md)
- [Named-entity recognition (Wikipedia)](https://en.wikipedia.org/wiki/Named-entity_recognition)
- [Entity linking (Wikipedia)](https://en.wikipedia.org/wiki/Entity_linking)
