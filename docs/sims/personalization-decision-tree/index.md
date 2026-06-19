---
title: Personalization Decision Tree
description: An interactive Mermaid decision tree showing how a chatbot decides how much to personalize a response based on authentication, permissions, preferences, and history.
image: personalization-decision-tree.png
og:image: personalization-decision-tree.png
status: draft
library: Mermaid.js
---

# Personalization Decision Tree

When a chatbot receives a query, it must decide how much it can and should
personalize the answer. That decision depends on whether the user is known,
what they are allowed to see, what they have asked for before, and what they
prefer. This decision tree walks through that logic from query to delivery.

## Interactive Demo

<iframe src="main.html" width="100%" height="802" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following `iframe`:

```html
<iframe src="main.html" width="100%" height="802" scrolling="no"></iframe>
```

## Overview

The tree branches on three decision points (shown in orange):

1. **Authenticated?** — If not, return a generic public-only response.
2. **Has data permissions?** — A security-critical check. If not, explain the
   restriction and offer to request access.
3. **Has preference settings?** — Apply explicit preferences if present,
   otherwise fall back to sensible defaults.

After loading context and analyzing history, a final **pattern match** decides
between an *enhanced* response (data plus proactive follow-ups) and a *standard*
personalized response. Every interaction is then logged so future
personalization improves.

The side panel lists the four personalization data sources (profile,
preferences, history, session) and a concrete example user, Bob Martinez, a
regional sales manager whose history reveals a recurring quarter-over-quarter
comparison pattern. Hover any node to read exactly what the system does there.

## Lesson Plan

- **Trace:** Have students follow Bob Martinez's query "Show me sales data"
  down the tree and predict which leaf node it reaches.
- **Discuss:** Why is the permission check placed before the preference check?
  What security problem would result from reversing them?
- **Analyze:** Identify which branches depend on *explicit* data versus
  *learned* data, and discuss which is more reliable.
- **Apply:** Ask students to add a branch for a brand-new authenticated user
  with no history yet.

## References

- [Chapter 8: User Feedback Improvement](../../chapters/08-user-feedback-improvement/index.md)
- [User Context Data Model](../user-context-data-model/index.md)
- [Personalization (Wikipedia)](https://en.wikipedia.org/wiki/Personalization)
