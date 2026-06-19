---
title: Vector Index Comparison
description: Interactive p5.js panels showing how Flat, IVF, and HNSW vector indexes organize data for fast similarity search, with a speed and accuracy comparison table.
image: vector-index-comparison.png
og:image: vector-index-comparison.png
status: draft
library: p5.js
---

# Vector Index Comparison

Searching billions of vectors one at a time is too slow, so vector databases use
specialized index structures that trade a little accuracy for a lot of speed.
This MicroSim shows the same query running against three index types - Flat, IVF,
and HNSW - side by side, so you can see how each one decides which vectors to
examine.

## Interactive Demo

<iframe src="main.html" width="100%" height="712" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

The red star is the query vector. Blue dots are vectors that get compared; gray
dots are skipped. Toggle the checkbox to show or hide the skipped vectors.

To embed this MicroSim in another page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="712" scrolling="no"></iframe>
```

## Overview

Each panel is a conceptual 2D scatter plot of the same point cloud:

- **Flat (brute force)** draws an arrow from the query to every vector - it
  compares all of them, guaranteeing 100% accuracy but with O(n) cost.
- **IVF (inverted file)** groups vectors into clusters and only searches the
  nearest one or two clusters, skipping the rest for a large speedup.
- **HNSW (graph)** builds a multi-layer navigable graph and walks from a sparse
  top layer down to the dense bottom layer, reaching the neighborhood in
  O(log n) hops.

## How It Works

Real embeddings live in hundreds of dimensions, but the same ideas apply in 2D.
The trade-off is always speed versus accuracy versus memory: Flat is exact but
slow, IVF and HNSW are approximate but fast. The comparison table built into the
MicroSim summarizes those trade-offs, including Product Quantization (PQ), which
compresses vectors for very low memory use.

## Lesson Plan

- **Warm up:** Ask how long it would take to compare a query to one billion
  vectors one at a time, motivating approximate indexes.
- **Explore:** Compare the arrows in the Flat panel to the clusters in IVF and the
  graph path in HNSW. Read each panel's search-time and accuracy metrics.
- **Discuss:** Why does HNSW use more memory than IVF? When is the loss of a few
  percent of accuracy an acceptable trade for speed?
- **Extend:** Using the table, have students choose an index for a real-time
  search service versus an offline batch job and justify the pick.

## References

- [Chapter 5: Embeddings and Vector Databases](../../chapters/05-embeddings-vector-databases/index.md)
- [Hierarchical Navigable Small World (HNSW)](https://en.wikipedia.org/wiki/Hierarchical_navigable_small_world)
- [Nearest neighbor search - Wikipedia](https://en.wikipedia.org/wiki/Nearest_neighbor_search)
