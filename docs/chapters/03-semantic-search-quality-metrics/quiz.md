# Chapter 3 Quiz: Semantic Search and Quality Metrics

Test your understanding of semantic search and quality metrics covered in this chapter.

---

## Question 1

<div class="upper-alpha" markdown>

What is the key difference between semantic search and keyword search?

1. Semantic search uses Boolean operators while keyword search does not
2. Semantic search understands meaning and context, not just exact word matches
3. Semantic search is faster than keyword search
4. Semantic search only works with numeric data

??? question "Show Answer"
    The correct answer is **B**.

    [Semantic search](index.md#semantic-search) understands the meaning and context of queries, allowing it to find relevant results even when exact keywords don't match. Traditional keyword search relies on exact or partial string matching. Option A incorrectly describes Boolean search, option C is not necessarily true (semantic search often requires more computation), and option D is false.

</div>

---

## Question 2

<div class="upper-alpha" markdown>

Which metric measures how similar two vectors are based on their direction?

1. Euclidean distance
2. Manhattan distance
3. Cosine similarity
4. Hamming distance

??? question "Show Answer"
    The correct answer is **C**.

    [Cosine similarity](index.md#cosine-similarity) measures the similarity between two vectors based on the cosine of the angle between them, focusing on their direction rather than magnitude. This makes it ideal for comparing document vectors and embeddings in semantic search. Euclidean distance (option A) and Manhattan distance (option B) measure geometric distance, while Hamming distance (option D) is used for comparing strings.

</div>

---

## Question 3

<div class="upper-alpha" markdown>

What does the precision metric measure in information retrieval?

1. The total number of documents in the database
2. The proportion of retrieved documents that are relevant
3. The proportion of relevant documents that were retrieved
4. The speed of the search algorithm

??? question "Show Answer"
    The correct answer is **B**.

    [Precision](index.md#precision) measures the proportion of retrieved documents that are actually relevant. It answers the question: "Of all the documents we returned, how many were relevant?" A high precision means few irrelevant results. Option C describes recall, option A describes collection size, and option D relates to performance rather than quality.

</div>

---

## Question 4

<div class="upper-alpha" markdown>

What does the recall metric measure in information retrieval?

1. The proportion of retrieved documents that are relevant
2. The proportion of relevant documents that were retrieved
3. The average position of relevant results
4. The time taken to execute a query

??? question "Show Answer"
    The correct answer is **B**.

    [Recall](index.md#recall) measures the proportion of all relevant documents that were actually retrieved. It answers the question: "Of all the relevant documents that exist, how many did we find?" A high recall means we didn't miss many relevant results. Option A describes precision, option C relates to ranking metrics, and option D relates to performance.

</div>

---

## Question 5

<div class="upper-alpha" markdown>

What is the F1 Score?

1. The average of precision and recall
2. The harmonic mean of precision and recall
3. The product of precision and recall
4. The maximum of precision and recall

??? question "Show Answer"
    The correct answer is **B**.

    The [F1 Score](index.md#f1-score) is the harmonic mean of precision and recall, providing a single metric that balances both concerns. The harmonic mean (not simple average) gives more weight to lower values, so a good F1 score requires both good precision and good recall. Option A (simple average) would be less stringent, while options C and D don't represent standard information retrieval metrics.

</div>

---

## Question 6

<div class="upper-alpha" markdown>

In vector similarity, what does a cosine similarity of 1.0 indicate?

1. The vectors are completely different
2. The vectors are perpendicular
3. The vectors point in exactly the same direction
4. The vectors have the same magnitude

??? question "Show Answer"
    The correct answer is **C**.

    A [cosine similarity](index.md#cosine-similarity) of 1.0 means the vectors point in exactly the same direction (angle of 0 degrees), indicating maximum similarity. A value of 0 would indicate perpendicular vectors (option B), and -1 would indicate opposite directions. Option D is incorrect because cosine similarity measures direction, not magnitude.

</div>

---

## Question 7

<div class="upper-alpha" markdown>

Why is semantic search particularly useful for chatbots?

1. It only works with structured data
2. It can understand user intent even when phrasing varies
3. It requires less computational power than keyword search
4. It eliminates the need for a database

??? question "Show Answer"
    The correct answer is **B**.

    [Semantic search](index.md#semantic-search) is valuable for chatbots because it can understand user intent even when users phrase questions differently. For example, "How do I reset my password?" and "I forgot my login credentials" express similar intents despite using different words. Option A is false (semantic search works with unstructured text), option C is incorrect (semantic search typically requires more computation), and option D is false.

</div>

---

## Question 8

<div class="upper-alpha" markdown>

If a search system has high precision but low recall, what does this mean?

1. Most returned results are relevant, but many relevant documents were missed
2. Most relevant documents were found, but many irrelevant ones were also returned
3. Both precision and recall are balanced
4. The system is performing optimally

??? question "Show Answer"
    The correct answer is **A**.

    High [precision](index.md#precision) but low [recall](index.md#recall) means that most returned results are relevant (few false positives), but many relevant documents were not retrieved (many false negatives). This is a conservative system that errs on the side of showing fewer results to maintain quality. Option B describes high recall but low precision, option C would indicate balanced metrics, and option D is incorrect since low recall is not optimal.

</div>

---

## Question 9

<div class="upper-alpha" markdown>

What mathematical concept underlies vector similarity in semantic search?

1. Boolean algebra
2. Linear algebra and vector geometry
3. Set theory only
4. Graph theory

??? question "Show Answer"
    The correct answer is **B**.

    [Vector similarity](index.md#vector-similarity) is based on linear algebra and vector geometry. Documents and queries are represented as vectors in high-dimensional space, and similarity is measured using geometric concepts like cosine similarity. While set theory (option C) and graph theory (option D) have applications in information retrieval, vector similarity specifically relies on linear algebra. Boolean algebra (option A) relates to traditional Boolean search.

</div>

---

## Question 10

<div class="upper-alpha" markdown>

When would you prioritize high recall over high precision?

1. When you want to minimize false positives
2. When you cannot afford to miss any relevant results
3. When storage space is limited
4. When users only want the top result

??? question "Show Answer"
    The correct answer is **B**.

    High [recall](index.md#recall) should be prioritized when you cannot afford to miss relevant results, even if it means accepting some irrelevant ones. For example, in medical diagnosis or legal discovery, missing important information could be critical. Option A describes prioritizing precision, option C relates to storage concerns, and option D suggests prioritizing precision for quality over recall for completeness.

</div>
