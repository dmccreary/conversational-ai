---
title: NLP Pipeline Architecture
description: Layered architecture diagram showing how raw text flows through preprocessing, morphology, syntax, and semantic analysis to a structured output.
image: nlp-pipeline-architecture.png
og:image: nlp-pipeline-architecture.png
status: draft
library: Mermaid.js
---

# NLP Pipeline Architecture

This MicroSim shows the layered architecture of a complete natural language
processing pipeline. Raw user text enters at the top and is progressively
enriched as it passes through four processing layers, emerging at the bottom as
a structured representation ready for intent recognition and query execution.

## About This Diagram

The diagram is organized as horizontal swim lanes, one per processing layer.
A blue gradient from light to dark signals increasing linguistic
sophistication, while orange arrows mark the data transformation that happens
between layers. Hover any stage to read what it contributes.

## Interactive Demo

<iframe src="main.html" width="100%" height="1042" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="1042" scrolling="no"></iframe>
```

## How It Works

Each layer adds a different kind of structure:

- **Layer 1 - Text Preprocessing (Character Level):** normalization and
  tokenization turn a messy string into clean tokens.
- **Layer 2 - Morphological Analysis (Word Level):** stemming and
  lemmatization reduce words to their root forms.
- **Layer 3 - Syntactic Analysis (Word Level):** POS tagging and dependency
  parsing recover grammatical structure.
- **Layer 4 - Semantic Analysis (Sentence Level):** named entity recognition
  and coreference resolution capture meaning and entity relationships.

The label on each arrow shows what the previous layer hands to the next:
normalized tokens, root forms, grammatical tags, and entity relationships.

## Lesson Plan

- **Order the layers.** Ask students why morphology must precede syntax, and
  syntax must precede most semantics.
- **Trace the example.** Follow "last quarter sales" through each layer and
  predict what annotation gets added at each step.
- **Map the levels.** Connect the "Character / Word / Sentence" labels to the
  unit of analysis at each layer.
- **Discuss tradeoffs.** Compare stemming vs. lemmatization and when each is
  preferred in a production chatbot.

## References

- [Chapter 11: NLP Pipelines and Processing](../../chapters/11-nlp-pipelines-processing/index.md)
- [spaCy processing pipelines](https://spacy.io/usage/processing-pipelines)
- [Speech and Language Processing (Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/)
