---
title: Framework Comparison Matrix
description: Radar chart comparing Rasa, Dialogflow, Botpress, LangChain, and LlamaIndex across eight chatbot-framework evaluation dimensions on a 0 to 10 scale.
image: framework-comparison-matrix.png
og:image: framework-comparison-matrix.png
status: draft
library: Chart.js
---

# Framework Comparison Matrix

Choosing a chatbot framework is a multi-dimensional trade-off. This radar (spider)
chart overlays the strengths and weaknesses of five major frameworks so you can
see, at a glance, which tool fits a given priority. Hover any point to read its
exact 0 to 10 score, and click a legend item to toggle a framework on or off.

## Interactive Demo

<iframe src="main.html" width="100%" height="802" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="802" scrolling="no"></iframe>
```

## Overview

Each axis is an evaluation dimension scored from 0 (weak) to 10 (strong):

- **Deployment Flexibility** - 10 means full control; 0 means vendor lock-in.
- **Development Speed** - fastest time-to-production scores highest.
- **NLU Accuracy** - quality of intent and entity understanding.
- **Customization Depth** - 10 means full code access.
- **Enterprise Features** - security, scaling, and management tooling.
- **Learning Curve** - 10 is easiest to learn; 0 is hardest.
- **LLM Integration** - 10 means native LLM support.
- **Cost Efficiency** - 10 is most affordable.

The five overlaid profiles reveal distinct shapes. **Rasa** stretches toward
deployment flexibility and customization but scores low on learning curve.
**Dialogflow** favors development speed and NLU accuracy at the cost of
flexibility. **LangChain** and **LlamaIndex** dominate the LLM-integration axis.
**Botpress** is a balanced generalist.

## Lesson Plan

- **Read a profile.** Pick one framework and have students describe its shape in
  one sentence (e.g., "Rasa trades ease-of-use for control").
- **Match tool to requirement.** Give a scenario (HIPAA on-premise deployment,
  rapid prototype, RAG over private docs) and have students choose a framework
  and defend it using the axes.
- **Spot the trade-off.** Ask which two axes most often pull in opposite
  directions across frameworks (deployment flexibility vs. development speed).
- **Toggle to compare.** Have students hide all but two frameworks and list every
  axis where one beats the other.

## References

- [Chapter 7: Chatbot Frameworks and UI](../../chapters/07-chatbot-frameworks-ui/index.md)
- [Chart.js Radar Chart Documentation](https://www.chartjs.org/docs/latest/charts/radar.html)
