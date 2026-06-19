---
title: Chat Widget Integration Patterns
description: Layered architecture diagram showing how a chat widget embeds into a website and connects through real-time protocols to backend chatbot services.
image: chat-widget-integration-patterns.png
og:image: chat-widget-integration-patterns.png
status: draft
library: Mermaid.js
---

# Chat Widget Integration Patterns

This diagram traces a chatbot message from the host website, through the embedded
chat widget, across a real-time network protocol, and into the backend services
that generate and persist responses. Hover over any component to see how it fits
into the overall integration.

## Interactive Demo

<iframe src="main.html" width="100%" height="860" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="860" scrolling="no"></iframe>
```

## Overview

The visualization is organized into five color-coded layers that follow the path
of a chat message:

- **Website Layer (blue)** - the host HTML page, its existing JavaScript, and the
  embed snippet that loads the widget.
- **Chat Widget (green)** - the floating launcher button, the expanded chat
  window, the message components, and a connection manager.
- **Real-Time Protocols (orange)** - WebSocket for persistent bidirectional
  streaming, Server-Sent Events for one-way push, and long polling as a
  firewall-friendly fallback.
- **Backend Services (purple)** - the API gateway, the chatbot framework, and the
  session manager.
- **Persistent State (gray)** - LocalStorage on the client, a session cookie for
  user identity, and a database for long-term conversation history.

Solid arrows show the primary request path; dashed arrows show fallback
protocols and state persistence side channels.

## Lesson Plan

- **Compare embed methods.** Ask students to list a trade-off for each of the
  three embed methods (script tag, NPM package, iFrame) shown on the embed node.
- **Pick a protocol.** Give a scenario (e.g., a hospital intranet behind a strict
  firewall) and have students choose WebSocket, SSE, or long polling and justify
  it.
- **Trace a round trip.** Have students follow the arrows from a user message all
  the way to the database and back, naming each component it passes through.
- **Map state.** Discuss why conversation history is stored in three different
  places (LocalStorage, cookie, database) and what each one is good for.

## References

- [Chapter 7: Chatbot Frameworks and UI](../../chapters/07-chatbot-frameworks-ui/index.md)
- [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Mermaid.js Documentation](https://mermaid.js.org/)
