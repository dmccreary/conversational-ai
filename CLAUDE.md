# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **intelligent textbook** on Conversational AI built using MkDocs with the Material theme. It's a Level 2+ intelligent textbook that uses AI-assisted content generation, learning graphs with concept dependencies, and interactive MicroSims. The textbook teaches college sophomores how to build production-quality chatbots from keyword search through cutting-edge GraphRAG systems.

**Core Architecture:**
- **Learning Graph-Driven:** All content is organized around 200 interconnected concepts stored in `docs/learning-graph/learning-graph.csv` with dependencies that form a directed acyclic graph (DAG)
- **Chapter Structure:** 14 chapters, each covering a specific subset of concepts from the learning graph
- **Bloom's Taxonomy Alignment:** Content follows the 2001 revision of Bloom's Taxonomy for cognitive learning outcomes
- **Interactive Elements:** MicroSims (p5.js, vis-network), quizzes aligned to concepts, learning graph viewer

## Essential Commands

### Build and Serve

```bash
# Serve locally with live reload (development)
mkdocs serve

# Build static site to site/ directory
mkdocs build

# Deploy to GitHub Pages (gh-pages branch)
mkdocs gh-deploy
```

### Learning Graph Tools

Python scripts in `docs/learning-graph/` manage the concept dependency graph:

```bash
# Validate learning graph structure (checks for cycles, orphans, etc.)
python docs/learning-graph/validate-learning-graph.py

# Analyze graph metrics (longest paths, dependency chains)
python docs/learning-graph/analyze-graph.py

# Convert CSV to JSON for vis-network visualization
python docs/learning-graph/csv-to-json.py

# Generate taxonomy distribution report
python docs/learning-graph/taxonomy-distribution.py

# Add taxonomy tags to concepts
python docs/learning-graph/add-taxonomy.py
```

## Content Architecture

### Learning Graph as Foundation

The learning graph (`docs/learning-graph/learning-graph.csv`) is the **central nervous system** of the textbook:

- **Format:** CSV with columns: `ConceptID,ConceptLabel,Dependencies,TaxonomyID`
- **Dependencies:** Pipe-delimited concept IDs (e.g., `1|5|20` means depends on concepts 1, 5, and 20)
- **Taxonomy Tags:** Categories like FOUND (foundational), SEARCH, NLP, LLM, RAG, etc.
- **Ordering Constraint:** Concepts must be taught in dependency order across chapters

**Key Files:**
- `learning-graph.csv` - Source of truth for all 200 concepts
- `learning-graph.json` - vis-network format for interactive graph viewer
- `concept-list.md` - Human-readable numbered list
- `quality-metrics.md` - Validation report (cycles, orphans, chain lengths)
- `concept-taxonomy.md` - Bloom's Taxonomy mapping for each concept

### Chapter Content Pattern

Each chapter follows a strict structure in `docs/chapters/##-chapter-name/`:

```
index.md          # Main chapter content
quiz.md           # Multiple-choice quiz aligned to concepts
```

**Chapter index.md Structure:**
1. **Summary** - What the chapter covers
2. **Concepts Covered** - Numbered list of concepts from learning graph
3. **Prerequisites** - Dependencies from earlier chapters
4. **Content Sections** - Detailed explanations, examples, diagrams
5. **Embedded MicroSims** - Inline `<details>` blocks describing visualizations to be created

**Important:** When adding content to chapters, always verify that concepts are introduced in dependency order by checking `learning-graph.csv`.

### Quiz Pattern

Each `quiz.md` contains:
- Multiple-choice questions aligned to specific concepts
- Distribution across Bloom's Taxonomy levels (Remember, Understand, Apply, Analyze)
- Questions reference the concept ID they assess

### MicroSim Structure

MicroSims live in `docs/sims/sim-name/`:

```
main.html         # Standalone interactive simulation
index.md          # Documentation with iframe embed
metadata.json     # Dublin Core metadata (optional)
```

**Pattern for index.md:**
```markdown
# Simulation Name

## Description
...

## Interactive Demo

<iframe src="main.html" width="100%" height="600px"></iframe>

[Open full screen](main.html){:target="_blank"}
```

## Intelligent Textbook Conventions

### ISO 11179 Glossary Standards

`docs/glossary.md` follows ISO 11179 metadata registry standards:

