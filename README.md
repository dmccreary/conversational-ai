# Conversational AI

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/conversational-ai/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fconversational--ai-blue?logo=github)](https://github.com/dmccreary/conversational-ai)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/conversational-ai/](https://dmccreary.github.io/conversational-ai/)

## Overview

This is an interactive, AI-generated intelligent textbook on **Conversational AI** designed for college sophomores and anyone interested in building intelligent chatbots and conversational AI systems. Built using MkDocs with the Material theme, it incorporates learning graphs, concept dependencies, interactive MicroSims, and AI-assisted content generation.

The course teaches students to build production-quality chatbots from the ground up, starting with basic keyword search and progressing to cutting-edge GraphRAG systems that power modern conversational AI. The curriculum covers search technologies, natural language processing, large language models, embeddings, vector databases, RAG patterns, knowledge graphs, and production deployment with security and privacy considerations.

The textbook follows Bloom's Taxonomy (2001 revision) for learning outcomes and uses concept dependency graphs to ensure proper prerequisite sequencing. All content is generated and curated using Claude AI, making it a Level 2+ intelligent textbook with interactive elements including a visual learning graph viewer and comprehensive quizzes aligned to learning objectives.

Whether you're a student learning conversational AI for the first time, an educator looking for structured course materials, or a developer wanting to build production chatbot systems, this textbook provides comprehensive coverage with hands-on examples and interactive elements that make complex AI concepts accessible and engaging.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 200 |
| Chapters | 14 |
| Markdown Files | 59 |
| MicroSims | 1 |
| Glossary Terms | 200 |
| FAQ Questions | 91 |
| Quiz Files | 14 |
| Images | 10 |
| References | 9 |

**Completion Status:** Approximately 90% complete (content generation and refinement phase)

**Key Features:**
- Comprehensive learning graph with 200 interconnected concepts
- 14 chapters covering foundations through advanced topics
- Interactive Learning Graph Viewer MicroSim
- 200 ISO 11179-compliant glossary definitions
- 91 frequently asked questions
- Quiz for each chapter
- Bloom's Taxonomy-aligned learning objectives

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/conversational-ai.git
cd conversational-ai
```

### Install Dependencies

This project uses MkDocs with the Material theme and social card plugins:

```bash
pip install mkdocs
pip install mkdocs-material
pip install pillow cairosvg
```

### Build and Serve Locally

Build the site:

```bash
mkdocs build
```

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will build the site and push it to the `gh-pages` branch for automatic hosting on GitHub Pages.

## Using the Textbook

### Navigation

- Use the left sidebar to browse chapters in sequence
- Click the search icon to search all content across the textbook
- Each chapter includes comprehensive content and a quiz
- Explore the Learning Graph section for concept dependencies and quality metrics

### Interactive Features

**Learning Graph Viewer:**
- Visual, interactive exploration of all 200 concepts
- Shows concept dependencies and relationships
- Filter by taxonomy categories
- Available in the MicroSims section

**Quizzes:**
- Each chapter includes a multiple-choice quiz
- Questions aligned to specific concepts from the learning graph
- Distributed across Bloom's Taxonomy cognitive levels

**Glossary:**
- 200 terms with ISO 11179-compliant definitions
- Precise, concise, and non-circular definitions
- Includes practical examples for each term

**FAQs:**
- 91 frequently asked questions organized by topic
- Covers getting started, technical concepts, and practical applications
- Links to relevant course sections

## Repository Structure

```
conversational-ai/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # Chapter content (14 chapters)
│   │   ├── 01-foundations-ai-nlp/
│   │   │   ├── index.md          # Chapter content
│   │   │   └── quiz.md           # Chapter quiz
│   │   ├── 02-search-technologies-indexing/
│   │   └── ...                   # Chapters 3-14
│   ├── sims/                      # Interactive MicroSims
│   │   └── graph-viewer/         # Learning graph visualization
│   │       ├── main.html         # Standalone vis-network app
│   │       └── index.md          # Documentation
│   ├── learning-graph/            # Learning graph data and analysis
│   │   ├── concept-list.md       # 200 concepts
│   │   ├── quality-metrics.md    # Quality analysis
│   │   ├── concept-taxonomy.md   # Bloom's Taxonomy mapping
│   │   └── book-metrics.md       # Site statistics
│   ├── prompts/                   # Sample AI prompts used
│   ├── glossary.md                # 200 ISO 11179-compliant terms
│   ├── faq.md                     # 91 frequently asked questions
│   ├── references.md              # Curated references
│   ├── course-description.md      # Full course details
│   └── index.md                   # Homepage
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## Course Content

### Chapter Overview

1. **Foundations of AI and NLP** - AI history, timeline, NLP basics
2. **Search Technologies and Indexing** - Keyword search, inverted indices, full-text search
3. **Semantic Search and Quality Metrics** - Moving beyond keywords to meaning
4. **Large Language Models and Tokenization** - Understanding LLMs, tokens, context windows
5. **Embeddings and Vector Databases** - Semantic embeddings, vector similarity, ANN search
6. **Building Chatbots and Intent Recognition** - Intent classification, dialog management
7. **Chatbot Frameworks and User Interfaces** - UI design, conversation flow
8. **User Feedback and Continuous Improvement** - Analytics, A/B testing, feedback loops
9. **The RAG Pattern** - Retrieval-Augmented Generation architecture
10. **Knowledge Graphs and GraphRAG** - Graph databases, GraphRAG systems
11. **NLP Pipelines and Text Processing** - Preprocessing, tokenization, pipelines
12. **Database Queries and Parameter Extraction** - Connecting chatbots to databases
13. **Security, Privacy, and User Management** - Authentication, authorization, data privacy
14. **Evaluation, Optimization, and Career Development** - KPIs, performance tuning, career paths

### Prerequisites

- Basic Python programming (functions, loops)
- Comfort with terminal/command-line tools
- GitHub account
- VSCode or similar IDE
- Non-CS majors welcome!

## Customization

### Modifying Content

- Edit markdown files in `docs/` to modify content
- Add new chapters by creating directories in `docs/chapters/`
- Update `mkdocs.yml` navigation to reflect structural changes

### Adding MicroSims

- Create new simulation directories in `docs/sims/`
- Include `main.html` for standalone simulation
- Add `index.md` for documentation and iframe embed
- Follow the pattern established in `sims/graph-viewer/`

### Customizing Theme

- Modify colors and fonts in `mkdocs.yml` theme section
- Add custom CSS in `docs/css/extra.css`
- Add custom JavaScript in `docs/js/extra.js`

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/conversational-ai/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/environment details (for MicroSims)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [License](docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive documentation theme
- **[vis-network](https://visjs.org/)** - Network visualization library for the learning graph viewer
- **[Python](https://www.python.org/)** - Programming language and ecosystem
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation and curation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source educational projects

Special thanks to the educators, AI researchers, and open source developers who contribute to making educational resources accessible, interactive, and freely available to learners worldwide.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.

---

**Built with Claude Code** - An AI-assisted development tool that helps create high-quality educational content efficiently.
