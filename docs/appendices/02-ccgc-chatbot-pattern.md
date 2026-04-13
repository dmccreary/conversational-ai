# The CCGC Pattern: Content → Concepts → Graph → Chatbot

The **CCGC pattern** extends the basic CVC pipeline by
introducing an explicit concept extraction and graph construction
stage. Instead of storing raw text fragments in a vector store,
the pipeline first extracts structured concepts from the content
and organizes them into a connected knowledge graph.
The chatbot then traverses that graph to answer questions.

This is the core pattern behind **GraphRAG** — Retrieval-Augmented
Generation grounded in a knowledge graph rather than a flat
vector index.

## Overview

```
┌─────────┐     ┌──────────┐     ┌───────┐     ┌─────────┐
│ Content  │ ──▶ │ Concepts │ ──▶ │ Graph │ ──▶ │ Chatbot │
└─────────┘     └──────────┘     └───────┘     └─────────┘
```

The four components of the CCGC pattern are:

1. **Content** — the source documents
2. **Concepts** — entities, relationships, and facts extracted by an NLP pipeline
3. **Graph** — a knowledge graph connecting concepts through typed relationships
4. **Chatbot** — the conversational interface that traverses the graph and generates responses

## Step 1: Content Ingestion

As with the CVC pattern, the pipeline begins with a corpus of
source documents. The same formats apply — PDFs, web pages,
markdown, structured exports, and so on.

## Step 2: Concept Extraction

This is the stage that distinguishes CCGC from CVC. An NLP
pipeline processes the content to extract structured information:

- **Named Entity Recognition (NER)** — identifies people,
  organizations, technologies, dates, and other entities
- **Relation Extraction** — detects relationships between
  entities (e.g., "BERT *was developed by* Google")
- **Coreference Resolution** — links pronouns and references
  back to their entities so that "it" becomes "transformer architecture"
- **Topic and Concept Detection** — identifies abstract concepts
  beyond named entities (e.g., "attention mechanism",
  "transfer learning")

The output is a set of **(subject, predicate, object)** triples:

```
(BERT, developed_by, Google)
(BERT, is_a, language_model)
(attention_mechanism, enables, transformer_architecture)
(RAG, combines, retrieval, generation)
```

Modern LLM-based extraction pipelines can perform all of these
steps in a single pass by prompting the model to output
structured triples from a passage of text.

## Step 3: Graph Construction

The extracted triples are loaded into a **knowledge graph** — a
database that stores entities as nodes and relationships as edges.
Common graph storage options include:

- **Neo4j** — property graph database with the Cypher query language
- **Amazon Neptune** — managed graph database service
- **Apache TinkerPop / Gremlin** — graph traversal framework
- **RDF triple stores** (Stardog, GraphDB) — for standards-based ontologies
- **NetworkX** — in-memory Python graph library for smaller datasets

Graph construction also involves:

- **Entity resolution** — merging duplicate nodes that refer to the
  same real-world entity (e.g., "GPT-4" and "OpenAI GPT-4")
- **Edge weighting** — scoring relationships by confidence or frequency
- **Community detection** — identifying clusters of densely connected
  concepts that form natural topic groups

## Step 4: Graph Traversal and Context Selection

When a user asks a question, the chatbot must decide
**what parts of the graph to put into the context window**
of the language model. This is the central design challenge
of the CCGC pattern.

### The Context Window Problem

A knowledge graph may contain millions of nodes and edges,
but the LLM's context window is finite. The chatbot must
select a relevant subgraph that fits within the token budget
while providing enough information to generate an accurate answer.

### Traversal Strategies

Several strategies exist for selecting the right subgraph:

**Seed Node Identification**

The user's question is analyzed to identify starting nodes
in the graph. This can be done by:

- Matching named entities in the question to graph nodes
- Embedding the question and finding the nearest node embeddings
- Using keyword search over node labels and properties

**Local Neighborhood Expansion**

From the seed nodes, the traversal expands outward:

- **1-hop neighbors** — directly connected concepts
- **2-hop neighbors** — concepts two edges away (often sufficient for most questions)
- **Weighted expansion** — prioritize edges with higher confidence scores
- **Path-limited expansion** — follow the *k* shortest paths between seed nodes

**Community-Based Retrieval**

If the graph has been partitioned into communities (topic clusters),
the chatbot can retrieve the entire community that contains
the seed nodes. This provides thematic coherence — all the
closely related concepts come together.

**Path-Based Retrieval**

For multi-hop questions ("How does tokenization affect
RAG pipeline performance?"), the chatbot finds paths
between the entities mentioned in the question and
includes all nodes and edges along those paths.

### Formatting the Subgraph as Context

Once the relevant subgraph is selected, it must be serialized
into text for the LLM prompt. Common formats include:

- **Triple lists** — `(subject, predicate, object)` one per line
- **Natural language summaries** — "BERT is a language model developed by Google that uses the transformer architecture..."
- **Structured markdown** — headings for entities, bullet points for relationships
- **Hybrid** — a mix of triples for precision and summaries for readability

A typical prompt structure:

```
Use the following knowledge graph context to answer the question.

Knowledge Graph:
- BERT is a language model
- BERT was developed by Google
- BERT uses the transformer architecture
- The transformer architecture relies on the attention mechanism
- ...

Question: {user question}

Answer:
```

## Step 5: Response Generation

The LLM generates a response grounded in the graph context.
Because the context contains structured relationships rather
than raw text chunks, the model can:

- Follow chains of reasoning across connected concepts
- Explain *why* two concepts are related
- Distinguish between direct and indirect relationships
- Provide more precise and less hallucinated answers

## Comparing CVC and CCGC

| Aspect | CVC Pattern | CCGC Pattern |
|--------|------------|--------------|
| **Storage** | Text fragments as vectors | Concepts and relationships as a graph |
| **Retrieval** | Similarity search | Graph traversal |
| **Relationships** | Implicit (in text) | Explicit (as edges) |
| **Multi-hop reasoning** | Weak — limited to single chunks | Strong — follows paths across nodes |
| **Setup complexity** | Low | Higher — requires NLP extraction pipeline |
| **Best for** | Simple Q&A over documents | Complex questions requiring connected reasoning |

## Strengths of the CCGC Pattern

- **Relationship-aware** — the graph preserves how concepts connect to each other
- **Multi-hop reasoning** — the chatbot can follow chains of relationships to answer complex questions
- **Explainable retrieval** — the traversal path shows *why* certain context was selected
- **Deduplication** — entity resolution consolidates redundant information across documents
- **Community structure** — topic clusters provide natural groupings for broad questions

## Limitations of the CCGC Pattern

- **Extraction quality** — the pipeline is only as good as the NLP extraction stage; missed entities or incorrect relationships degrade answers
- **Graph construction cost** — building and maintaining the knowledge graph requires more infrastructure than a vector store
- **Context selection is hard** — choosing the right subgraph is an open research problem; too little context misses relevant information, too much dilutes the signal
- **Schema design** — decisions about what entity types and relationship types to extract shape what questions the chatbot can answer
- **Hybrid approaches often win** — in practice, combining vector retrieval (CVC) with graph traversal (CCGC) outperforms either alone
