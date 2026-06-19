---
title: Corporate Nervous System in Action
description: An interactive p5.js impact-analysis simulator that animates the blast radius of a change or incident across an IT-infrastructure knowledge graph.
image: corporate-nervous-system-in-action.png
og:image: corporate-nervous-system-in-action.png
status: draft
library: p5.js
---

# Corporate Nervous System in Action

When every business service, application, server, and database is connected in a
knowledge graph, you can answer a powerful question instantly: *if this changes or
fails, what else is affected?* This MicroSim treats that graph as a "corporate
nervous system" and runs real-time impact analysis for change management and
incident response.

## Interactive Demo

<iframe src="main.html" width="100%" height="762" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="762" scrolling="no"></iframe>
```

## Overview

The left side shows the IT-infrastructure graph: blue hexagons are business
services, green rectangles are applications, gray diamonds are infrastructure, and
orange cylinders are databases. Edges are color-coded by relationship type -
`DEPENDS_ON`, `HOSTS`, and `CONNECTS_TO`.

Pick a **scenario** from the dropdown - a routine database upgrade, a server disk
failure, a decommission, or a security patch - and press **Run Impact Analysis**.
The simulation animates a breadth-first traversal outward from the affected
component, pulsing the start node and highlighting the **blast radius** hop by hop.
Switch the dropdown to **Custom** to click any node and analyze it directly.

The right-hand **Impact Analysis panel** updates live with the affected business
services (and their SLA tiers), the stakeholders to notify, recommended actions,
and a metrics box. The metrics callout makes the GraphRAG point explicit: a graph
query answers in milliseconds what would take a human analyst hours of manual
document review.

**Controls:**

- **Scenario** dropdown (four scenarios plus Custom click mode).
- **Depth slider (1-6 hops):** how far the impact traversal propagates.
- **Run Impact Analysis** and **Reset** buttons.

## Lesson Plan

- **Trace the blast radius:** Run the VM-Web-01 failure scenario and have students
  predict which business services go down before the animation reaches them.
- **Depth matters:** Change the depth slider and discuss why deeper traversal finds
  more (sometimes surprising) dependencies.
- **Stakeholder mapping:** Use the panel to connect technical components to the
  human teams that must be notified.
- **GraphRAG payoff:** Compare the millisecond graph query to the spec's note that
  standard RAG would require retrieving 50+ documents and manual analysis.

## References

- [Chapter 10: Knowledge Graphs and GraphRAG](../../chapters/10-knowledge-graphs-graphrag/index.md)
- [Impact analysis - Wikipedia](https://en.wikipedia.org/wiki/Change_impact_analysis)
- [p5.js Reference](https://p5js.org/reference/)
