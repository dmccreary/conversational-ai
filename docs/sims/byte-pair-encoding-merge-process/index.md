---
title: Byte Pair Encoding Merge Process
description: Interactive flowchart showing how Byte Pair Encoding iteratively merges the most frequent character pairs to build a subword vocabulary.
image: byte-pair-encoding-merge-process.png
og:image: byte-pair-encoding-merge-process.png
status: draft
library: Mermaid.js
---

# Byte Pair Encoding Merge Process

Byte Pair Encoding (BPE) is the tokenization algorithm behind most modern large
language models. It starts from individual characters and repeatedly merges the
most frequent adjacent pair, gradually learning subwords and whole words from
corpus statistics. This diagram walks through that merge loop step by step.

## Interactive Demo

<iframe src="main.html" width="100%" height="1642" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Hover over any node in the flowchart to read an explanation of that step in the
right-hand info panel.

To embed this MicroSim in another page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="1642" scrolling="no"></iframe>
```

## Overview

This MicroSim visualizes the core loop of subword tokenization. Rather than
treating words as fixed units or splitting everything into characters, BPE finds
a middle ground by learning which character sequences are worth keeping together.

## How It Works

The diagram follows a top-to-bottom flow:

1. **Training Corpus** - words are counted with their frequencies.
2. **Initial Vocabulary** - every word is split into single characters; the
   starting vocabulary is just the distinct characters.
3. **Pair Frequency Analysis** - BPE counts every adjacent character pair and
   greedily selects the most frequent one.
4. **Iterations 1-N** - each iteration merges one pair into a new token. Early
   merges produce short subwords (`da`, `ta`); later merges combine those into
   whole words (`data`, `base`, `database`).
5. **Learned Tokens & Final Tokenization** - frequent words collapse to a single
   token, while rare words fall back to learned subwords, so nothing is ever
   out-of-vocabulary.

The color key distinguishes character tokens, early subword merges, later
subword merges, and complete words that became single tokens.

## Lesson Plan

- **Warm up:** Ask students to tokenize "database" by hand into characters, then
  predict which pair appears most often across the corpus.
- **Explore:** Step through each iteration node and note how the vocabulary size
  grows while the token count per word shrinks.
- **Discuss:** Why does frequency-based merging make common words cheap to encode
  but still allow rare words to be represented?
- **Extend:** Have students apply two merge steps to a new word (e.g.
  "backups") and compare against the diagram's final tokenization rule.

## References

- [Chapter 4: Large Language Models Tokenization](../../chapters/04-large-language-models-tokenization/index.md)
- [Byte Pair Encoding (Wikipedia)](https://en.wikipedia.org/wiki/Byte_pair_encoding)
- [Mermaid.js Documentation](https://mermaid.js.org/)
