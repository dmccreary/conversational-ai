---
title: Natural Language to SQL Conversion Pipeline
description: Architecture of a pipeline that converts natural language questions to executed SQL using parallel template, LLM, and semantic strategies plus validation and safety layers.
image: natural-language-to-sql-conversion-pipeline.png
og:image: natural-language-to-sql-conversion-pipeline.png
status: draft
library: Mermaid.js
---

# Natural Language to SQL Conversion Pipeline

This MicroSim shows the complete pipeline a conversational analytics system uses
to turn a plain-English question into a safely executed SQL query. Three
conversion strategies run in parallel, the most confident result is selected,
and the candidate SQL must pass through validation and safety gates before it
ever touches the database. Hover any component for details.

## About This Diagram

The question fans out to three strategies at once: a fast template path that
handles most queries, an LLM path for novel questions, and an experimental
semantic-parsing path. Their candidates converge at a selection step, then flow
through schema, pattern, and sanitization checks and a safety layer that
enforces a timeout and a row limit. Dotted lines show the error paths that lead
to human escalation.

## Interactive Demo

<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>
```

## How It Works

- **Template path (green, ~90% of queries):** match the question to a known
  pattern, extract parameters, and substitute them into a vetted SQL template.
  Highest confidence and safest.
- **LLM path (yellow):** for novel questions, build a schema-aware prompt and let
  a language model generate a SQL candidate. Medium confidence.
- **Semantic parsing path (orange, experimental):** parse the question into a
  logical form and translate that form into SQL. Used for research.
- **Selection and validation (blue):** pick the highest-confidence candidate,
  then verify the schema, check the query pattern, and sanitize parameters.
- **Safety and execution (red):** run the parameterized query with a 5-second
  timeout and a 1000-row limit, catching errors.

If validation fails or execution errors out, the dotted error paths escalate to
a human or return a safe error message rather than guessing.

## Lesson Plan

- **Compare strategies.** Discuss the tradeoffs between template, LLM, and
  semantic-parsing approaches in confidence, coverage, and safety.
- **Defend the gates.** Explain why schema validation, pattern checks, and
  sanitization all run before execution.
- **Reason about safety.** Justify the 5-second timeout and 1000-row limit in
  terms of protecting the database from runaway queries.
- **Trace an error.** Follow what happens when the generated SQL references a
  column that does not exist.

## References

- [Chapter 12: Database Queries and Parameters](../../chapters/12-database-queries-parameters/index.md)
- [Text-to-SQL (Wikipedia)](https://en.wikipedia.org/wiki/Text-to-SQL)
- [SQL injection prevention (OWASP)](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
