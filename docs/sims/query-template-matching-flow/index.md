---
title: Query Template Matching Flow
description: Flowchart showing how a chatbot matches a question to a SQL query template, extracts and validates parameters, executes the query, and formats the response.
image: query-template-matching-flow.png
og:image: query-template-matching-flow.png
status: draft
library: Mermaid.js
---

# Query Template Matching Flow

This MicroSim traces the full lifecycle of a template-based database query: a
user asks a question in plain language, the system finds the closest query
template, fills in and validates the parameters, runs the SQL, and formats a
conversational answer. Hover any step to see exactly what happens, with example
values carried through the whole flow.

## About This Diagram

The flow follows the worked example "What were Northeast sales in Q4?" After
normalization, the question is scored against every template. If a template
matches, parameters are extracted and validated (with a clarification loop for
missing values), the SQL is executed, and the result is formatted. Decision
diamonds branch to error handling when no template matches or a query fails.

## Interactive Demo

<iframe src="main.html" width="100%" height="1622" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in your own page, use the following iframe:

```html
<iframe src="main.html" width="100%" height="1622" scrolling="no"></iframe>
```

## How It Works

1. **Normalize** the question (lowercase, expand contractions, drop filler).
2. **Score similarity** against all template patterns using fuzzy or semantic
   matching.
3. **Decision - match found?** If the best score is below threshold (e.g. 0.75),
   return an "unsupported query" message. Otherwise select the best template.
4. **Extract parameters** such as "Northeast" for the region and "Q4" for the
   time period.
5. **Validate** parameters. If any are missing or invalid, ask a clarifying
   question and loop back to extraction.
6. **Calculate dynamic values** (e.g. convert "Q4" to a date range) and
   **substitute** them into the SQL template.
7. **Execute** the parameterized query.
8. **Decision - successful?** On error, log it and return a friendly message; on
   success, format the results and return the response.

## Lesson Plan

- **Set the threshold.** Discuss how the similarity threshold trades coverage
  against the risk of running the wrong template.
- **Close the loop.** Explain why the clarification loop is safer than guessing
  a missing parameter.
- **Convert temporal values.** Walk through turning "Q4" into a concrete date
  range for the WHERE clause.
- **Handle failure gracefully.** Compare the technical log message with the
  user-facing friendly message and explain why both exist.

## References

- [Chapter 12: Database Queries and Parameters](../../chapters/12-database-queries-parameters/index.md)
- [Natural Language to SQL Conversion Pipeline](../natural-language-to-sql-conversion-pipeline/index.md)
- [Parameterized queries (OWASP)](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html)
