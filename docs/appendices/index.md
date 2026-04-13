# Appendices

Supplementary materials for the Conversational AI course.

## Chatbot Pipeline Patterns

These appendices examine three progressively sophisticated
patterns for building document-grounded chatbots:

1. **[The CVC Pattern](01-cvc-chatbot-pattern.md)** — Content → Vector Store → Chatbot. The simplest pipeline: chunk documents, embed them in a vector store, and retrieve by similarity.
2. **[The CCGC Pattern](02-ccgc-chatbot-pattern.md)** — Content → Concepts → Graph → Chatbot. An NLP pipeline extracts concepts and relationships into a knowledge graph that the chatbot traverses to answer questions.
3. **[The CCGCC Pattern](03-ccgcc-chatbot-pattern.md)** — Content → Concepts → Graph → Compression → Chatbot. A graph compression stage converts subgraphs into token-efficient markdown, treating the context window as a precious resource. A neuro-symbolic design combining deterministic graph traversal with LLM generation.
