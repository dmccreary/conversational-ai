---
title: Intent Classification Pipeline
description: Mermaid flowchart of the complete intent-classification pipeline, from user query through preprocessing and feature extraction to a classifier and confidence-scored prediction.
image: intent-classification-pipeline.png
og:image: intent-classification-pipeline.png
status: draft
library: Mermaid
---

# Intent Classification Pipeline

Before a chatbot can act, it must decide *what the user wants* — the **intent**.
This diagram traces the query *"I need to change my reservation for tomorrow"*
through text processing, two competing feature-extraction approaches (TF-IDF and
BERT), a neural classifier, and a confidence check that decides whether to act or
escalate to a human. Hover over any box for details.

## Interactive Demo

<iframe src="main.html" width="100%" height="1382" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following iframe:

```html
<iframe src="main.html" width="100%" height="1382" scrolling="no"></iframe>
```

## Overview

The pipeline has four labeled layers:

1. **Text processing** (blue) — normalization (lowercasing, punctuation removal),
   tokenization, and optional stopword filtering (shown dashed because it is not
   always used).
2. **Semantic encoding** (purple) — two parallel paths. **TF-IDF** is a simple,
   fast sparse vectorization; **BERT encoding** (highlighted) produces contextual
   embeddings and is *recommended for better generalization*.
3. **Classification** (orange) — a neural network with a softmax output layer
   maps the feature vector to a probability for every candidate intent.
4. **Prediction and confidence** (gray/yellow/green/red) — the probability table
   shows `modify_reservation: 0.87` as the winner. A **confidence threshold of
   0.70** decides the outcome: predictions at or above it proceed with the action
   (green); anything below it escalates to a human agent (red).

Showing both TF-IDF and BERT lets students compare a classic and a modern
approach side by side, while the threshold step models how production systems
avoid acting on low-confidence guesses.

## Lesson Plan

- **Trace the pipeline:** Have students follow the example query through each
  layer and name what changes at each step.
- **Compare features:** Why might BERT generalize better than TF-IDF? When would
  TF-IDF still be a reasonable choice?
- **Reason about the threshold:** What happens to the example query at 0.87? What
  would happen if the top intent scored only 0.55?
- **Discuss escalation:** Why is escalating to a human better than acting on a
  low-confidence prediction?

## References

- [Chapter 6: Building Chatbots — Intent](../../chapters/06-building-chatbots-intent/index.md)
- [Document classification (Wikipedia)](https://en.wikipedia.org/wiki/Document_classification)
- [BERT (language model) (Wikipedia)](https://en.wikipedia.org/wiki/BERT_(language_model))
