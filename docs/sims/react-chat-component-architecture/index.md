---
title: React Chat Component Architecture
description: Component tree of a typical React chat interface showing parent-child relationships, props, state, and the callback-up props-down data flow.
image: react-chat-component-architecture.png
og:image: react-chat-component-architecture.png
status: draft
library: Mermaid.js
---

# React Chat Component Architecture

A React chat widget is built from a tree of small, focused components. This
diagram shows that tree from the root `ChatbotApp` down to individual buttons,
color-coded by each component's role, and highlights the data-flow path that
makes React's "callbacks up, props down" pattern work. Hover any component to see
its props and state.

## Interactive Demo

<iframe src="main.html" width="100%" height="302" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="302" scrolling="no"></iframe>
```

## Overview

Components are grouped by responsibility:

- **Container components (dark blue)** - `ChatbotApp`, `MessageList`, and
  `InputArea` hold state and coordinate their children.
- **Presentational components (light blue)** - `ChatHeader`, `Message`,
  `UserMessage`, `BotMessage`, and the `TextMessage` / `RichMessage` /
  `MediaMessage` variants simply render what they are given.
- **User-interaction components (green)** - `TextInput`, `SendButton`,
  `AttachmentButton`, `QuickReplies`, and `ScrollToBottom` capture user input.

Two **orange data-flow edges** show the core React pattern:

- `InputArea` reports a new message up to `ChatbotApp` via the
  `onSendMessage` callback.
- `ChatbotApp` passes the updated messages array down to `MessageList` as props,
  which triggers a re-render.

## Lesson Plan

- **Container vs. presentational.** Have students explain why state lives in
  containers and not in the leaf bubbles.
- **Follow the data.** Trace a typed message from `TextInput` all the way to a
  re-rendered `BotMessage`, naming every component and the props passed.
- **Add a feature.** Ask where a "message reactions" feature would slot into the
  tree and which component would own its state.
- **Lift state up.** Discuss what would break if `InputArea` tried to own the
  conversation history instead of `ChatbotApp`.

## References

- [Chapter 7: Chatbot Frameworks and UI](../../chapters/07-chatbot-frameworks-ui/index.md)
- [React: Thinking in React](https://react.dev/learn/thinking-in-react)
- [Mermaid.js Documentation](https://mermaid.js.org/)
