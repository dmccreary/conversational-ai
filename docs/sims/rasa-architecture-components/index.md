---
title: Rasa Architecture Components
description: Layered architecture diagram of the Rasa framework, tracing a message through channels, the NLU pipeline, Core dialog management, and custom actions.
image: rasa-architecture-components.png
og:image: rasa-architecture-components.png
status: draft
library: Mermaid.js
---

# Rasa Architecture Components

Rasa is an open-source framework for building contextual assistants. This diagram
shows how a user message moves through its layers: from a messaging channel,
through the NLU pipeline that understands the message, into the Core that decides
what to do, out to custom actions that touch real systems, and back as a
response. Rasa X tooling feeds new training data back into the models. Hover any
component for details.

## Interactive Demo

<iframe src="main.html" width="100%" height="802" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="802" scrolling="no"></iframe>
```

## Overview

The diagram is grouped into color-coded layers:

- **User Input (blue)** - messaging channels such as Slack, Teams, and a web
  widget.
- **Rasa NLU Pipeline (green)** - tokenizer, featurizer (word embeddings),
  intent classifier, and entity extractor.
- **Rasa Core (orange)** - the Tracker Store (conversation history), the Dialog
  Policy (ML or rule-based), and the Action Server.
- **Custom Actions (purple)** - database connectors, external API clients, and
  business logic functions.
- **Rasa X Tooling (gold)** - conversation review, training-data annotation, and
  a performance dashboard.
- **External Systems (gray)** - the databases and APIs reached by custom actions.

Solid arrows show message flow. The Tracker Store and Dialog Policy share a
bidirectional state-tracking link. Dashed arrows show Rasa X feeding training
data back into the NLU and Core, and custom actions making API calls to external
systems.

## Lesson Plan

- **Trace one message.** Have students follow a customer message from the web
  widget all the way to a database lookup and back to the user.
- **Separate NLU from Core.** Ask students to explain why Rasa splits "what the
  user said" (NLU) from "what to do next" (Core).
- **Close the loop.** Discuss how Rasa X turns real conversations into new
  training data, and why that feedback loop improves the bot over time.
- **Custom actions.** Identify which tasks require a custom action versus a simple
  response template.

## References

- [Chapter 7: Chatbot Frameworks and UI](../../chapters/07-chatbot-frameworks-ui/index.md)
- [Rasa Documentation](https://rasa.com/docs/)
- [Mermaid.js Documentation](https://mermaid.js.org/)
