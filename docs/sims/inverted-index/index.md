---
title: Inverted Index Structure
description: Interactive p5.js MicroSim that builds a real inverted index from three short documents and steps through tokenizing, normalizing, and index building to show how each term maps to a postings list.
image: inverted-index.png
og:image: inverted-index.png
status: draft
library: p5.js
---

# Inverted Index Structure

An inverted index is the data structure behind almost every search engine. Instead
of storing "document 1 contains these words," it stores "this word appears in these
documents." This MicroSim builds a real inverted index in your browser from three
short documents so you can watch that inversion happen one step at a time.

## Interactive Demo

<iframe src="main.html" width="100%" height="644" scrolling="no"></iframe>

[Run the Inverted Index MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To embed this MicroSim in another page, use the following iframe:

```html
<iframe src="https://dmccreary.github.io/conversational-ai/sims/inverted-index/main.html" width="100%" height="644" scrolling="no"></iframe>
```

## Overview

The diagram reads left to right:

- **Source Documents** (blue) are the three raw documents.
- **Indexing Pipeline** (orange) is the three-step process that turns text into
  an index: tokenize, normalize, and build the index.
- **Inverted Index** (green and yellow) is the result. The green **dictionary**
  (also called the vocabulary) is the sorted list of unique terms. Each term
  points to a yellow **postings list** of the documents that contain it.

Nothing in the display is hard-coded. The tokens, normalized terms, dictionary,
and postings lists are all computed from the document text each time you change
an option.

## How to Use

1. The MicroSim opens on **Step 3**, the finished index, with the term
   *database* selected. Its postings list shows every document that contains
   the term, how many times it appears (frequency), and where (positions).
2. Click any other term in the dictionary. The matching words light up in the
   source documents.
3. Click **Previous step** (or click a pipeline box) to go back to
   **Step 2: Normalize** and **Step 1: Tokenize** and see how the text was
   prepared.
4. Uncheck **Remove stop words** and watch *are* and *your* join the dictionary.
5. Change **Stemming** to *None* and to *Porter stemmer* and compare the terms.

## How It Works

| Step | What happens | Example |
|------|--------------|---------|
| 1. Tokenize | Text is split into word tokens. Each token gets a position number starting at 0. | "Backup your database regularly" becomes Backup (0), your (1), database (2), regularly (3) |
| 2. Normalize | Tokens are lowercased, stop words are optionally dropped, and words are optionally stemmed. | "Database" becomes "database"; "procedures" becomes "procedure" |
| 3. Build index | The document-to-terms lists are inverted into term-to-documents lists. | database points to Doc 1, Doc 2, Doc 3 |

Positions are kept even when a stop word is removed. That is why *database* is
still at position 2 in Doc 2 after *your* is dropped. Keeping the original
positions is what makes phrase search and proximity search possible later.

The three stemming choices show a real trade-off:

- **None** keeps every word form, so *procedures* and *procedure* would be two
  different terms.
- **Plurals only** removes plural endings and keeps the terms readable.
- **Porter stemmer** is the classic algorithm used by many search engines. It
  is more aggressive, so the terms are no longer real words: *database* becomes
  *databas* and *critical* becomes *critic*. That is fine, because the same
  stemmer is applied to the user's query.

## Lesson Plan

### Learning Objective

Students will be able to explain how an inverted index maps terms to documents,
and describe what tokenization, normalization, and stop word removal each
contribute to the index.

### Grade Level

Undergraduate (college sophomore) and adult learners.

### Duration

10 to 15 minutes.

### Prerequisites

- Text processing basics from Chapter 1 (lowercasing, tokenization)
- The idea of a search index as a lookup table

### Activities

1. **Predict (2 min):** Before touching the MicroSim, ask students to write down
   which documents they expect in the postings list for *backup* and for
   *critical*. Then click each term to check.
2. **Step through (5 min):** Go back to Step 1 and walk forward. At Step 2, ask
   why *are* and *your* are crossed out. At Step 3, ask what "inverted" means.
3. **Experiment (5 min):** Turn off stop word removal. How many terms are in the
   dictionary now? Switch to the Porter stemmer. Which terms changed, and would
   a search for "databases" still find these documents?
4. **Discuss (3 min):** Which query would be answered faster with the index than
   by scanning each document: "which documents mention database?" Why?

### Assessment

- Given a fourth document, "System backup procedures", students add it to the
  dictionary and postings lists by hand, including positions.
- Students explain in one or two sentences why positions are stored in the
  postings list.

## References

- [Chapter 2: Search Technologies and Indexing Techniques](../../chapters/02-search-technologies-indexing/index.md)
- [Inverted index - Wikipedia](https://en.wikipedia.org/wiki/Inverted_index)
- Manning, C. D., Raghavan, P., and Schütze, H. (2008). [Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/). Cambridge University Press. Chapters 1 and 2 cover inverted indexes, tokenization, and stemming.
- Porter, M. F. (1980). An algorithm for suffix stripping. *Program*, 14(3), 130-137. See [the Porter stemming algorithm](https://tartarus.org/martin/PorterStemmer/).
