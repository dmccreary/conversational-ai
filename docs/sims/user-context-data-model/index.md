---
title: User Context Data Model
description: An interactive vis-network graph of the user-context data model, with a central User connected to profile, preferences, history, sessions, queries, settings, and behavioral patterns.
image: user-context-data-model.png
og:image: user-context-data-model.png
status: draft
library: vis-network
---

# User Context Data Model

Personalization is only as good as the data model behind it. This interactive
graph shows how a chatbot organizes everything it knows about a user: a central
**User** node linked to a profile, preferences, history, and active sessions,
which in turn branch into individual queries, settings, and learned behavioral
patterns.

## Interactive Demo

<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following `iframe`:

```html
<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>
```

## Overview

The model centers on the example user **Alice Chen** and uses color to group
node types: User (purple), Profile (pink), Preferences (blue), History (green),
Sessions (orange), Queries (gray), Settings (light blue), and Patterns (light
green). Edges are labeled with the relationship type and styled by strength:

- **Thick solid** — `HAS_PROFILE`, `HAS_PREFERENCES`, `HAS_HISTORY`
- **Medium solid** — `INITIATED` (User to Session)
- **Thin solid** — `CONTAINS` (Session to Query)
- **Dashed** — `CONFIGURED_BY` and `EXHIBITS` (derived attributes)

Interactions:

- **Hover or click** any node to see its full property list in the side panel.
- **Click** a node to highlight its connected edges (others dim).
- Use the **checkboxes** to hide or show sessions/queries, settings, or
  behavioral patterns and focus on one part of the model.
- Use the **navigation buttons** to pan and zoom; in fullscreen mode the mouse
  wheel zooms too.

## Lesson Plan

- **Read the graph:** Have students name the path from the User node to a single
  query and list every relationship label along the way.
- **Explore:** Hover each node type and record one property that would be useful
  for personalization.
- **Analyze:** Discuss why `CONFIGURED_BY` and `EXHIBITS` are dashed (derived)
  while `HAS_PROFILE` is solid (direct).
- **Design:** Ask students to add a new node type, such as a "Device" node, and
  decide how it connects to the User.

## References

- [Chapter 8: User Feedback Improvement](../../chapters/08-user-feedback-improvement/index.md)
- [Personalization Decision Tree](../personalization-decision-tree/index.md)
- [Property graph model (Wikipedia)](https://en.wikipedia.org/wiki/Graph_database)
