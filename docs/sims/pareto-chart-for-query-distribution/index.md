---
title: Pareto Chart for Query Distribution
description: An interactive Chart.js Pareto chart showing how a small number of chatbot intent types accounts for the majority of query traffic, with an 80% threshold and focus zone.
image: pareto-chart-for-query-distribution.png
og:image: pareto-chart-for-query-distribution.png
status: draft
library: Chart.js
---

# Pareto Chart for Query Distribution

Chatbot traffic almost never spreads evenly across intents. A handful of common
requests dominate, while a long tail of rare intents barely registers. This
Pareto chart makes that "80/20" pattern visible so teams know where to focus
their evaluation and optimization effort.

## Interactive Demo

<iframe src="main.html" width="100%" height="592" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following `iframe`:

```html
<iframe src="main.html" width="100%" height="592" scrolling="no"></iframe>
```

## Overview

A Pareto chart combines two views of the same data:

- **Blue bars** (left axis) show the **query count** for each intent, ordered
  from most to least frequent. A darker-to-lighter blue gradient reinforces the
  ranking, and the aggregated long tail is shown in gray.
- **Red line** (right axis) shows the **cumulative percentage** of all queries
  as you move left to right. It rises steeply, then flattens.

A dashed purple line marks the **80% threshold**, and a vertical line plus a
shaded green **focus zone** highlight the small set of intents (the "critical
20%") that together account for roughly 84% of traffic. In this dataset the 80%
mark is crossed at the fifth intent.

Hover any column to see the exact count, that intent's share, and the running
cumulative percentage.

## Lesson Plan

- **Read the chart:** Have students identify how many intents are needed to
  reach 80% of traffic, and which intents fall in the long tail.
- **Interpret:** Ask why the cumulative line flattens. What does a flat segment
  tell you about the value of improving those intents?
- **Prioritize:** Given limited engineering time, which intents should the team
  optimize first, and why?
- **Apply:** Have students sketch what the chart would look like for a bot whose
  traffic is evenly distributed, and discuss why that is rare.

## References

- [Chapter 14: Evaluation, Optimization, and Careers](../../chapters/14-evaluation-optimization-careers/index.md)
- [Pareto principle (Wikipedia)](https://en.wikipedia.org/wiki/Pareto_principle)
- [Pareto chart (Wikipedia)](https://en.wikipedia.org/wiki/Pareto_chart)
