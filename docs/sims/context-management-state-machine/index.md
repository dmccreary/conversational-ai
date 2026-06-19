---
title: Context Management State Machine
description: State diagram showing how conversation context evolves through single-turn, multi-turn, task-oriented, and long-term states, with a summarization loop.
image: context-management-state-machine.png
og:image: context-management-state-machine.png
status: draft
library: Mermaid.js
---

# Context Management State Machine

A chatbot's notion of "context" is not fixed. It grows and shrinks as a
conversation progresses. This state machine shows the states that conversation
context passes through, the transitions that move it between states, and the
summarization loop that keeps context within token limits. Hover any state for
details.

## Interactive Demo

<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>
```

## Overview

The diagram uses four color categories:

- **Active conversation states (green)** - New Session, Single-Turn,
  Multi-Turn, Task-Oriented, and Long-Term context.
- **Context management process (blue)** - the Context Summarization step that
  compresses older messages.
- **Decision point (yellow)** - the "Context Size Exceeded?" check run before
  each response.
- **Terminal state (red)** - Session Terminated, where context is archived.

A conversation typically starts empty, expands to single- and then multi-turn
context, and may enter a structured task-oriented state for workflows like
booking. Long-term context from prior sessions feeds back in. Before every
response, the system checks whether the context has grown too large; if so it
summarizes older turns and continues.

## Lesson Plan

- **Name the states.** Have students label a real chat transcript with the
  context state at each turn.
- **Trace the summarization loop.** Ask why the loop returns to the multi-turn
  state rather than starting over, and what information is lost vs. retained.
- **Compare single- vs. multi-turn.** Discuss which kinds of user questions
  require multi-turn context (pronouns, follow-ups) and which do not.
- **Token budgeting.** Connect the "Context Size Exceeded?" decision to model
  context windows and the cost of long prompts.

## References

- [Chapter 7: Chatbot Frameworks and UI](../../chapters/07-chatbot-frameworks-ui/index.md)
- [Mermaid.js Documentation](https://mermaid.js.org/)
