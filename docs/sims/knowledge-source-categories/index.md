---
title: Knowledge Source Categories
description: A diagram contrasting external (public) and internal (private) knowledge sources and how a RAG system retrieves from both based on user permissions.
image: knowledge-source-categories.png
og:image: knowledge-source-categories.png
status: draft
library: SVG
---

# Knowledge Source Categories

A Retrieval-Augmented Generation system can draw on two very different kinds of
knowledge. **External knowledge** lives in public sources that anyone can read,
while **internal knowledge** lives in private documents that require
authentication and authorization. This diagram shows both domains and the central
RAG system that retrieves from each based on the requesting user's permissions.

## Interactive Demo

<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>
```

## Overview

The diagram is divided by a dashed boundary line into two domains:

- **External Knowledge (green, left):** Public knowledge bases such as Wikipedia,
  ArXiv, news feeds, and Stack Overflow. These require no authentication - anyone
  can access them.
- **Internal Knowledge (blue, right):** Private documents such as the company
  wiki, internal databases, email, and file shares. Access requires both
  authentication (proving who you are) and authorization (proving you are allowed
  to see it).

The **RAG System (purple, center)** sits above both domains with bidirectional
arrows to each. At query time it decides which sources to retrieve from based on
the user's identity and permissions, so two different users can ask the same
question and receive answers grounded in different document sets.

## Lesson Plan

- **Classify sources:** Give students a list of knowledge sources and have them
  sort each into external/public or internal/private.
- **Discuss access control:** Explain why internal knowledge needs authentication
  *and* authorization, not just one or the other.
- **Permission scenarios:** Walk through how the same query could return
  different results for an executive versus a contractor.
- **Design exercise:** Ask students to extend the diagram with a third domain
  (for example, partner/shared knowledge) and decide its access rules.

## References

- [Chapter 9: RAG Pattern](../../chapters/09-rag-pattern/index.md)
- [Retrieval-Augmented Generation (Wikipedia)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
