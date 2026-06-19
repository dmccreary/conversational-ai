---
title: Word Embedding Vector Space Visualization
description: Chart.js scatter plot showing how word embeddings place semantically related words close together in vector space, with color-coded clusters and a king-to-queen relationship arrow.
image: word-embedding-vector-space-visualization.png
og:image: word-embedding-vector-space-visualization.png
status: draft
library: Chart.js
---

# Word Embedding Vector Space Visualization

Word embeddings turn words into vectors so that words with similar meanings end up
near each other in space. This scatter plot is a 2D projection of that space,
showing four semantic clusters - royalty, animals, technology, and verbs - with
the words in each cluster grouped together.

## Interactive Demo

<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Hover over any point to see the word and its cluster. The dashed circles outline
each semantic group, and the arrow from "king" to "queen" illustrates that a
consistent direction in the space can encode a relationship such as gender.

To embed this MicroSim in another page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>
```

## Overview

Each colored dot is a word positioned by its embedding. Words that appear in
similar contexts - "cat", "dog", "bird" - cluster together, while unrelated words
land far apart. The two axes are abstract semantic-feature dimensions; real
embeddings live in 100 to 300 dimensions, so this is a flattened view.

## How It Works

- **Clusters** - royalty (purple), animals (green), technology (blue), and verbs
  (orange) each occupy their own region of the plot.
- **Cluster rings** - dashed circles highlight the boundary of each semantic
  group.
- **Relationship arrow** - the king to queen arrow labeled "gender" shows that
  word embeddings can capture analogies as directions in the space (the basis of
  the famous king - man + woman = queen result).
- **Proximity = similarity** - the closer two words are, the more similar their
  meanings, which is exactly what powers semantic search and retrieval.

## Lesson Plan

- **Warm up:** Ask students to guess which words should be near "king" before
  revealing the plot.
- **Explore:** Hover several points and confirm that same-cluster words are
  neighbors while cross-cluster words are far apart.
- **Discuss:** What does the king-to-queen arrow suggest about how analogies are
  represented? Could the same direction map prince to princess?
- **Extend:** Have students propose a fifth cluster (e.g. foods) and predict where
  it would sit relative to the existing groups.

## References

- [Chapter 5: Embeddings and Vector Databases](../../chapters/05-embeddings-vector-databases/index.md)
- [Word embedding - Wikipedia](https://en.wikipedia.org/wiki/Word_embedding)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
