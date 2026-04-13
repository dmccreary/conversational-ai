# Chatbot Pipelines

Building a production-quality chatbot from a collection of documents
requires a series of well-defined processing stages. Each stage
transforms raw content into increasingly useful representations
that power conversational interactions.

This appendix examines the pipeline patterns used to build
document-grounded chatbots, starting with the simplest
approach and progressing to more sophisticated architectures.

## Stage 1: The CVC Pattern

The **CVC pattern** — **Content → Vector Store → Chatbot** — is the
foundational pipeline for building a document-grounded chatbot.
It is the simplest end-to-end architecture that connects
a corpus of documents to a conversational interface.

### Overview

```
┌─────────┐      ┌──────────────┐      ┌─────────┐
│ Content  │ ───▶ │ Vector Store │ ───▶ │ Chatbot │
└─────────┘      └──────────────┘      └─────────┘
```

The three components of the CVC pattern are:

1. **Content** — the source documents (PDFs, web pages, knowledge base articles, etc.)
2. **Vector Store** — an indexed collection of document fragments stored as embedding vectors
3. **Chatbot** — the conversational interface that retrieves relevant fragments and generates responses

### Step 1: Content Ingestion

The pipeline begins with a corpus of source documents. These
documents can come from many formats:

- PDF reports and manuals
- HTML web pages
- Markdown documentation
- Plain text files
- Structured data exports

The key requirement is that the content can be extracted as
clean text for downstream processing.

### Step 2: Chunking and Embedding

Raw documents are split into **fragments** (also called chunks)
that are small enough to be useful as context for a language model
but large enough to preserve meaning. Common chunking strategies include:

- **Fixed-size chunking** — split text every *N* tokens or characters
- **Sentence-based chunking** — split on sentence boundaries
- **Paragraph-based chunking** — use paragraph breaks as natural boundaries
- **Semantic chunking** — split where the topic shifts, detected by embedding similarity

Each fragment is then converted to a numerical **embedding vector**
using an embedding model. The vector captures the semantic meaning
of the fragment so that similar content maps to nearby points
in vector space.

### Step 3: Vector Store Indexing

The embedding vectors and their associated text fragments are
loaded into a **vector store** — a database optimized for
similarity search over high-dimensional vectors. Popular
vector stores include:

- Chroma
- FAISS
- Pinecone
- Weaviate
- Milvus
- pgvector (PostgreSQL extension)

The vector store builds an index (often using approximate
nearest neighbor algorithms) so that queries can retrieve
the most relevant fragments in milliseconds.

### Step 4: Query and Retrieval

When a user asks a question, the chatbot:

1. Converts the user's question into an embedding vector using the same embedding model
2. Searches the vector store for the *k* most similar fragments
3. Returns those fragments as **context** for response generation

This retrieval step is the core of the
[Retrieval-Augmented Generation (RAG)](../chapters/09-rag-pattern/index.md) pattern.

### Step 5: Response Generation

The retrieved fragments are combined with the user's question
into a prompt sent to a large language model. A typical prompt
structure is:

```
Use the following context to answer the question.
If the answer is not in the context, say you don't know.

Context:
{retrieved fragments}

Question: {user question}

Answer:
```

The language model generates a grounded response that draws
on the retrieved content rather than relying solely on its
training data.

### Strengths of the CVC Pattern

- **Simple to implement** — minimal infrastructure, few moving parts
- **Fast to prototype** — a working chatbot can be built in hours
- **Grounded responses** — answers are tied to actual source documents
- **Scalable content** — adding new documents only requires re-indexing

### Limitations of the CVC Pattern

- **No relationship awareness** — fragments are treated as independent; connections between concepts are lost
- **Chunk boundary problems** — important information that spans two chunks may be split apart
- **No structured reasoning** — the pipeline cannot follow multi-hop logical chains across documents
- **Retrieval quality ceiling** — if the embedding model does not capture the right semantics, relevant content may not be retrieved

These limitations motivate the more advanced pipeline stages
covered in the sections that follow.
