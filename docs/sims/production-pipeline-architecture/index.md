---
title: Production Pipeline Architecture
description: Architecture diagram of a production NLP pipeline with caching, three confidence-based processing paths, graceful error fallback, and a cache write-back loop.
image: production-pipeline-architecture.png
og:image: production-pipeline-architecture.png
status: draft
library: Mermaid.js
---

# Production Pipeline Architecture

This MicroSim shows what a real-world, production-grade NLP pipeline looks like
once you add the engineering concerns that a textbook pipeline ignores: a cache
that short-circuits repeated queries, three processing paths tuned to query
complexity, error handling that degrades gracefully, and a feedback loop that
writes results back to the cache. Hover any component for details.

## About This Diagram

The diagram flows top to bottom. After preprocessing, a cache check can bypass
the entire pipeline. Otherwise a confidence router sends each query down the
fast, standard, or complex path. All paths converge at an error-handling layer
before producing structured output. Dotted lines show fallbacks between paths
and the cache write-back loop.

## Interactive Demo

<iframe src="main.html" width="100%" height="1182" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="1182" scrolling="no"></iframe>
```

## How It Works

- **Caching layer (blue):** a cache hit returns in under 5ms and skips all NLP
  work. Results are written back to the cache after processing.
- **Fast path (green, under 50ms):** pattern matching and keyword extraction for
  high-confidence, common queries. Most traffic takes this route.
- **Standard path (yellow, about 100ms):** POS tagging, lemmatization, and named
  entity recognition for moderate-complexity queries.
- **Complex path (orange, about 300ms):** dependency parsing, coreference
  resolution, and semantic role labeling for hard or low-confidence queries.
- **Error handling (red):** every component is wrapped in try/catch so a single
  failure degrades gracefully and is logged, rather than crashing the request.

Dotted fallback arrows let the complex path fall back to standard, and standard
to fast, if a component fails or times out.

## Lesson Plan

- **Justify the cache.** Discuss why caching is the single biggest latency win
  for a chatbot serving repetitive questions.
- **Match path to query.** Give example queries and have students decide whether
  each should take the fast, standard, or complex path.
- **Design for failure.** Trace what happens when the complex path's coreference
  component throws an exception.
- **Reason about latency.** Compare the stated path latencies and estimate the
  average response time given that most traffic uses the fast path.

## References

- [Chapter 11: NLP Pipelines and Processing](../../chapters/11-nlp-pipelines-processing/index.md)
- [Designing Data-Intensive Applications (caching and pipelines)](https://dataintensive.net/)
- [spaCy processing pipelines](https://spacy.io/usage/processing-pipelines)
