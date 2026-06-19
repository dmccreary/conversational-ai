---
title: Feedback Loop System Architecture
description: An interactive Mermaid workflow showing the eight-stage feedback loop from user interaction through analysis, human review, corrective action, validation, and deployment.
image: feedback-loop-system-architecture.png
og:image: feedback-loop-system-architecture.png
status: draft
library: Mermaid.js
---

# Feedback Loop System Architecture

Collecting a thumbs-down is only the first step. This diagram traces the full
feedback loop a production chatbot team runs: from a single negative signal,
through storage and analysis, to a human deciding what to fix, validating the
fix with an A/B test, and deploying it so the cycle can begin again on a higher
baseline.

## Interactive Demo

<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following `iframe`:

```html
<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>
```

## Overview

The workflow runs through eight stages, color-coded by who or what is responsible:

1. **User Interaction** (blue) — the user gives negative feedback.
2. **Feedback Collection** (green) — the frontend captures the full context.
3. **Data Storage** (green) — the record is written and indexed.
4. **Analysis & Pattern Detection** (green) — dashboards flag failing intents.
5. **Human Review** (orange) — an expert finds the root cause.
6. **Corrective Action** (purple) — the team updates the KB, retrains, fixes prompts.
7. **Validation** (gold) — an A/B test confirms the change actually helped.
8. **Deployment** (gold) — the fix ships to everyone and the loop restarts.

A central **Feedback Analytics Database** stores every event and feeds both the
analysis and validation stages (shown with dashed connections). Hover any stage
to read exactly what happens there, including typical metrics like the 1-2 week
cycle time and 8-12% participation rate.

## Lesson Plan

- **Trace:** Have students follow a single thumbs-down all the way around the
  loop, naming the artifact produced at each stage.
- **Discuss:** Why is the Validation stage essential? What goes wrong if a team
  deploys a fix without it?
- **Analyze:** Identify which stages are automated versus human, and discuss
  where the loop is most likely to stall.
- **Apply:** Ask students to add a ninth stage for "rollback on regression" and
  decide where it connects.

## References

- [Chapter 8: User Feedback Improvement](../../chapters/08-user-feedback-improvement/index.md)
- [AI Flywheel Visualization](../ai-flywheel-visualization/index.md)
- [A/B testing (Wikipedia)](https://en.wikipedia.org/wiki/A/B_testing)
