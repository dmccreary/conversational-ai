---
title: Full-Text Search Capabilities
description: Interactive p5.js MicroSim that runs a real full-text search over five documents and shows how case folding, stemming, phrase matching, proximity search, and wildcards change the matches, precision, and recall.
image: full-text-search.png
og:image: full-text-search.png
status: draft
library: p5.js
---

# Full-Text Search Capabilities

Full-text search indexes every word in every document, then adds features that
decide how strictly a query word has to match. This MicroSim is a small but real
search engine running in your browser. Type a query, switch features on and off,
and see exactly which words matched and why.

## Interactive Demo

<iframe src="main.html" width="100%" height="759" scrolling="no"></iframe>

[Run the Full-Text Search MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in another page, use the following iframe:

```html
<iframe src="https://dmccreary.github.io/conversational-ai/sims/full-text-search/main.html" width="100%" height="759" scrolling="no"></iframe>
```

## Overview

The five cards are the document corpus. Each document's title and body are
indexed together. A document matches when it contains **every** query word (AND
logic), plus any phrase or proximity rule you turn on.

| Feature | What it does | Highlight |
|---------|--------------|-----------|
| Case-insensitive | Treats "PostgreSQL" and "postgresql" as the same word | Blue (exact) |
| Stemming | Matches words that share a root, using the Porter stemmer | Green |
| Phrase | The query words must appear side by side, in order | Yellow band |
| Proximity | The query words must appear within N words of each other | Yellow band |
| Wildcards | `*` matches any number of characters and `?` matches one | Orange |

Documents that match have a green border. In documents that did not match, any
words that did hit are shown with an outline only, so you can see how close the
document came. The line under each document explains the result.

### How the metrics work

The star marks the three documents that really answer the information need
"How do I back up a database?" (Docs 1, 2, and 4). Docs 3 and 5 mention the same
words but are about maintenance and recovery, so they are not relevant.

- **Precision** = relevant documents retrieved / all documents retrieved
- **Recall** = relevant documents retrieved / all relevant documents
- **F1 score** = the harmonic mean of precision and recall

## How to Use

1. Start with the default query **database backup**. Three documents match, but
   only one of them is relevant. Precision and recall are both 0.33.
2. Check **Stemming**. Doc 4 now matches because "databases" and "database"
   share the stem "databas". Recall and precision both rise.
3. Check **Proximity** and leave the distance at 3 words. Docs 3 and 5 drop out
   because their query words are far apart. Precision jumps to 1.00.
4. Move the distance slider to the right and watch Doc 5 come back.
5. Uncheck **Proximity**, choose the example **datab\* back\***, and check
   **Wildcards**. Every relevant document is found (recall 1.00), but so are
   the two that are not relevant.
6. Uncheck **Case-insensitive** and try **Database Backup** to see how brittle
   exact-case matching is.

## A Surprise Worth Noticing

Doc 2 is relevant, but the query "database backup" never finds it, even with
stemming on. The document says "back up" (two words) and "backing up." The
Porter stemmer reduces "backing" and "backed" to "back," but it leaves "backup"
unchanged, so the roots are different. Stemming fixes plurals and verb endings.
It does not fix vocabulary mismatch. That gap is one reason search systems add
synonym expansion and, later, semantic search.

## Lesson Plan

### Learning Objective

Students will be able to compare how case folding, stemming, phrase matching,
proximity search, and wildcards change the documents a query retrieves, and
analyze the resulting trade-off between precision and recall.

### Grade Level

Undergraduate (college sophomore) and adult learners.

### Duration

15 to 20 minutes.

### Prerequisites

- Keyword search and the inverted index (earlier in Chapter 2)
- Text processing basics from Chapter 1

### Activities

1. **Predict (3 min):** With the default query and only Case-insensitive on,
   ask students which of the five documents they expect to match before they
   look at the borders.
2. **One feature at a time (6 min):** Turn each feature on by itself. Record
   the retrieved documents, precision, and recall in a table.
3. **Combine (5 min):** Find a query and feature combination that reaches an F1
   score of at least 0.85. Is there a combination that reaches 1.00?
4. **Discuss (4 min):** Which features raise recall? Which raise precision? Why
   does Doc 2 stay hidden from "database backup"?

### Assessment

- Students explain, using one example from the MicroSim, why a feature that
  raises recall can lower precision.
- Students calculate precision, recall, and F1 by hand for the query
  "database backup" with stemming on and check their answer against the bars.

## References

- [Chapter 2: Search Technologies and Indexing Techniques](../../chapters/02-search-technologies-indexing/index.md)
- [Full-text search - Wikipedia](https://en.wikipedia.org/wiki/Full-text_search)
- [Precision and recall - Wikipedia](https://en.wikipedia.org/wiki/Precision_and_recall)
- Manning, C. D., Raghavan, P., and Schütze, H. (2008). [Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/). Cambridge University Press. Chapter 2 covers phrase and proximity queries; Chapter 8 covers precision and recall.
- Porter, M. F. (1980). An algorithm for suffix stripping. *Program*, 14(3), 130-137. See [the Porter stemming algorithm](https://tartarus.org/martin/PorterStemmer/).
