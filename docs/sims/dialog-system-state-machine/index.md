---
title: Dialog System State Machine
description: Interactive Mermaid state diagram showing how a task-oriented dialog system manages conversation flow through states and transitions for a flight booking task.
image: dialog-system-state-machine.png
og:image: dialog-system-state-machine.png
status: draft
library: Mermaid
---

# Dialog System State Machine

A task-oriented chatbot guides a conversation toward a goal by moving through a
series of **states**. This diagram models a flight-booking dialog: the system
greets the user, collects each required slot (destination, origin, date, time),
checks whether all slots are filled, displays matching flights, and confirms the
booking. Hover over any state to read what the system does there.

## Interactive Demo

<iframe src="main.html" width="100%" height="1082" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following iframe:

```html
<iframe src="main.html" width="100%" height="1082" scrolling="no"></iframe>
```

## Overview

The diagram is a **finite state machine**. Each node is a conversational state,
and each labeled arrow is a transition triggered by user input:

- **Greeting** (green) — entry point; the system offers to help.
- **Slot-filling states** (blue) — Collect Destination, Origin, Date, and Time
  Preference. A self-loop on *Collect Destination* shows that unclear input keeps
  the system in the same state and re-prompts.
- **All Slots Filled?** (yellow) — a decision state. If a slot is missing, the
  flow returns to collect it; otherwise it advances.
- **Transaction states** (orange) — Display Options and Confirm Selection, where
  the system queries the database and the user picks a flight. *Display Options*
  can loop back to change criteria.
- **Booking Complete** (purple) — terminal state; the system issues a
  confirmation number and emails a receipt.

This explicit state model makes the dialog predictable, testable, and easy to
extend with new slots or branches.

## Lesson Plan

- **Identify states vs. transitions:** Ask students to list every state and the
  user intent that triggers each transition.
- **Trace a conversation:** Walk a sample dialog ("I want to fly to Boston") and
  highlight the path through the states.
- **Discuss error handling:** Why does *Collect Destination* loop back to itself?
  What happens when a slot is left empty at the decision point?
- **Extend the machine:** Have students add a new slot (e.g., number of
  passengers) and decide where the transitions belong.

## References

- [Chapter 6: Building Chatbots — Intent](../../chapters/06-building-chatbots-intent/index.md)
- [Finite-state machine (Wikipedia)](https://en.wikipedia.org/wiki/Finite-state_machine)
- [Dialogue system (Wikipedia)](https://en.wikipedia.org/wiki/Dialogue_system)
