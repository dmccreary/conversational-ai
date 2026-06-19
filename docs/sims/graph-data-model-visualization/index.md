---
title: Graph Data Model Visualization
description: An interactive vis-network graph of an IT infrastructure that demonstrates the node, edge, and property data model with filtering, traversal, and impact analysis.
image: graph-data-model-visualization.png
og:image: graph-data-model-visualization.png
status: draft
library: vis-network
---

# Graph Data Model Visualization

A knowledge graph stores **entities** as nodes and **relationships** as edges,
and both can carry properties. This interactive graph models a small IT
infrastructure - business services, applications, infrastructure hosts, and
databases - so you can explore how those entities connect and what happens
downstream when one of them changes.

## Interactive Demo

<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>
```

## Overview

Each node type has its own shape and color:

- **Business Service** - blue hexagon (for example, Customer Portal)
- **Application** - green rectangle (Web App, API Gateway)
- **Infrastructure** - gray diamond (VM-Web-01, Cache-01, VM-API-01)
- **Database** - orange cylinder (Customer DB, Auth DB)

Edges encode the relationship type: solid red **DEPENDS_ON**, dashed blue
**HOSTS**, and dotted green **CONNECTS_TO**. Edge thickness reflects criticality,
and node size reflects degree centrality (how many connections a node has).

**Interactions:**

- **Hover** a node to read its properties; **click an edge** to read the
  relationship's properties.
- **Click** a node to highlight its immediate neighbors; **double-click** to
  expand a multi-hop dependency tree.
- Use the **type-filter checkboxes** to show or hide whole categories of nodes.
- Drag the **traversal depth** slider to control how many hops the analysis follows.
- **Show Critical Path** highlights every critical DEPENDS_ON relationship.
- **Impact Analysis** turns the next click into a blast-radius query: click a node
  to see everything downstream of it.

## Lesson Plan

- **Read the model:** Have students name the four node types and three edge types
  from the legend alone.
- **Properties everywhere:** Hover nodes and click edges to show that *both* carry
  properties - a defining feature of the property-graph model.
- **Trace dependencies:** Ask which business services break if Customer DB goes
  down, then verify with Impact Analysis.
- **Centrality:** Discuss why larger nodes (more connections) tend to be riskier
  to change.

## References

- [Chapter 10: Knowledge Graphs and GraphRAG](../../chapters/10-knowledge-graphs-graphrag/index.md)
- [Graph database - Wikipedia](https://en.wikipedia.org/wiki/Graph_database)
- [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/)
