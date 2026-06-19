---
title: LangChain Agent Architecture
description: Interactive p5.js animation of a LangChain agent reasoning loop that dynamically selects and executes tools, with a step-by-step execution log.
image: langchain-agent-architecture.png
og:image: langchain-agent-architecture.png
status: draft
library: p5.js
---

# LangChain Agent Architecture

A traditional chatbot maps each user message to a fixed intent and a fixed handler.
A LangChain *agent* works differently: an LLM reasons about the query, decides
which tool to call, runs it, reads the result, and may call another tool before
answering. This MicroSim animates that loop so you can watch the agent choose its
own path through five available tools.

## Interactive Demo

<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>
```

## Overview

Pick an example query from the dropdown and press **Run Agent**. The animation
highlights each stage of the agent loop:

1. The **User Query** box lights up (blue).
2. The **LLM Reasoning** box (green) shows the agent's thought about which tool it
   needs.
3. One of the five **tools** (orange) is selected and executes: Vector DB Search,
   SQL Query, Calculator, Web Search, or Custom API.
4. The tool result feeds back to the LLM (dashed green loop).
5. For multi-step queries the loop repeats with a second tool.
6. The **Final Response** box (blue) shows the answer.

The **Execution Log** on the right records every step with a simulated timestamp.

Controls:

- **Example query** dropdown - choose a single-tool or multi-tool scenario.
- **Run Agent** / **Reset** buttons.
- **Animation speed** slider - 100 to 2000 ms per step.
- **Show intermediate reasoning** checkbox - include or hide the LLM's
  tool-selection thoughts in the log.

## Lesson Plan

- **Contrast with intent routing.** After running a query, ask students how a
  fixed intent-to-handler system would have struggled with the multi-step
  calculator example.
- **Predict the tool.** Pause before pressing Run and have students predict which
  tool the agent will pick and why.
- **Trace the loop.** Run the multi-step query and have students count how many
  times control returns to the LLM box.
- **Toggle reasoning.** Turn off "Show intermediate reasoning" and discuss why
  hiding the agent's chain-of-thought makes debugging harder.

## References

- [Chapter 7: Chatbot Frameworks and UI](../../chapters/07-chatbot-frameworks-ui/index.md)
- [LangChain Agents Documentation](https://python.langchain.com/docs/concepts/agents/)
- [p5.js Reference](https://p5js.org/reference/)
