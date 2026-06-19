---
title: Feedback Button UI Patterns
description: Four interactive panels comparing minimal, labeled, follow-up, and emoji-scale patterns for collecting feedback on chatbot responses.
image: feedback-button-ui-patterns.png
og:image: feedback-button-ui-patterns.png
status: draft
library: HTML/CSS/JavaScript interactive mockup
---

# Feedback Button UI Patterns

There is no single "right" way to ask a user whether a chatbot response was
good. This MicroSim shows four common patterns side by side. Each panel is
live, so you can click the controls and watch the state transitions instead of
just reading about them.

## Interactive Demo

<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following `iframe`:

```html
<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>
```

## Overview

The four patterns trade simplicity against the richness of the data they capture:

1. **Minimal** — bare thumbs-up / thumbs-down icons in neutral gray that turn
   green or red when clicked. Fastest to use, lowest data richness.
2. **Labeled** — the same thumbs paired with "Helpful" / "Not helpful" text in
   button pills. The labels remove ambiguity and improve accessibility.
3. **Follow-up** — a thumbs-down triggers progressive disclosure: a short menu
   of reasons ("Wrong answer", "Too vague", "Harmful/unsafe", "Other") plus a
   free-text box. This pattern captures the most actionable feedback.
4. **Emoji scale** — five reactions from sad to celebration give a graded
   measure of satisfaction rather than a binary signal.

Try clicking thumbs-down in the follow-up panel to reveal the reason menu, then
choose "Other" to expose the free-text field, and finally Submit.

## Lesson Plan

- **Compare:** Have students rank the four patterns by how much useful data each
  one produces, then by how much effort each asks of the user.
- **Explore:** Click through every state in each panel and list the visual cues
  that confirm a click was registered.
- **Discuss:** Why does roughly 80% of actionable insight come from the
  follow-up question rather than the thumb itself?
- **Apply:** Have students choose the best pattern for a high-stakes medical
  chatbot versus a casual entertainment bot, and justify the choice.

## References

- [Chapter 8: User Feedback Improvement](../../chapters/08-user-feedback-improvement/index.md)
- [Chat Interface Anatomy](../chat-interface-anatomy/index.md)
- [Progressive disclosure (Wikipedia)](https://en.wikipedia.org/wiki/Progressive_disclosure)
