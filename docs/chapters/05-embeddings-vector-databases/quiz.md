# Chapter 5 Quiz: Embeddings and Vector Databases

Test your understanding of embeddings and vector databases covered in this chapter.

---

## Question 1

<div class="upper-alpha" markdown>

What is a word embedding?

1. A compressed file containing text
2. A dense vector representation of a word that captures its semantic meaning
3. A dictionary definition of a word
4. A list of synonyms for a word

??? question "Show Answer"
    The correct answer is **B**.

    A [word embedding](../../glossary.md#word-embedding) is a dense vector representation of a word that captures its semantic meaning in a continuous vector space. Words with similar meanings have similar vector representations. Option A describes file compression, option C describes a definition, and option D describes a thesaurus.

</div>

---

## Question 2

<div class="upper-alpha" markdown>

What is an embedding vector?

1. A one-dimensional list of words
2. A multi-dimensional numerical representation that captures semantic relationships
3. A binary encoding of text
4. A hash code for fast lookup

??? question "Show Answer"
    The correct answer is **B**.

    An [embedding vector](../../glossary.md#embedding-vector) is a multi-dimensional numerical representation (typically hundreds of dimensions) that captures semantic relationships. Points that are close together in this vector space represent similar concepts. Option A is too simple, option C doesn't capture semantics, and option D describes hashing rather than embeddings.

</div>

---

## Question 3

<div class="upper-alpha" markdown>

What is the primary purpose of a vector database?

1. To store relational data with SQL
2. To efficiently store and retrieve high-dimensional vectors with similarity search
3. To compress text files
4. To execute JavaScript code

??? question "Show Answer"
    The correct answer is **B**.

    A [vector database](../../glossary.md#vector-database) is specifically designed to efficiently store and retrieve high-dimensional vectors and perform similarity searches. Unlike traditional databases, they're optimized for finding the nearest neighbors to a query vector. Option A describes relational databases, option C describes compression utilities, and option D describes JavaScript engines.

</div>

---

## Question 4

<div class="upper-alpha" markdown>

Which of the following is an open-source library for similarity search developed by Facebook AI?

1. Pinecone
2. Weaviate
3. FAISS
4. MongoDB

??? question "Show Answer"
    The correct answer is **C**.

    [FAISS](../../glossary.md#faiss) (Facebook AI Similarity Search) is an open-source library developed by Meta/Facebook for efficient similarity search and clustering of dense vectors. [Pinecone](../../glossary.md#pinecone) (option A) and [Weaviate](../../glossary.md#weaviate) (option B) are vector databases but not specifically the Facebook library. MongoDB (option D) is a traditional document database.

</div>

---

## Question 5

<div class="upper-alpha" markdown>

What is a vector store?

1. A retail shop that sells vectors
2. A system for storing and managing embedding vectors
3. A type of CPU cache
4. A cloud storage service for files

??? question "Show Answer"
    The correct answer is **B**.

    A [vector store](../../glossary.md#vector-store) is a system for storing and managing embedding vectors, often used interchangeably with vector database. It provides the infrastructure for storing vectors and performing similarity searches. Option A is a play on words, option C describes hardware, and option D describes general file storage.

</div>

---

## Question 6

<div class="upper-alpha" markdown>

Which of the following is a cloud-based vector database service?

1. MySQL
2. PostgreSQL
3. Pinecone
4. SQLite

??? question "Show Answer"
    The correct answer is **C**.

    [Pinecone](../../glossary.md#pinecone) is a cloud-based vector database service designed specifically for storing and searching embeddings at scale. MySQL (option A), PostgreSQL (option B), and SQLite (option D) are traditional relational databases, though PostgreSQL can support vectors through extensions.

</div>

---

## Question 7

<div class="upper-alpha" markdown>

What is Weaviate?

1. A text editor
2. An open-source vector database with GraphQL and RESTful APIs
3. A data compression algorithm
4. A programming language

??? question "Show Answer"
    The correct answer is **B**.

    [Weaviate](../../glossary.md#weaviate) is an open-source vector database that provides GraphQL and RESTful APIs for storing and searching vectors. It supports various AI models and can be self-hosted or used as a cloud service. Option A describes software like VSCode, option C describes algorithms like gzip, and option D describes languages like Python.

</div>

---

## Question 8

<div class="upper-alpha" markdown>

Why are embeddings important for semantic search?

1. They make text shorter
2. They represent meaning in a way that allows mathematical comparison of similarity
3. They encrypt sensitive information
4. They reduce storage costs

??? question "Show Answer"
    The correct answer is **B**.

    [Embeddings](../../glossary.md#embedding-vector) represent semantic meaning in a mathematical form (vectors) that allows us to compute similarity between texts using operations like cosine similarity. This enables semantic search to find conceptually similar content, not just keyword matches. Option A is not the purpose, option C relates to encryption, and option D is not the primary goal.

</div>

---

## Question 9

<div class="upper-alpha" markdown>

What property of word embeddings allows us to perform analogies like "king - man + woman = queen"?

1. Random distribution of vectors
2. Semantic relationships encoded in vector arithmetic
3. Alphabetical ordering
4. Character length encoding

??? question "Show Answer"
    The correct answer is **B**.

    [Word embeddings](../../glossary.md#word-embedding) encode semantic relationships in vector space such that meaningful vector arithmetic is possible. The difference between "king" and "man" captures the concept of royalty, which when added to "woman" points to "queen". This demonstrates that semantic relationships are encoded geometrically. Options A, C, and D don't explain this property.

</div>

---

## Question 10

<div class="upper-alpha" markdown>

In a chatbot system using RAG, what role does a vector database play?

1. It stores user passwords
2. It stores document embeddings and retrieves relevant context based on query similarity
3. It generates responses directly
4. It handles user authentication

??? question "Show Answer"
    The correct answer is **B**.

    In RAG (Retrieval-Augmented Generation) systems, a [vector database](../../glossary.md#vector-database) stores [embeddings](../../glossary.md#embedding-vector) of documents or knowledge chunks. When a user asks a question, the system converts the query to an embedding, searches the vector database for similar embeddings, and retrieves the relevant context to augment the LLM's response. Options A and D relate to security, and option C is incorrect as the LLM generates responses, not the database.

</div>
