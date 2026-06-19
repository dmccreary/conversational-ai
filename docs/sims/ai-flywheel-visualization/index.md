---
title: AI Flywheel Visualization
description: An interactive flywheel infographic showing how chatbot usage, feedback, better models, and satisfaction reinforce each other with growing momentum.
image: ai-flywheel-visualization.png
og:image: ai-flywheel-visualization.png
status: draft
library: HTML/CSS/JavaScript SVG infographic
---

# AI Flywheel Visualization

The "AI flywheel" describes the self-reinforcing loop that powers a continuously
improving chatbot. More **usage** generates more **feedback data**, which trains
**better models**, which produce **higher satisfaction**, which in turn drives
even more usage. Each turn of the wheel makes the next turn easier, so progress
compounds over time.

## Interactive Demo

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following `iframe`:

```html
<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>
```

## Overview

The flywheel is drawn as an SVG ring divided into four colored quadrants, one
for each stage of the improvement cycle:

- **Increased Usage** (blue) — queries per day and active users grow.
- **More Feedback Data** (green) — thumbs up/down events and labeled examples accumulate.
- **Better Models** (orange) — intent accuracy and response quality rise.
- **Higher Satisfaction** (purple) — positive ratings and task completion climb.

A rotating gold hub in the center represents the momentum of the cycle, and the
gold arrows around the ring show the clockwise causal flow. Interactions:

- **Hover** a quadrant to read its real-world metrics in the side panel.
- **Click** a quadrant to reveal a short case-study example.
- **Advance Time** to step from Month 1-3 through Month 7-9 and watch the hub
  spin faster as the flywheel accelerates.
- **Pause/Resume Spin** to stop or restart the rotation.

## Lesson Plan

- **Warm up:** Ask students why the second month of a chatbot project is often
  easier than the first. Connect their answers to the four quadrants.
- **Explore:** Have students hover each quadrant and record the starting and
  ending metric values, then describe the causal link to the next quadrant.
- **Discuss:** Use the "Advance Time" control to show acceleration. Why does the
  flywheel speed up rather than stay constant? (Compounding data.)
- **Apply:** Ask students to identify which quadrant is the bottleneck for a
  brand-new bot with no users, and what action breaks the deadlock.

## References

- [Chapter 8: User Feedback Improvement](../../chapters/08-user-feedback-improvement/index.md)
- [Feedback Loop System Architecture](../feedback-loop-system-architecture/index.md)
- [Flywheel effect (Wikipedia)](https://en.wikipedia.org/wiki/Flywheel)
