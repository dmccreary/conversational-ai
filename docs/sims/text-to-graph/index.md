---
title: Text-to-Knowledge-Graph Benchmark Comparison
description: Interactive bar chart comparing model performance across multiple text-to-knowledge-graph benchmarks including Text2KGBench and Text2KGBench-LettrIA.
quality_score: 90
---

# Text-to-Knowledge-Graph Benchmark Comparison

An interactive visualization comparing AI model performance on text-to-knowledge-graph extraction tasks across multiple published benchmarks.

<iframe src="main.html" width="100%" height="550" scrolling="no" style="border:none;"></iframe>

[View Fullscreen](main.html){ .md-button .md-button--primary }

### Embed This MicroSim

Copy this iframe to embed in your own website:

```html
<iframe src="https://dmccreary.github.io/conversational-ai/sims/text-to-graph/main.html" width="100%" height="550" scrolling="no" style="border:none;"></iframe>
```

## Overview

This chart aggregates published benchmark results from multiple text-to-knowledge-graph evaluation frameworks, allowing comparison of how different language models extract structured knowledge graph triples from natural language text.

!!! note
    The company Lettria now claims to have got a 99.8% F1 score by fine-tuning the 27B parameter Deepseek Gemma 3 model.  This would be impressive if true. [Lettria Perseus Reference](https://deepmind.google/models/gemma/gemmaverse/lettria/)

### Included Benchmarks

| Benchmark | Datasets | Description | Source |
|-----------|----------|-------------|--------|
| **Text2KGBench** | Wikidata-TekGen, DBpedia-WebNLG | Original ontology-driven KG extraction benchmark | Mihindukulasooriya et al., 2023 |
| **Text2KGBench-LettrIA** | DBpedia-WebNLG (refined) | Refined benchmark with improved data quality | Plu et al., 2025 |
| **KG-Generation** | General | Comparative study of KG generation | Trajanov et al., 2024 |
| **Sepsis-KG** | Medical/Sepsis domain | Domain-specific KG construction | Wang et al., 2025 |

### Current Results Summary

| Model | F1 Score | Benchmark | Dataset |
|-------|----------|-----------|---------|
| GPT-4 | 0.82 | KG-Generation | General |
| LLaMA 2 | 0.77 | KG-Generation | General |
| GPT-4 | 0.77 | Sepsis-KG | Sepsis |
| BERT | 0.72 | KG-Generation | General |
| *Claude Opus 4.5 (Est.)* | *~0.70* | *Text2KGBench-LettrIA* | *DBpedia-WebNLG (refined)* |
| **Gemini 2.5 Pro** | 0.6595 | Text2KGBench-LettrIA | DBpedia-WebNLG (refined) |
| **Claude Sonnet 4** | 0.6487 | Text2KGBench-LettrIA | DBpedia-WebNLG (refined) |
| **GPT-4.1** | 0.6472 | Text2KGBench-LettrIA | DBpedia-WebNLG (refined) |
| Llama 3 | 0.48 | Sepsis-KG | Sepsis |
| Qwen2 | 0.44 | Sepsis-KG | Sepsis |
| Vicuna-13B | 0.35 | Text2KGBench | Wikidata-TekGen |
| Vicuna-13B | 0.30 | Text2KGBench | DBpedia-WebNLG |
| Alpaca-LoRA-13B | 0.27 | Text2KGBench | Wikidata-TekGen |
| Alpaca-LoRA-13B | 0.25 | Text2KGBench | DBpedia-WebNLG |

!!! warning "Estimated Value"
    The **Claude Opus 4.5** result (~0.70 F1) is an **estimate**, not a published benchmark result. It is based on typical performance improvements between Claude Sonnet 4 (0.6487) and Opus models on reasoning tasks (~5-15% improvement). The actual performance may differ.

**Note:** Results from different benchmarks are not directly comparable due to differences in evaluation methodology, datasets, and task definitions.

## Features

### Interactive Elements

- **Dataset Filter**: Select specific datasets or benchmarks to compare
- **Metric Filter**: Filter by evaluation metric (F1_overall, Precision, Recall)
- **Hover Tooltips**: View exact scores by hovering over bars
- **Clickable Legend**: Click model names to show/hide their results

### Visual Design

- Color-coded bars by model (GPT-4 green, Gemini blue, Claude brown, etc.)
- Clear axis labels showing dataset names and score values
- Responsive layout adapting to container width

## Adding Your Own Data

Edit the `data.csv` file to add benchmark results. Key columns for the chart:

| Column | Description | Example |
|--------|-------------|---------|
| `chart_series` | Model name (determines color/legend) | GPT-4.1, Claude Sonnet 4 |
| `chart_label` | Dataset name (x-axis label) | DBpedia-WebNLG (refined) |
| `chart_metric` | Metric being measured | F1_overall |
| `chart_value` | The score (0-1 scale) | 0.6472 |
| `source_citation` | Paper citation | Plu et al., 2025 |
| `source_url` | Link to source paper | https://ceur-ws.org/... |

### Example CSV Row

```csv
run_id,benchmark_name,dataset_name,model_provider,model_name,chart_series,chart_label,chart_metric,chart_value,source_citation,source_url
T2KGBL-001,Text2KGBench-LettrIA,DBpedia-WebNLG (refined),OpenAI,GPT-4.1,GPT-4.1,DBpedia-WebNLG (refined),F1_overall,0.6472,"Plu et al., 2025",https://ceur-ws.org/Vol-4041/paper3.pdf
```

## Customization Guide

### Changing Colors

Edit the `providerColors` object in `main.html`:

```javascript
const providerColors = {
    'GPT-4.1': { bg: 'rgba(16, 163, 127, 0.8)', border: 'rgb(16, 163, 127)' },
    'Claude Sonnet 4': { bg: 'rgba(204, 133, 102, 0.8)', border: 'rgb(204, 133, 102)' },
    'Gemini 2.5 Pro': { bg: 'rgba(66, 133, 244, 0.8)', border: 'rgb(66, 133, 244)' },
    // Add more models...
};
```

### Adjusting Chart Height

Modify the `.chart-container` height in `style.css`:

```css
.chart-container {
    height: 400px; /* Adjust as needed */
}
```

## Technical Details

- **Library**: Chart.js 4.4.0
- **Data Source**: CSV file loaded dynamically
- **Browser Compatibility**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Responsive**: Yes, adapts to container width

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain what text-to-knowledge-graph benchmarks measure and why they matter
2. Interpret F1 scores and compare model performance across different benchmarks
3. Understand the importance of ontology compliance in knowledge graph extraction
4. Analyze why frontier models (GPT-4, Claude, Gemini) outperform baseline models
5. Recognize that benchmark results are not directly comparable across different evaluation frameworks

### Target Audience

- College sophomores studying NLP or knowledge graphs
- Data scientists evaluating LLMs for information extraction
- Researchers working on knowledge graph construction

### Prerequisites

- Basic understanding of knowledge graphs (nodes, edges, triples)
- Familiarity with precision, recall, and F1 score metrics
- Introduction to large language models

### Activities

1. **Exploration (10 min)**: Use the dataset filter to compare models within the same benchmark. How do frontier models compare to baseline models on Text2KGBench-LettrIA?

2. **Analysis (15 min)**: Compare the F1 scores across benchmarks. Why might GPT-4 score 0.82 on KG-Generation but GPT-4.1 score 0.65 on Text2KGBench-LettrIA?

3. **Discussion (10 min)**: What factors affect benchmark comparability? Consider dataset size, ontology complexity, evaluation methodology, and prompting strategies.

### Assessment

- Quiz: Why can't we directly compare F1 scores across different benchmarks?
- Practical: Find a published paper with KG extraction results and add them to data.csv

## References

1. [Text2KGBench Paper](https://arxiv.org/abs/2308.02357) - 2023 - ISWC - Mihindukulasooriya et al. Original benchmark introducing ontology-driven text-to-KG evaluation
2. [Text2KGBench-LettrIA Paper](https://ceur-ws.org/Vol-4041/paper3.pdf) - 2025 - CEUR-WS - Plu et al. Refined benchmark with improved data quality and frontier model results
3. [KG Generation Comparative Study](https://arxiv.org/abs/2412.07412) - 2024 - arXiv - Trajanov et al. Comparison of GPT-4, LLaMA 2, and BERT
4. [Sepsis KG Construction](https://pmc.ncbi.nlm.nih.gov/articles/PMC11986385/) - 2025 - PMC - Wang et al. Domain-specific KG construction evaluation
5. [Text2KGBench GitHub](https://github.com/cenguix/Text2KGBench) - Repository with benchmark code, datasets, and baseline implementations
6. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) - Library documentation for the visualization framework
