---
title: Latency Waterfall Visualization
description: Horizontal stacked bar chart breaking down chatbot response latency for a simple template query versus a complex RAG plus LLM query.
image: latency-waterfall-visualization.png
og:image: latency-waterfall-visualization.png
status: draft
library: Chart.js
---

# Latency Waterfall Visualization

Where does the time go when a chatbot answers a question? This waterfall chart
breaks the response pipeline into its stages and lines up two scenarios on the
same time axis: a fast template-based reply and a slow retrieval-augmented LLM
reply. Hover any segment to see its exact duration and where it ends in the
timeline.

## Interactive Demo

<iframe src="main.html" width="100%" height="432" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="432" scrolling="no"></iframe>
```

## Overview

Each bar is stacked left-to-right in pipeline order, so the bar length is the
total response time.

- **Simple Query (Template)** totals about **180ms**: intent classification
  (100ms), template selection (50ms), and formatting (30ms).
- **Complex Query (RAG + LLM)** totals about **6,100ms**: intent classification
  (150ms), context retrieval (300ms), vector search (600ms), LLM generation
  (5,000ms), and formatting (50ms).

Two dashed reference lines mark the **user expectation threshold (2s)** and the
**abandonment risk zone (5s)**. A callout highlights that **LLM generation alone
is about 82% of the complex query's total latency** - the single biggest lever
for making a chatbot feel fast.

Colors follow the pipeline stage: blue for intent classification, greens for
retrieval operations, orange for LLM generation, and purple for formatting.

## Lesson Plan

- **Find the bottleneck.** Ask students which single stage they would optimize
  first and why (LLM generation, by far).
- **Cross the threshold.** Discuss what user-experience techniques (streaming
  tokens, typing indicators) keep users engaged past the 2s line.
- **Compare the scenarios.** Have students compute how many simple queries fit in
  the time of one complex query.
- **Estimate streaming impact.** If the first token arrives at 1,500ms, where
  does that fall relative to the expectation and abandonment lines?

## References

- [Chapter 7: Chatbot Frameworks and UI](../../chapters/07-chatbot-frameworks-ui/index.md)
- [Chart.js Bar Chart Documentation](https://www.chartjs.org/docs/latest/charts/bar.html)
