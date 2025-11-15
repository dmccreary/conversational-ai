# Chapter 2 Quiz: Search Technologies and Indexing

Test your understanding of search technologies and indexing concepts covered in this chapter.

---

## Question 1

<div class="upper-alpha" markdown>

What is the primary purpose of a search index?

1. To store raw documents in their original format
2. To enable fast retrieval of documents based on search terms
3. To delete duplicate content from a database
4. To compress files for storage efficiency

??? question "Show Answer"
    The correct answer is **B**.

    A [search index](../../glossary.md#search-index) is a data structure designed to enable fast retrieval of documents based on search terms. It maps terms to the documents containing them, allowing search engines to quickly find relevant results without scanning every document. Option A describes document storage rather than indexing, option C is about deduplication, and option D relates to compression rather than search functionality.

</div>

---

## Question 2

<div class="upper-alpha" markdown>

Which component is essential to an inverted index?

1. A list of documents ordered by creation date
2. A mapping from terms to documents containing those terms
3. A compression algorithm for text storage
4. A user authentication system

??? question "Show Answer"
    The correct answer is **B**.

    An [inverted index](../../glossary.md#inverted-index) maps terms to the documents that contain them. This is the fundamental structure that makes efficient text search possible. Instead of searching through each document, the search engine can look up a term in the inverted index and immediately find all documents containing that term. Options A, C, and D describe other system components but are not essential to an inverted index.

</div>

---

## Question 3

<div class="upper-alpha" markdown>

In Boolean search, what does the AND operator do?

1. Returns documents containing either of the search terms
2. Returns documents containing all of the search terms
3. Excludes documents containing the specified terms
4. Ranks documents by relevance score

??? question "Show Answer"
    The correct answer is **B**.

    In [Boolean search](../../glossary.md#boolean-search), the AND operator returns only documents that contain all of the specified search terms. This narrows the search results. The OR operator (option A) returns documents with either term, the NOT operator (option C) excludes terms, and option D describes relevance ranking rather than Boolean logic.

</div>

---

## Question 4

<div class="upper-alpha" markdown>

What does TF-IDF measure?

1. The total file size of indexed documents
2. The importance of a term in a document relative to a collection
3. The time required to process a search query
4. The number of unique words in a document

??? question "Show Answer"
    The correct answer is **B**.

    [TF-IDF](../../glossary.md#tf-idf) (Term Frequency-Inverse Document Frequency) measures the importance of a term in a document relative to a collection of documents. It increases with term frequency in the document but decreases with the term's frequency across all documents, helping identify terms that are particularly relevant to specific documents. Options A, C, and D describe different metrics unrelated to term importance.

</div>

---

## Question 5

<div class="upper-alpha" markdown>

Which search type can understand queries beyond exact keyword matches?

1. Keyword search
2. Boolean search
3. Full-text search
4. Semantic search (covered in the next chapter)

??? question "Show Answer"
    The correct answer is **D**.

    While [keyword search](../../glossary.md#keyword-search), [Boolean search](../../glossary.md#boolean-search), and [full-text search](../../glossary.md#full-text-search) rely on exact or partial string matching, semantic search (which we'll cover in Chapter 3) can understand the meaning behind queries and find relevant results even when exact keywords don't match. The traditional search approaches in this chapter are limited to matching the actual text.

</div>

---

## Question 6

<div class="upper-alpha" markdown>

What was the original purpose of the PageRank algorithm?

1. To rank web pages by their importance based on link structure
2. To count the number of pages on a website
3. To optimize page loading speed
4. To identify duplicate web pages

??? question "Show Answer"
    The correct answer is **A**.

    [PageRank](../../glossary.md#page-rank-algorithm) was developed by Google founders to rank web pages based on their importance, which is determined by analyzing the link structure of the web. Pages with more high-quality links pointing to them are considered more important. Options B, C, and D describe other web-related tasks but not the purpose of PageRank.

</div>

---

## Question 7

<div class="upper-alpha" markdown>

What is the main advantage of full-text search over simple keyword search?

1. It searches only document titles
2. It can search the entire content of documents and support features like wildcards and phrase matching
3. It requires less storage space
4. It only works with numeric data

??? question "Show Answer"
    The correct answer is **B**.

    [Full-text search](../../glossary.md#full-text-search) examines the entire content of documents and supports advanced features like wildcards, phrase matching, and proximity searches. This is more powerful than simple [keyword search](../../glossary.md#keyword-search), which may only match exact terms. Option A would be more limited than keyword search, option C is incorrect (full-text search typically requires more resources), and option D is false.

</div>

---

## Question 8

<div class="upper-alpha" markdown>

In TF-IDF, what does a high IDF (Inverse Document Frequency) value indicate?

1. The term appears in almost every document
2. The term is rare across the document collection
3. The term has many characters
4. The term appears frequently within a single document

??? question "Show Answer"
    The correct answer is **B**.

    A high IDF value in [TF-IDF](../../glossary.md#tf-idf) indicates that a term is rare across the document collection, making it more distinctive and potentially more important for identifying relevant documents. Common terms that appear in many documents have low IDF values. Option A would result in a low IDF, option C relates to term length (irrelevant to IDF), and option D describes term frequency (TF) rather than inverse document frequency.

</div>

---

## Question 9

<div class="upper-alpha" markdown>

Which search operator would you use to exclude results containing a specific term?

1. AND
2. OR
3. NOT
4. MAYBE

??? question "Show Answer"
    The correct answer is **C**.

    In [Boolean search](../../glossary.md#boolean-search), the NOT operator is used to exclude documents containing a specific term from the search results. For example, "cats NOT dogs" would return documents about cats but exclude any that also mention dogs. AND (option A) requires all terms, OR (option B) includes documents with any term, and MAYBE (option D) is not a standard Boolean operator.

</div>

---

## Question 10

<div class="upper-alpha" markdown>

What is the primary data structure used to enable fast keyword searches in large document collections?

1. Linear array
2. Hash table
3. Inverted index
4. Binary tree

??? question "Show Answer"
    The correct answer is **C**.

    The [inverted index](../../glossary.md#inverted-index) is the primary data structure that enables fast keyword searches in large document collections. It maps each unique term to a list of documents containing that term, allowing search engines to quickly find relevant documents without scanning the entire collection. While hash tables (option B) and binary trees (option D) may be used within the implementation, the inverted index is the key structure for search. A linear array (option A) would require inefficient sequential scanning.

</div>
