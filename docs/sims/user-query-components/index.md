---
title: User Query Components
description: Mermaid flowchart showing how a natural-language user query splits into an intent and entities that combine into an actionable, structured request.
image: user-query-components.png
og:image: user-query-components.png
status: draft
library: Mermaid
---

# User Query Components

Every user message to a chatbot carries two kinds of information: **what the user
wants** (the *intent*) and **the specifics** (the *entities*). This diagram takes
the query *"Book a flight to San Francisco next Tuesday"* and shows how the system
pulls the intent and entities apart, then recombines them into a single
**actionable request** the backend can execute. Hover over any box for details.

## Interactive Demo

<iframe src="main.html" width="100%" height="492" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following iframe:

```html
<iframe src="main.html" width="100%" height="492" scrolling="no"></iframe>
```

## Overview

The diagram has three conceptual layers:

1. **Natural language input** (gray, top) — the raw query.
2. **Semantic understanding** (middle) — the query branches into:
    - **Intent** (blue): "Book Flight", which selects the system action.
    - **Entities** (indigo), which contain typed values:
      *Destination = San Francisco* (orange) and *Date = next Tuesday* (green).
3. **Structured output** (bottom) — the intent drives a **System Action**
   ("Search available flights"), while the entities fill **Parameters** (the
   dotted "fills slot" arrows). Together they produce the **Actionable Request**.

The key idea is that understanding a query means *both* classifying the intent
*and* extracting the entities; neither alone is enough to act.

## Lesson Plan

- **Separate the parts:** Have students underline the intent and the entities in
  several example queries.
- **Trace the slots:** Follow the dotted "fills slot" arrows and explain why the
  entities map to parameters.
- **Why both?** Discuss what would go wrong if the system knew the intent but not
  the entities (or vice versa).
- **Write your own:** Have students invent a query and draw its intent, entities,
  and the resulting actionable request.

## References

- [Chapter 6: Building Chatbots — Intent](../../chapters/06-building-chatbots-intent/index.md)
- [Natural language understanding (Wikipedia)](https://en.wikipedia.org/wiki/Natural-language_understanding)
- [Slot filling (dialogue systems)](https://en.wikipedia.org/wiki/Dialogue_system)
