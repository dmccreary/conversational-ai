---
title: Embedding Model Comparison
description: Side-by-side diagram comparing how Word2Vec, GloVe, and FastText learn word embeddings, with a feature comparison table.
image: embedding-model-comparison.png
og:image: embedding-model-comparison.png
status: draft
library: HTML/CSS/JS
---

# Embedding Model Comparison

Word2Vec, GloVe, and FastText all produce word embeddings, but they get there in
very different ways. This diagram places the three approaches side by side so you
can see how their training inputs, learning mechanisms, and outputs differ.

## Interactive Demo

<iframe src="main.html" width="100%" height="652" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Hover over any box (or a model's panel title) to read how that part of the model
works.

To embed this MicroSim in another page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="652" scrolling="no"></iframe>
```

## Overview

Each panel reads top to bottom. Word2Vec (blue) predicts context words from a
target; GloVe (green) factorizes a global co-occurrence matrix; FastText (orange)
builds words from character n-grams. The purple boxes mark the shared idea: a
dense, low-dimensional embedding vector is the end product in every case.

## How It Works

- **Word2Vec (Skip-gram)** learns by predicting the words around a target word.
  The hidden layer weights become the embeddings. It uses only local context.
- **GloVe** starts from corpus-wide co-occurrence counts and factorizes that
  matrix, so it captures global statistics directly.
- **FastText** decomposes each word into character n-grams and averages their
  vectors, which lets it embed words it never saw during training.

## Feature Comparison

| Feature | Word2Vec | GloVe | FastText |
|---------|----------|-------|----------|
| Training paradigm | Local context prediction | Global statistics | Subword local context |
| Out-of-vocabulary handling | No | No | Yes |
| Training speed | Fast | Medium | Fast |
| Memory efficiency | High | Medium (large matrix) | Medium (n-grams) |
| Captures morphology | No | No | Yes |

## Lesson Plan

- **Warm up:** Ask how a model could possibly embed a word it never saw during
  training, motivating FastText's subword approach.
- **Explore:** Hover each panel and trace the path from input to final embedding,
  noting where the 300-dimensional vector appears.
- **Discuss:** Why might GloVe need more memory than Word2Vec? When would you
  prefer FastText despite its extra bookkeeping?
- **Extend:** Have students decide which model to use for a domain full of rare
  technical terms and justify the choice using the comparison table.

## References

- [Chapter 5: Embeddings and Vector Databases](../../chapters/05-embeddings-vector-databases/index.md)
- [Word2Vec - Wikipedia](https://en.wikipedia.org/wiki/Word2vec)
- [GloVe (machine learning) - Wikipedia](https://en.wikipedia.org/wiki/GloVe_(machine_learning))
- [fastText - Wikipedia](https://en.wikipedia.org/wiki/FastText)
