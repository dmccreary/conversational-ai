---
title: POS Tagging Process Flow
description: Flowchart of the part-of-speech tagging algorithm, showing how a tagger uses statistical probabilities and context to label each word.
image: pos-tagging-process-flow.png
og:image: pos-tagging-process-flow.png
status: draft
library: Mermaid.js
---

# POS Tagging Process Flow

This MicroSim traces how a part-of-speech (POS) tagger assigns a grammatical
tag to every word in a sentence. It uses a trained statistical model, processes
words left-to-right so it can use context, and falls back to heuristics for
words it has never seen. Hover any step to read what happens there.

## About This Diagram

The flowchart follows one word at a time around a loop. Color tells you what
kind of work each step does: blue for input and output, green for probability
calculations, yellow for decisions, and purple for unknown-word handling.

## Interactive Demo

<iframe src="main.html" width="100%" height="1142" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="1142" scrolling="no"></iframe>
```

## How It Works

1. **Input** a tokenized sentence such as `[Can, you, show, sales, ?]`.
2. **Initialize** by loading the trained model: emission probabilities
   `P(tag | word)` and transition probabilities `P(tag | previous_tags)`.
3. **For each word**, look the word up in the vocabulary.
4. **Decision - word known?** If yes, use the trained probabilities (Viterbi);
   if no, apply unknown-word heuristics based on capitalization and suffixes.
5. **Assign** the most probable tag given the word and the context history.
6. **Decision - more words?** Loop back if tokens remain; otherwise return the
   tagged sequence and hand it to the parser.

The example panel shows how the ambiguous word "show" is resolved: the model
weighs `P(VB|show)=0.65` against `P(NN|show)=0.35`, and the modal context
"Can you ___" pushes the choice toward the verb tag **VB**.

## Lesson Plan

- **Walk the loop.** Have students follow one word at a time and note where the
  flow branches and where it loops back.
- **Resolve ambiguity.** Discuss why context matters for words like "show" or
  "sales" that can be more than one part of speech.
- **Handle the unknown.** Brainstorm suffix and capitalization rules for words
  the model never saw in training.
- **Connect downstream.** Explain why POS tags are a prerequisite for
  dependency parsing and entity extraction.

## References

- [Chapter 11: NLP Pipelines and Processing](../../chapters/11-nlp-pipelines-processing/index.md)
- [Part-of-speech tagging (Wikipedia)](https://en.wikipedia.org/wiki/Part-of-speech_tagging)
- [Viterbi algorithm (Wikipedia)](https://en.wikipedia.org/wiki/Viterbi_algorithm)
