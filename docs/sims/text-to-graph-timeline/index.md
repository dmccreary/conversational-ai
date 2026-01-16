---
title: Text2KGBench-LettrIA F1 Scores Timeline
description: Interactive timeline showing F1 scores for text-to-knowledge-graph models on the Text2KGBench-LettrIA Generalization benchmark
---

# Text2KGBench-LettrIA F1 Scores Timeline

An interactive visualization showing how language models perform on the Text2KGBench-LettrIA Generalization benchmark over time, combining data from Text2KGBench (2023) and Text2KGBench-LettrIA (2025).

<iframe src="main.html" width="100%" height="670" scrolling="no" style="border: 1px solid #ddd; border-radius: 8px;"></iframe>

[View Fullscreen](main.html){ .md-button .md-button--primary }

## Overview

This chart displays F1 scores from two related benchmarks:

1. **Text2KGBench (2023)** - The original benchmark by Mihindukulasooriya et al. for evaluating ontology-guided KG construction from text
2. **Text2KGBench-LettrIA (2025)** - A refined version by Plu et al. with improved ontologies and annotations

### Metrics

- **Overall F1**: Combined score for knowledge graph extraction (available for all models)
- **Entities (E)**: F1 score for correctly identifying entity classes
- **Attributes (A)**: F1 score for correctly extracting literal values
- **Properties (P)**: F1 score for identifying datatype properties
- **Relations (R)**: F1 score for identifying object properties

*Note: The detailed E/A/P/R breakdown is only available for Text2KGBench-LettrIA (2025) models.*

## Key Findings

1. **Dramatic improvement from 2023 to 2025**: Early open-weights models (Vicuna, Alpaca) achieved only 0.25-0.30 Overall F1, while modern models reach 0.85+

2. **Fine-tuned open models outperform proprietary**: Models like Gemma 3 27B-IT and Qwen3 8B achieve higher scores than zero-shot proprietary models

3. **Top performers (2025)**: Claude Sonnet 4 (0.87), Gemini 2.5 Pro (0.86), and fine-tuned Qwen3 32B (0.85)

## Data Summary

### Text2KGBench (2023) - Original Benchmark

| Model | Publisher | Release | Overall F1 |
|-------|-----------|---------|------------|
| Vicuna-13B | Open-weights | 2023-03 | 0.30 |
| Alpaca-LoRA-13B | Open-weights | 2023-03 | 0.25 |

### Text2KGBench-LettrIA (2025) - Top Performers

| Model | Publisher | Release | Overall | Entities | Attributes | Properties | Relations |
|-------|-----------|---------|---------|----------|------------|------------|-----------|
| Claude Sonnet 4 | Anthropic | 2025-05 | 0.870 | 0.783 | 0.951 | 0.928 | 0.718 |
| Gemini 2.5 Pro | Google | 2025-03 | 0.860 | 0.775 | 0.958 | 0.937 | 0.724 |
| Qwen3 32B (FT) | Alibaba | 2025-05 | 0.851 | 0.775 | 0.920 | 0.898 | 0.709 |
| Gemma 3 12B-IT (FT) | Google | 2025-03 | 0.845 | 0.838 | 0.928 | 0.892 | 0.722 |
| Mistral Small 3.2 (FT) | Mistral | 2025-06 | 0.843 | 0.801 | 0.937 | 0.911 | 0.722 |

*(FT) = Fine-tuned on Text2KGBench-LettrIA*

## Features

### Interactive Controls
- **Metric selector**: Switch between Overall F1 and detailed E/A/P/R metrics
- **Model type filter**: View all models, closed/proprietary only, or open-weights only
- **Benchmark filter**: Compare across benchmarks or focus on one version
- **Hover tooltips**: See all available scores for any data point

### Visual Encoding
- **Circle** = Closed/Proprietary models (zero-shot)
- **Triangle** = Open-weights models (fine-tuned)
- **Colors by publisher**: Anthropic (orange), Google (blue), OpenAI (green), Mistral (coral), Alibaba (purple), Microsoft (cyan)

## Classroom Discussion

Have students examine the visualization and discuss the following questions:

### Trend Analysis

1. **Performance Trajectory**: What overall trend do you observe in F1 scores from 2023 to 2025? What factors might explain this rapid improvement?

2. **Open vs. Closed Models**: Compare the performance of fine-tuned open-weights models to zero-shot proprietary models. What implications does this have for organizations building knowledge graph applications?

3. **Metric Breakdown**: Switch between the different metrics (E, A, P, R). Which extraction task appears most challenging for models? Why might Relations (R) scores be consistently lower than Attributes (A)?

### Implications for Intelligent Textbooks

4. **Knowledge Graph Quality**: If an intelligent textbook uses LLMs to automatically extract concepts, relationships, and attributes from educational content, what minimum F1 score would you consider acceptable? How would extraction errors impact learning?

5. **Cost-Performance Tradeoffs**: Consider that smaller fine-tuned models (e.g., Qwen3 4B at 0.81) approach the performance of large proprietary models. What are the implications for deploying knowledge extraction in resource-constrained educational settings?

6. **Benchmark Evolution**: The refinement from Text2KGBench (2023) to Text2KGBench-LettrIA (2025) improved annotation quality. How might benchmark improvements influence the development of educational AI systems?

### Design Exercise

7. **Building a Learning Graph Pipeline**: Design a pipeline that uses text-to-knowledge-graph models to automatically generate learning graphs from textbook chapters. Consider:
    - Which model(s) would you choose and why?
    - How would you handle extraction errors?
    - What human-in-the-loop validation would be needed?
    - How would you ensure concept dependencies are correctly identified?

## Technical Details

- **Library**: Chart.js 4.4.0 with date-fns adapter
- **Chart Type**: Scatter plot with time scale (quarterly)
- **Time Range**: January 2023 to January 2026
- **Source Files**:
    - `main.html` - HTML structure and styling
    - `script.js` - Chart.js visualization logic
    - [data.json](data.json) - Model benchmark data (34 models with scores)

## References

- [Text2KGBench (2023)](https://arxiv.org/abs/2308.02357) - Mihindukulasooriya et al.
- [Text2KGBench-LettrIA (2025)](https://ceur-ws.org/Vol-4041/paper3.pdf) - Plu et al.
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
