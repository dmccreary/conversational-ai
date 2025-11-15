# Chapter 9 Quiz: RAG Pattern

Test your understanding of the Retrieval-Augmented Generation pattern covered in this chapter.

---

## Question 1

<div class="upper-alpha" markdown>

What does RAG stand for?

1. Rapid Application Generation
2. Retrieval-Augmented Generation
3. Random Access Gateway
4. Relational Access Graph

??? question "Show Answer"
    The correct answer is **B**.

    RAG stands for [Retrieval-Augmented Generation](../../glossary.md#rag-pattern), a pattern that combines information retrieval with language generation to provide LLMs with relevant context from external knowledge sources. Options A, C, and D are not standard terms in conversational AI.

</div>

---

## Question 2

<div class="upper-alpha" markdown>

What are the three main steps in the RAG pattern?

1. Read, Analyze, Generate
2. Retrieval, Augmentation, Generation
3. Request, Authenticate, Generate
4. Retrieve, Append, Generalize

??? question "Show Answer"
    The correct answer is **B**.

    The [RAG pattern](../../glossary.md#rag-pattern) consists of three steps: [Retrieval](../../glossary.md#retrieval-step) (finding relevant information), [Augmentation](../../glossary.md#augmentation-step) (adding that information to the prompt), and [Generation](../../glossary.md#generation-step) (producing the response). Options A, C, and D do not accurately describe the RAG workflow.

</div>

---

## Question 3

<div class="upper-alpha" markdown>

What happens during the retrieval step of RAG?

1. The LLM generates a response
2. Relevant information is retrieved from a knowledge base or vector database
3. User authentication is performed
4. The response is cached for future use

??? question "Show Answer"
    The correct answer is **B**.

    During the [retrieval step](../../glossary.md#retrieval-step), the system searches for relevant information in a knowledge base, vector database, or other data source based on the user's query. This retrieved information will be used to augment the LLM's prompt. Option A describes the generation step, option C describes authentication, and option D describes caching.

</div>

---

## Question 4

<div class="upper-alpha" markdown>

What is the purpose of the augmentation step in RAG?

1. To increase the font size of the response
2. To add retrieved context to the prompt before sending it to the LLM
3. To encrypt the user's query
4. To compress the response

??? question "Show Answer"
    The correct answer is **B**.

    The [augmentation step](../../glossary.md#augmentation-step) involves adding the retrieved context to the prompt before sending it to the LLM. This provides the model with relevant information it needs to answer the question accurately. Option A is about formatting, option C is about security, and option D is about compression.

</div>

---

## Question 5

<div class="upper-alpha" markdown>

What is a context window in LLMs?

1. A graphical user interface element
2. The maximum amount of text (input + output) an LLM can process at once
3. A browser window for displaying chat
4. A time period for user sessions

??? question "Show Answer"
    The correct answer is **B**.

    The [context window](../../glossary.md#context-window) is the maximum amount of text (measured in tokens) that an LLM can process at one time, including both input and output. This limitation affects how much context can be included in RAG systems. Option A describes UI, option C describes browsers, and option D describes sessions.

</div>

---

## Question 6

<div class="upper-alpha" markdown>

What is a hallucination in the context of LLMs?

1. A visual effect in the user interface
2. When an LLM generates plausible-sounding but incorrect or fabricated information
3. A data visualization feature
4. An authentication error

??? question "Show Answer"
    The correct answer is **B**.

    A [hallucination](../../glossary.md#hallucination) occurs when an LLM generates information that sounds plausible but is actually incorrect or completely fabricated. RAG helps reduce hallucinations by grounding responses in retrieved factual information. Option A describes UI effects, option C describes charts/graphs, and option D describes security issues.

</div>

---

## Question 7

<div class="upper-alpha" markdown>

How does RAG help reduce hallucinations?

1. By limiting the chatbot to one response per user
2. By providing the LLM with accurate, retrieved context to base its response on
3. By disabling the LLM's generation capabilities
4. By encrypting all communications

??? question "Show Answer"
    The correct answer is **B**.

    [RAG](../../glossary.md#rag-pattern) reduces [hallucinations](../../glossary.md#hallucination) by providing the LLM with accurate, retrieved context from a knowledge base. When the model has access to factual information, it's more likely to generate accurate responses rather than fabricating information. Option A would severely limit utility, option C would prevent the chatbot from working, and option D is about security.

</div>

---

## Question 8

<div class="upper-alpha" markdown>

In which step does the LLM actually generate the response?

1. Retrieval step
2. Augmentation step
3. Generation step
4. Preprocessing step

??? question "Show Answer"
    The correct answer is **C**.

    The LLM generates its response in the [generation step](../../glossary.md#generation-step), after relevant context has been retrieved and augmented into the prompt. The [retrieval step](../../glossary.md#retrieval-step) finds information, the [augmentation step](../../glossary.md#augmentation-step) adds it to the prompt, and the generation step produces the final response.

</div>

---

## Question 9

<div class="upper-alpha" markdown>

What type of database is commonly used in the retrieval step of RAG?

1. Relational database only
2. Vector database for semantic similarity search
3. Blockchain
4. Spreadsheet

??? question "Show Answer"
    The correct answer is **B**.

    The [retrieval step](../../glossary.md#retrieval-step) commonly uses vector databases for semantic similarity search. These databases store embeddings and can quickly find the most relevant documents based on the semantic similarity to the user's query. While relational databases (option A) can be used, vector databases are more effective for semantic search. Options C and D are not typical for RAG.

</div>

---

## Question 10

<div class="upper-alpha" markdown>

What is a key advantage of RAG over using an LLM alone?

1. RAG is always faster
2. RAG allows the LLM to access current, domain-specific information beyond its training data
3. RAG eliminates the need for an LLM
4. RAG works without internet connection

??? question "Show Answer"
    The correct answer is **B**.

    A key advantage of [RAG](../../glossary.md#rag-pattern) is that it allows the LLM to access current, domain-specific information from external knowledge sources, overcoming the limitations of the model's training data cutoff. Option A is often false (RAG adds processing steps), option C contradicts the definition of RAG, and option D depends on deployment (both RAG and standalone LLMs can work offline if deployed locally).

</div>
