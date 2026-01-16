---
title: Text2KGBench-LettrIA F1 Scores Timeline
description: Interactive timeline showing F1 scores for text-to-knowledge-graph models over time
---

# Text2KGBench-LettrIA F1 Scores Timeline

An interactive visualization showing how language models perform on the Text2KGBench-LettrIA benchmark for text-to-knowledge-graph generation over time.

<iframe src="main.html" width="100%" height="620" scrolling="no" style="border: 1px solid #ddd; border-radius: 8px;"></iframe>

[View Fullscreen](main.html){ .md-button .md-button--primary }

## Overview

This chart displays F1 scores from the **Text2KGBench-LettrIA Generalization Benchmark** (Appendix C of Plu et al., 2025). The benchmark evaluates models on their ability to extract knowledge graph triples from text when presented with an unseen ontology (leave-one-out evaluation on the City ontology).

### Metrics Explained

- **Entities (E)**: F1 score for correctly identifying entity classes (domain/range for object properties)
- **Attributes (A)**: F1 score for correctly extracting literal values (range of datatype properties)
- **Properties (P)**: F1 score for correctly identifying datatype properties linking entities to attributes
- **Relations (R)**: F1 score for correctly identifying object properties linking entities to other entities

### Model Categories

- **Closed/Proprietary** (circles): Models accessed via API in zero-shot/1-shot settings
- **Open-Weights** (triangles): Open-source models that were fine-tuned on the benchmark

## Key Findings

1. **Fine-tuned open models outperform proprietary models**: Models like Gemma 3 27B-IT and Qwen3 8B achieve Entity F1 scores above 0.83, exceeding all proprietary models.

2. **Top proprietary performers**: Claude Sonnet 4 (E=0.78), Gemini 2.5 Pro (E=0.77), and GPT-4.1 Mini (E=0.78) lead among closed models.

3. **Attribute extraction is generally easier**: Most models achieve higher F1 scores on Attributes than other metrics.

4. **Relations remain challenging**: The Relations metric shows the most variation and generally lower scores.

## Data Summary Table

| Model | Publisher | Release Date | Entities | Attributes | Properties | Relations |
|-------|-----------|--------------|----------|------------|------------|-----------|
| Claude 3 Opus | Anthropic | 2024-03-04 | 0.7825 | 0.9405 | 0.9102 | 0.7199 |
| Claude 3.5 Sonnet V2 | Anthropic | 2024-10-22 | 0.7823 | 0.9581 | 0.9333 | 0.7089 |
| Claude 3.7 Sonnet | Anthropic | 2025-02-24 | 0.7775 | 0.9471 | 0.9278 | 0.7146 |
| Claude Sonnet 4 | Anthropic | 2025-05-22 | 0.7829 | 0.9509 | 0.9283 | 0.7179 |
| Gemini 2.5 Pro | Google | 2025-03-25 | 0.7748 | 0.9580 | 0.9368 | 0.7242 |
| GPT-4.1 | OpenAI | 2025-04-14 | 0.7731 | 0.9193 | 0.9013 | 0.6773 |
| GPT-4.1 Mini | OpenAI | 2025-04-14 | 0.7764 | 0.8906 | 0.8607 | 0.6766 |
| Mistral Medium 2505 | Mistral | 2025-05-30 | 0.7661 | 0.7875 | 0.7960 | 0.6444 |
| Gemma 3 27B-IT (FT) | Google | 2025-03-12 | 0.8372 | 0.9315 | 0.8901 | 0.7061 |
| Qwen3 8B (FT) | Alibaba | 2025-05-14 | 0.8198 | 0.9197 | 0.8904 | 0.7139 |
| Mistral Small 3.2 (FT) | Mistral | 2025-06-19 | 0.8014 | 0.9368 | 0.9105 | 0.7221 |

*(FT) = Fine-tuned on Text2KGBench-LettrIA*

## Features

### Interactive Elements
- **Metric selector**: Switch between Entities, Attributes, Properties, and Relations
- **Model type filter**: View all models, closed only, or open-weights only
- **Hover tooltips**: See detailed scores for all four metrics on any data point
- **Color coding**: Instantly identify publisher (Anthropic, Google, OpenAI, Mistral, Alibaba, Microsoft)
- **Shape coding**: Distinguish closed (circle) from open-weights (triangle) models

## Technical Details

- **Library**: Chart.js 4.4.0 with date-fns adapter
- **Chart Type**: Scatter plot with time scale
- **Data Source**: Text2KGBench-LettrIA paper, Appendix C (Plu et al., 2025)

## References

- [Text2KGBench-LettrIA Paper](https://ceur-ws.org/Vol-4041/paper3.pdf) - Plu et al., 2025
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
