---
title: Dimensionality Reduction Visualization
description: Interactive p5.js MicroSim that projects 30 high-dimensional word embeddings to 2D and lets students compare PCA, t-SNE, and UMAP layouts.
image: dimensionality-reduction-visualization.png
og:image: dimensionality-reduction-visualization.png
status: draft
library: p5.js
---

# Dimensionality Reduction Visualization

Word embeddings live in hundreds of dimensions, far too many to see directly.
Dimensionality reduction projects those vectors down to two dimensions while
trying to preserve the relative distances between words. This MicroSim lets you
compare how three popular methods - PCA, t-SNE, and UMAP - arrange the same 30
words, grouped into four semantic categories.

## Interactive Demo

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Switch the projection method to watch the words animate into new positions,
hover over a word to highlight its five nearest neighbors, and click a word to
inspect a slice of its high-dimensional vector.

To embed this MicroSim in another page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>
```

## Overview

The drawing area is a 2D scatter plot. Each dot is a word positioned by its
embedding similarity; words in the same category (animals, countries, verbs,
adjectives) cluster together. Thin gray lines connect nearby words, fading with
distance, and a quality metric for the current projection is shown at the bottom
of the plot.

## How It Works

- **Method dropdown** - choose PCA, t-SNE, or UMAP. PCA spreads clusters loosely
  along directions of maximum variance; t-SNE produces tight, well-separated
  clusters; UMAP balances local and global structure.
- **Original dims slider** - selects the size of the original embedding space
  (50, 100, 300, or 768 dimensions) being projected down to 2D.
- **Connections checkbox** - toggles the nearest-neighbor lines.
- **Color by category checkbox** - toggles category coloring versus a single
  neutral color.
- **Randomize word set button** - reshuffles the jitter so students see that the
  cluster structure is stable even as exact positions change.
- **Hover** highlights a word and its five nearest neighbors; **click** opens a
  popup showing the first six of the word's 300 dimensions.

## Lesson Plan

- **Warm up:** Ask why we cannot simply plot a 300-dimensional vector and what we
  might lose by squashing it to 2D.
- **Explore:** Switch among PCA, t-SNE, and UMAP and describe how the cluster
  tightness and spacing change. Read the quality metric for each.
- **Discuss:** Why do t-SNE clusters look cleaner but are riskier to interpret as
  "distance"? What does UMAP preserve that t-SNE may not?
- **Extend:** Hover several words and check whether nearest neighbors stay the
  same across methods, connecting layout choice to downstream tasks like search.

## References

- [Chapter 5: Embeddings and Vector Databases](../../chapters/05-embeddings-vector-databases/index.md)
- [t-SNE - Wikipedia](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding)
- [UMAP documentation](https://umap-learn.readthedocs.io/)
