---
title: Response Generation Architecture
description: Flowchart of the chatbot response pipeline from user input through intent-based strategy selection (template, retrieval, LLM) to a quality-checked reply.
image: response-generation-architecture.png
og:image: response-generation-architecture.png
status: draft
library: Mermaid.js
---

# Response Generation Architecture

Not every chatbot answer is generated the same way. A well-designed system routes
each request to the cheapest strategy that can answer it correctly. This flowchart
shows the full pipeline from user input to a validated response, including the
three-way strategy decision and the quality-check feedback loop. Hover any stage
for details.

## Interactive Demo

<iframe src="main.html" width="100%" height="472" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="472" scrolling="no"></iframe>
```

## Overview

The pipeline flows left to right:

1. **User Input (blue)** enters the system.
2. **Intent Classification (orange decision)** identifies the kind of request.
3. **Response Strategy (orange decision)** routes the request down one of three
   paths:
   - **Template Engine** for simple FAQ queries.
   - **Retrieval System** for factual questions.
   - **LLM Generator** for complex, open-ended questions.
4. **Response Formatter (green)** combines the chosen output with injected
   context.
5. **Quality Checker (red)** validates the response. On pass it goes to **User
   Output (blue)**; on failure (dashed line) it loops back to the LLM generator.

**Context Retrieval** feeds context into both strategy selection and formatting
(dotted "Context injection" arrows).

## Lesson Plan

- **Pick the path.** Give students sample questions and have them choose the
  template, retrieval, or LLM path and justify it on cost and accuracy.
- **Why validate?** Discuss what the quality checker catches and why a feedback
  loop to the generator is worth the extra latency.
- **Context injection.** Have students explain why context is injected at two
  points rather than one.
- **Cost ordering.** Rank the three strategies by typical cost and latency, and
  relate that to the order a system should try them.

## References

- [Chapter 7: Chatbot Frameworks and UI](../../chapters/07-chatbot-frameworks-ui/index.md)
- [Mermaid.js Documentation](https://mermaid.js.org/)
