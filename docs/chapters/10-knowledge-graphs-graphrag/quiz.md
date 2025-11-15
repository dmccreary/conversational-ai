# Chapter 10 Quiz: Knowledge Graphs and GraphRAG

Test your understanding of knowledge graphs and GraphRAG concepts covered in this chapter.

---

## Question 1

<div class="upper-alpha" markdown>

What is a knowledge graph?

1. A bar chart showing knowledge levels
2. A structured representation of information as entities and relationships
3. A social media network
4. A type of neural network

??? question "Show Answer"
    The correct answer is **B**.

    A [knowledge graph](../../glossary.md#knowledge-graph) is a structured representation of information where entities (nodes) are connected by relationships (edges). This graph structure captures semantic relationships and enables complex queries about how concepts are related. Option A describes a chart, option C describes social networks, and option D describes machine learning architectures.

</div>

---

## Question 2

<div class="upper-alpha" markdown>

What type of database is specifically designed to store and query graph structures?

1. Relational database
2. Document database
3. Graph database
4. Time-series database

??? question "Show Answer"
    The correct answer is **C**.

    [Graph databases](../../glossary.md#graph-database) are specifically designed to store and efficiently query graph structures with nodes and relationships. They excel at traversing relationships and finding patterns. Relational databases (option A) use tables, document databases (option B) store JSON-like documents, and time-series databases (option D) optimize for temporal data.

</div>

---

## Question 3

<div class="upper-alpha" markdown>

What is Neo4j?

1. A programming language
2. A popular graph database platform
3. A web browser
4. A cloud storage service

??? question "Show Answer"
    The correct answer is **B**.

    [Neo4j](../../glossary.md#neo4j) is one of the most popular graph database platforms, providing tools for storing, querying, and visualizing graph data. It uses the Cypher query language and is widely used for knowledge graphs. Option A describes languages like Python, option C describes browsers like Chrome, and option D describes services like S3.

</div>

---

## Question 4

<div class="upper-alpha" markdown>

What is Cypher?

1. An encryption algorithm
2. A query language for graph databases, particularly Neo4j
3. A type of neural network
4. A data compression format

??? question "Show Answer"
    The correct answer is **B**.

    [Cypher](../../glossary.md#cypher-query-language) is a declarative query language designed for querying graph databases, particularly [Neo4j](../../glossary.md#neo4j). It uses ASCII-art-like syntax to represent patterns in graphs, making it intuitive for expressing graph queries. Option A would be something like AES, option C would be like CNNs, and option D would be like ZIP.

</div>

---

## Question 5

<div class="upper-alpha" markdown>

What is the GraphRAG pattern?

1. A simple keyword search algorithm
2. RAG enhanced with knowledge graph traversal for richer context retrieval
3. A data visualization technique
4. A type of encryption

??? question "Show Answer"
    The correct answer is **B**.

    The [GraphRAG pattern](../../glossary.md#graphrag-pattern) enhances traditional RAG by using knowledge graph traversal to retrieve richer, more connected context. Instead of just finding similar documents, it can explore relationships and connected entities in the knowledge graph. Option A describes basic search, option C describes visualization, and option D describes security.

</div>

---

## Question 6

<div class="upper-alpha" markdown>

What is entity linking?

1. Creating hyperlinks in HTML
2. The process of connecting text mentions to specific entities in a knowledge graph
3. Joining database tables
4. Connecting network cables

??? question "Show Answer"
    The correct answer is **B**.

    [Entity linking](../../glossary.md#entity-linking) is the process of identifying entity mentions in text and connecting them to specific entities in a knowledge graph. For example, linking the mention "Apple" in a sentence to either the company or the fruit entity based on context. Option A describes HTML, option C describes SQL joins, and option D describes networking.

</div>

---

## Question 7

<div class="upper-alpha" markdown>

What advantage does GraphRAG have over standard RAG?

1. It's always faster
2. It can retrieve not just similar documents but also related entities and relationships
3. It requires no database
4. It works only with images

??? question "Show Answer"
    The correct answer is **B**.

    [GraphRAG](../../glossary.md#graphrag-pattern) can retrieve not just semantically similar documents but also related entities and their relationships from the knowledge graph. This provides richer context and can answer questions requiring understanding of connections between concepts. Option A is often false, option C is incorrect (it requires a graph database), and option D is false.

</div>

---

## Question 8

<div class="upper-alpha" markdown>

In a knowledge graph, what do nodes typically represent?

1. Database queries
2. Entities or concepts
3. User sessions
4. Error messages

??? question "Show Answer"
    The correct answer is **B**.

    In a [knowledge graph](../../glossary.md#knowledge-graph), nodes typically represent entities or concepts (like people, places, organizations, or ideas), while edges represent the relationships between them. Option A describes SQL queries, option C describes analytics data, and option D describes errors.

</div>

---

## Question 9

<div class="upper-alpha" markdown>

What does a Cypher query pattern like `(a)-[:KNOWS]->(b)` represent?

1. A mathematical formula
2. A relationship where entity 'a' knows entity 'b'
3. A file path
4. An encryption key

??? question "Show Answer"
    The correct answer is **B**.

    In [Cypher](../../glossary.md#cypher-query-language), the pattern `(a)-[:KNOWS]->(b)` represents a directed relationship where entity 'a' knows entity 'b'. The parentheses represent nodes, the square brackets contain the relationship type, and the arrow shows direction. Option A describes math notation, option C describes filesystem paths, and option D describes cryptography.

</div>

---

## Question 10

<div class="upper-alpha" markdown>

Why are knowledge graphs useful for chatbots?

1. They make the chatbot faster
2. They enable understanding of complex relationships and multi-hop reasoning
3. They reduce storage costs
4. They eliminate the need for natural language processing

??? question "Show Answer"
    The correct answer is **B**.

    [Knowledge graphs](../../glossary.md#knowledge-graph) enable chatbots to understand complex relationships between entities and perform multi-hop reasoning (e.g., "Who are the colleagues of people who worked with X?"). This structured knowledge representation enhances the chatbot's ability to answer complex questions. Option A is not the primary benefit, option C is incorrect, and option D is false (NLP is still needed).

</div>
