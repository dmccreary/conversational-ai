---
title: Chat Interface Anatomy
description: An annotated, interactive chat-UI mockup with twelve numbered markers explaining each component's design rationale and best practices.
image: chat-interface-anatomy.png
og:image: chat-interface-anatomy.png
status: draft
library: HTML/CSS/JavaScript interactive mockup
---

# Chat Interface Anatomy

A good chat interface is made of many small, deliberate decisions. This
interactive mockup labels twelve components of a typical chatbot UI and
explains the design rationale and best practices behind each one.

## Interactive Demo

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following `iframe`:

```html
<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>
```

## Overview

The left side shows a realistic phone-sized chat mockup: a header with the bot
name and status, a scrollable message area with bot and user bubbles, a typing
indicator, quick-reply chips, feedback buttons, and an input bar with attachment
and send controls. Twelve colored numbered markers sit on top of these elements.

Click any marker (or hover it) to load that component's details into the right
panel: the component name, a one-line design annotation, and the concrete best
practices. Marker colors group the components by role:

- **Blue** — user-facing interactive elements (input, send, quick replies, user bubble)
- **Gray** — bot-controlled elements (avatar, bot bubble, typing indicator)
- **Green** — feedback and improvement elements (thumbs up/down)
- **Orange** — layout and structural elements (header, timestamp, scroll container)

A persistent notes box reminds designers about responsive stacking,
accessibility (ARIA labels), and performance (virtualizing long message lists).

## Lesson Plan

- **Warm up:** Show students a real chat app and ask them to list every distinct
  UI element they can see. Compare their list to the twelve markers here.
- **Explore:** Have each student pick three markers and paraphrase the best
  practices in their own words.
- **Critique:** Ask students to find a chat product that violates one of these
  best practices (e.g., timestamps on every message) and explain the cost.
- **Apply:** Have students sketch a chat UI for a new domain and annotate it
  with the same twelve component categories.

## References

- [Chapter 8: User Feedback Improvement](../../chapters/08-user-feedback-improvement/index.md)
- [Feedback Button UI Patterns](../feedback-button-ui-patterns/index.md)
- [Conversational UI patterns (Wikipedia)](https://en.wikipedia.org/wiki/Conversational_user_interface)
