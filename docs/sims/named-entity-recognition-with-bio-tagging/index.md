---
title: Named Entity Recognition with BIO Tagging
description: Interactive p5.js MicroSim that labels each token in a sentence with BIO tags, showing how NER models mark entity boundaries and types.
image: named-entity-recognition-with-bio-tagging.png
og:image: named-entity-recognition-with-bio-tagging.png
status: draft
library: p5.js
---

# Named Entity Recognition with BIO Tagging

Named Entity Recognition (NER) finds the people, organizations, locations, and
dates in text. Models do this by labeling **every token** with a tag using the
**BIO scheme**: `B-` marks the *beginning* of an entity, `I-` marks a token
*inside* (continuing) that entity, and `O` marks tokens *outside* any entity.
This MicroSim shows that token-by-token labeling for several example sentences,
color-coded by entity type, and lets you tag your own sentence.

## Interactive Demo

<iframe src="main.html" width="100%" height="534" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following iframe:

```html
<iframe src="main.html" width="100%" height="534" scrolling="no"></iframe>
```

## Overview

Each token appears in a box. The box's **background color** encodes the entity
type (blue = PERSON, orange = ORG, green = LOC, yellow = DATE, purple = MISC,
white = O), and the small text below the token shows its **BIO tag**. A bracket
links each `I-` token back to the `B-` token that started the entity, making
multi-token entities like *"San Francisco"* easy to see.

Controls:

- **Example dropdown** — choose one of five pre-labeled sentences.
- **Show BIO tags** — toggle the `B-/I-/O` labels under each token.
- **Show entity types** — toggle the entity-type label.
- **Highlight entities only** — fade the `O` (non-entity) tokens to 35% opacity
  so the entities stand out.
- **Tag Custom Sentence** — type your own sentence and run a simple rule-based
  tagger (consecutive capitalized words become a MISC entity; months and 4-digit
  years become DATE). This is intentionally naive so students can see where
  rule-based NER succeeds and fails compared to the curated examples.

Hover over any token to see its full annotation (token, BIO tag, entity type).

## Lesson Plan

- **Read the tags:** Have students explain why "San" is `B-LOC` and "Francisco"
  is `I-LOC`, and why "works" is `O`.
- **Find boundaries:** Use "Highlight entities only" to identify entity spans,
  then turn tags back on to check.
- **Test the rule-based tagger:** Type a sentence and predict the tags before
  clicking. Where does the simple rule get it wrong (e.g., capitalized first word
  of a sentence)? Why do real models use context?
- **Compare entity types:** Switch between the five examples and list which entity
  types each one contains.

## References

- [Chapter 6: Building Chatbots — Intent](../../chapters/06-building-chatbots-intent/index.md)
- [Named-entity recognition (Wikipedia)](https://en.wikipedia.org/wiki/Named-entity_recognition)
- [Inside-outside-beginning tagging (Wikipedia)](https://en.wikipedia.org/wiki/Inside%E2%80%93outside%E2%80%93beginning_(tagging))
