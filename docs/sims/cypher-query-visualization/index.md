---
title: Cypher Query Visualization
description: Write or pick Cypher template queries and watch pattern matching and traversal animate on a graph, with a live results table and execution stats.
image: cypher-query-visualization.png
og:image: cypher-query-visualization.png
status: draft
library: vis-network
---

# Cypher Query Visualization

Cypher is the query language for property graphs - it lets you describe a
*pattern* of nodes and relationships and asks the database to find every place
that pattern occurs. This MicroSim lets you run template Cypher queries against a
small IT-infrastructure graph and watch the matching pattern light up node by node
while the results table fills in.

## Interactive Demo

<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>
```

## Overview

The editor at the top holds the current Cypher query. Choose one of five templates
from the dropdown - from a simple node match up to a five-hop blast-radius analysis -
and the editor and description update to match.

Press **Execute Query** and, with **Animate traversal** enabled, the graph
highlights matched nodes one hop at a time so you can follow the traversal. The
**results table** on the right shows the returned columns and rows, and the **stats
bar** reports how many nodes matched, how many relationships were traversed, and a
simulated execution time. Clicking a node suggests the Cypher pattern that would
match it.

The five templates progress from easy to advanced:

1. `MATCH (n:Application) RETURN n.name, n.version` - find all applications.
2. One-hop `HOSTS` lookup from VM-Web-01.
3. All direct `DEPENDS_ON` dependencies of business services.
4. Variable-length path `[:DEPENDS_ON*1..3]` from Customer Portal.
5. Blast radius - everything reachable (and dependent) on VM-Web-01.

## Lesson Plan

- **Read a pattern:** Have students translate each template into plain English
  before running it.
- **Predict the matches:** Ask which nodes will highlight, then execute to check.
- **Variable-length paths:** Compare templates 3 and 4 to see what `*1..3` adds.
- **Blast radius:** Discuss why template 5 returns so many more nodes and what that
  means for change management.

## References

- [Chapter 10: Knowledge Graphs and GraphRAG](../../chapters/10-knowledge-graphs-graphrag/index.md)
- [Cypher (query language) - Wikipedia](https://en.wikipedia.org/wiki/Cypher_(query_language))
- [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/)
