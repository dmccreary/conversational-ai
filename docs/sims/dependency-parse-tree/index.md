---
title: Dependency Parse Tree
description: Interactive dependency parse tree for the sentence "Show me the sales report for the last quarter" with color-coded grammatical relations.
image: dependency-parse-tree.png
og:image: dependency-parse-tree.png
status: draft
library: Mermaid.js
---

# Dependency Parse Tree

This MicroSim visualizes the dependency parse tree for the example sentence
*"Show me the sales report for the last quarter."* Dependency parsing reveals
the grammatical relationships between words: which word is the head (governor)
and which words depend on it. Hover over any word to see its part-of-speech
tag and its grammatical role.

## About This Diagram

A dependency parse tree is a directed graph in which each word points to the
word it grammatically depends on. This MicroSim turns the abstract idea of
"grammatical structure" into a concrete, color-coded tree so learners can see
how a conversational AI system recovers meaning from word order.

## Interactive Demo

<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>
```

## How It Works

The verb **Show (VB)** is the root of the sentence. Every other word ultimately
depends on it. Each edge is labeled with a Universal Dependencies relation and
color-coded by category:

- **Red** edges are core arguments: `dative` (the recipient "me") and `dobj`
  (the direct object "report").
- **Blue** edges are modifiers: `det` (determiner "the"), `compound`
  ("sales report"), and `amod` (adjective "last").
- **Green** edges are prepositional attachments: `prep` (the preposition "for")
  and `pobj` (its object "quarter").

Reading the tree top-down shows how a chatbot's NLP layer turns a flat string of
tokens into a structured grammar that downstream intent and entity extraction
can exploit.

## Lesson Plan

- **Identify the root.** Ask students which word governs the whole sentence and
  why a verb is usually the root.
- **Trace a phrase.** Follow the green `prep`/`pobj` edges to see how the
  prepositional phrase "for the last quarter" attaches to "report".
- **Classify relations.** Have students sort the eight edges into core
  arguments, modifiers, and prepositional attachments using the color key.
- **Compare to POS tagging.** Discuss how POS tags (shown in parentheses) are a
  prerequisite for building this dependency structure.

## References

- [Chapter 11: NLP Pipelines and Processing](../../chapters/11-nlp-pipelines-processing/index.md)
- [Universal Dependencies project](https://universaldependencies.org/)
- [spaCy dependency parsing](https://spacy.io/usage/linguistic-features#dependency-parse)