- **Precise:** Accurate and unambiguous
- **Concise:** Brief without sacrificing clarity
- **Distinct:** Non-circular (doesn't use the term in its own definition)
- **Non-circular:** Doesn't reference itself
- **No business rules:** Pure definition, not usage guidelines

**Format:**
```markdown
#### Term Name

Definition in a single sentence or brief paragraph.

**Example:** Concrete example showing the term in context.
```

### FAQ Organization

`docs/faq.md` is organized by topic with:
- Questions derived from course description, learning graph concepts, and glossary
- Links to relevant course sections
- Coverage of getting started, technical concepts, and practical applications

### Visualization Specifications

Chapter content includes `<details>` blocks that specify visualizations to be created as MicroSims or static diagrams:

```markdown
<details>
    <summary>Visualization Title</summary>
    Type: timeline|diagram|bubble-chart|venn-diagram|network-graph

    Purpose: Educational purpose

    [Type-specific parameters...]

    Visual style: Styling requirements
    Color coding: Category color mappings
</details>
```

These serve as specifications for the visualization generator skills.

## AI-Assisted Content Generation

This textbook uses Claude Code skills for content generation:

- `learning-graph-generator` - Creates the 200-concept learning graph from course description
- `book-chapter-generator` - Designs chapter structure respecting concept dependencies
- `chapter-content-generator` - Generates comprehensive chapter content
- `glossary-generator` - Creates ISO 11179-compliant definitions
- `faq-generator` - Generates FAQs from course content
- `quiz-generator` - Creates Bloom's Taxonomy-aligned quizzes
- `timeline-generator`, `mermaid-generator`, `bubble-chart-generator`, etc. - Create MicroSims

**Workflow:** Course description → Learning graph → Chapter structure → Chapter content → Glossary/FAQ/Quizzes → MicroSims

## Key Data Files

### Learning Graph Files

- `docs/learning-graph/learning-graph.csv` - **Source of truth** for all concepts
- `docs/learning-graph/learning-graph.json` - JSON format for vis-network graph viewer
- `docs/learning-graph/color-config.json` - Color mapping for taxonomy categories

### Configuration

- `mkdocs.yml` - Site configuration, navigation, theme settings
- `plugins/social_override.py` - Custom social card generation plugin
- `docs/css/extra.css` - Custom styling
- `docs/js/extra.js` - Custom JavaScript

### Reports and Metrics

- `docs/learning-graph/quality-metrics.md` - Graph validation (cycles, orphans, chain analysis)
- `docs/learning-graph/book-metrics.md` - Overall textbook statistics
- `docs/learning-graph/chapter-metrics.md` - Per-chapter progress tracking
- `docs/learning-graph/glossary-quality-report.md` - ISO 11179 compliance check
- `docs/learning-graph/faq-quality-report.md` - FAQ coverage analysis

## MkDocs Material Theme Specifics

**Navigation Pattern:**
- Left sidebar: Sequential chapter navigation
- Top search: Full-text search across all content
- Features enabled: code copying, navigation expansion, breadcrumbs, prev/next footer links

**Custom Plugins:**
- `social` - Generates social preview cards
- `social_override` - Custom social card generation (in `plugins/`)
- `search` - Built-in search functionality

**Content Extensions:**
- Admonitions: `!!! Note`, `!!! Warning`, etc.
- Code blocks with syntax highlighting
- Markdown in HTML for complex layouts
- Details/summary for collapsible content

## Development Patterns

### Adding a New Chapter

1. Identify which concepts from `learning-graph.csv` the chapter covers
2. Verify concept dependencies allow the chapter placement
3. Create `docs/chapters/##-chapter-name/index.md` and `quiz.md`
4. Update `mkdocs.yml` navigation
5. Follow the chapter index.md structure pattern
6. Generate quiz aligned to chapter concepts
7. Update `docs/learning-graph/chapter-metrics.md`

### Creating a MicroSim

1. Create directory in `docs/sims/sim-name/`
2. Build standalone `main.html` with all dependencies inline
3. Create `index.md` with description and iframe embed
4. Add entry to `docs/sims/index.md`
5. Add link in relevant chapter content
6. Optionally add `metadata.json` with Dublin Core fields

### Updating the Learning Graph

1. Edit `docs/learning-graph/learning-graph.csv`
2. Run `python docs/learning-graph/validate-learning-graph.py` to check for cycles
3. Run `python docs/learning-graph/csv-to-json.py` to update JSON format
4. Run `python docs/learning-graph/analyze-graph.py` to generate new metrics
5. Update `docs/learning-graph/quality-metrics.md` with validation results
6. Update affected chapters if concept dependencies changed

## Important Constraints

### Concept Dependency Ordering

**Critical:** Concepts must be introduced before they're used as dependencies. The learning graph enforces this through a DAG structure. Before adding content that references a concept:

1. Check `learning-graph.csv` for the concept's dependencies
2. Verify all dependencies are covered in earlier chapters
3. If not, either reorganize content or update the learning graph

### Maximum Dependency Chain

The longest learning path is 13 concepts (see `quality-metrics.md`). Avoid creating longer chains as they make content sequencing difficult.

### Chapter Concept Allocation

Chapters cover 9-20 concepts each. Respect this distribution to maintain balanced content:
- Too few concepts = shallow chapter
- Too many concepts = overwhelming chapter

### Bloom's Taxonomy Distribution

Content should span all six levels:
1. **Remember** - Recall facts (definitions, lists)
2. **Understand** - Explain concepts (summaries, examples)
3. **Apply** - Use in new situations (code examples, exercises)
4. **Analyze** - Break down and examine (comparisons, tradeoffs)
5. **Evaluate** - Judge and critique (quality metrics, limitations)
6. **Create** - Build new solutions (projects, implementations)

## File Naming Conventions

- Chapters: `##-kebab-case-name/` (e.g., `01-foundations-ai-nlp/`)
- MicroSims: `kebab-case-name/` (e.g., `graph-viewer/`)
- Markdown files: `kebab-case-name.md`
- Python scripts: `snake_case_name.py`

## Testing and Validation

Before committing changes:

```bash
# Validate MkDocs builds without errors
mkdocs build

# Validate learning graph structure
python docs/learning-graph/validate-learning-graph.py

# Check for broken internal links (if using mkdocs-linkcheck plugin)
mkdocs build --strict

# Serve locally and manually verify navigation
mkdocs serve
```

## License and Attribution

- **License:** Creative Commons BY-NC-SA 4.0
- **Attribution Required:** Link back to original repository
- **No Commercial Use** without permission
- **Share-Alike:** Derivatives must use same license

See `docs/license.md` for full terms.
