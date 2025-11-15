# Glossary of Terms

#### 80/20 Rule

A principle stating that approximately 80% of effects come from 20% of causes, commonly used in chatbot analytics to identify the most frequently asked questions that drive the majority of user interactions.

**Example:** In a customer service chatbot, 80% of user queries might relate to just 20% of the available topics, such as password resets and order status.

#### A/B Testing

An experimental methodology that compares two versions of a chatbot or feature by randomly assigning users to different variants and measuring which performs better based on predefined metrics.

**Example:** Testing two different response styles in a chatbot to determine which generates higher user satisfaction scores.

#### Acceptance Rate

The percentage of chatbot responses that users find satisfactory or accept as helpful, typically measured through explicit feedback mechanisms or implicit behavioral signals.

**Example:** If 850 out of 1,000 chatbot responses receive positive feedback, the acceptance rate is 85%.

#### Access Policy

A set of rules that defines which users or roles can access specific resources, data, or functionality within a system.

**Example:** An access policy might specify that only managers can query salary information through a corporate chatbot.

#### AI Doubling Rate

The rate at which AI capabilities or computational power dedicated to AI research doubles over time, often observed to occur more rapidly than Moore's Law.

**Example:** AI training compute has doubled approximately every 3.4 months in recent years, far exceeding the doubling rate predicted by Moore's Law.

#### AI Flywheel

A self-reinforcing cycle where user feedback improves AI systems, which in turn attract more users, generating more feedback and creating continuous improvement momentum.

**Example:** A chatbot that learns from user corrections becomes more accurate, leading to higher satisfaction and more users providing feedback.

#### AI Timeline

A chronological sequence of significant events, breakthroughs, and milestones in the development of artificial intelligence from its inception to the present.

**Example:** Key events include the Dartmouth Conference (1956), Deep Blue defeating Kasparov (1997), and GPT-3's release (2020).

#### Approximate Nearest Neighbor

An algorithm that efficiently finds vectors close to a query vector in high-dimensional space by trading perfect accuracy for significant speed improvements.

**Example:** FAISS uses approximate nearest neighbor to search millions of embeddings in milliseconds rather than hours.

#### Artificial Intelligence

The field of computer science focused on creating systems that can perform tasks typically requiring human intelligence, such as reasoning, learning, perception, and language understanding.

**Example:** A chatbot that understands customer questions and provides relevant answers demonstrates artificial intelligence capabilities.

#### Attention Mechanism

A neural network component that allows models to focus on relevant parts of input data when generating outputs, forming the core of transformer architectures.

**Example:** When translating "The cat sat on the mat," attention helps the model focus on "cat" when generating the translated subject.

#### Augmentation Step

The phase in RAG where retrieved documents or information are added to the user's original query to create an enriched prompt for the language model.

**Example:** Appending relevant FAQ entries to a user's question before sending it to the LLM for answer generation.

#### Authentication

The process of verifying the identity of a user, system, or entity attempting to access a resource or service.

**Example:** Requiring users to enter a username and password before accessing a chatbot with sensitive company information.

#### Authorization

The process of determining whether an authenticated user has permission to access a specific resource or perform a particular action.

**Example:** After logging in, checking whether a user is allowed to query financial data through the chatbot.

#### Boolean Search

A search technique that uses logical operators (AND, OR, NOT) to combine or exclude keywords when querying a database or search engine.

**Example:** Searching for "chatbot AND healthcare NOT telemedicine" to find healthcare chatbot articles excluding telemedicine topics.

#### Botpress

An open-source conversational AI platform that provides tools for building, deploying, and managing chatbots with visual flow design and natural language understanding.

**Example:** A developer uses Botpress to create a customer service bot with visual dialog flows and integrated NLU.

#### Byte Pair Encoding

A tokenization method that iteratively merges frequently occurring character pairs to create subword units, balancing vocabulary size with the ability to represent rare words.

**Example:** The word "understanding" might be tokenized as ["under", "stand", "ing"] using byte pair encoding.

#### Capstone Project

A culminating academic project that integrates and demonstrates knowledge and skills acquired throughout a course or program, typically producing a substantial deliverable.

**Example:** Building a complete GraphRAG-based chatbot system that answers domain-specific questions using a curated knowledge graph.

#### Chat History

A chronological record of messages exchanged between a user and a chatbot within a conversation session, used to maintain context and enable reference to previous interactions.

**Example:** Storing the last 10 messages so the chatbot can reference what the user asked earlier in the conversation.

#### Chat Interface

The user-facing component that displays conversations and accepts input, typically featuring message bubbles, input fields, and interactive elements.

**Example:** A web-based chat window with scrollable message history and a text input box at the bottom.

#### Chat Log

A persistent record of chatbot conversations, including user queries, bot responses, timestamps, and metadata, used for analysis, debugging, and compliance.

**Example:** Recording every interaction with timestamps and user IDs to analyze common questions and identify failures.

#### Chat Widget

An embeddable user interface component that provides chatbot functionality within a webpage or application, typically appearing as a small icon that expands into a chat window.

**Example:** A floating chat bubble in the bottom-right corner of a website that opens a chatbot when clicked.

#### Chatbot

A software application that simulates human conversation through text or voice interactions, designed to answer questions, provide assistance, or perform tasks.

**Example:** A customer service chatbot that helps users track orders and answer product questions on an e-commerce website.

#### Chatbot Career

Professional opportunities and career paths related to designing, developing, deploying, and maintaining conversational AI systems.

**Example:** Roles include Conversational AI Engineer, Chatbot Developer, and NLP Specialist.

#### Chatbot Dashboard

A visual interface that displays key performance indicators, metrics, and analytics about chatbot usage, performance, and user interactions.

**Example:** A dashboard showing daily active users, acceptance rate, average response time, and most frequently asked questions.

#### Chatbot Evaluation

The systematic assessment of a chatbot's performance using quantitative metrics and qualitative analysis to measure effectiveness, accuracy, and user satisfaction.

**Example:** Evaluating a chatbot by measuring F1 score for intent classification and conducting user satisfaction surveys.

#### Chatbot Framework

A software toolkit or platform that provides pre-built components, tools, and infrastructure for developing conversational AI applications more efficiently.

**Example:** Using LangChain to build a RAG chatbot without implementing vector search and prompt management from scratch.

#### Chatbot Metrics

Quantifiable measurements used to assess chatbot performance, user engagement, and system health, such as response time, accuracy, and user satisfaction.

**Example:** Tracking metrics like acceptance rate (85%), average response time (1.2s), and daily active users (5,000).

#### Chatbot Response

The output generated by a chatbot in reply to a user's query or message, which may include text, links, buttons, or other interactive elements.

**Example:** When asked "What's your return policy?", the chatbot responds with "We accept returns within 30 days of purchase."

#### Confusion Matrix

A table that visualizes the performance of a classification model by showing true positives, false positives, true negatives, and false negatives.

**Example:** Evaluating an intent classifier by counting correctly identified intents (true positives) versus misclassifications (false positives/negatives).

#### Context Length Limit

The maximum number of tokens that a language model can process in a single input, constraining how much conversation history and retrieved information can be included.

**Example:** GPT-3.5 has a context length limit of 4,096 tokens, limiting how much document content can be passed in a RAG system.

#### Context Window

The amount of text or number of tokens that a language model can process at once, including both input and output, determining how much context the model can consider.

**Example:** A model with an 8,000-token context window can process about 6,000 words of conversation history and documents.

#### Contextual Embedding

A vector representation of text where the same word produces different embeddings based on surrounding context, enabling more accurate semantic understanding.

**Example:** The word "bank" has different contextual embeddings in "river bank" versus "savings bank."

#### Continuous Improvement

An ongoing process of making incremental enhancements to a system based on feedback, data analysis, and evolving requirements.

**Example:** Regularly updating a chatbot's knowledge base and fine-tuning responses based on user feedback and query patterns.

#### Controlled Vocabulary

A standardized list of terms used consistently for indexing, tagging, and searching information, reducing ambiguity and improving search effectiveness.

**Example:** Using a controlled vocabulary where "automobile," "car," and "vehicle" all map to the standardized term "vehicle."

#### Conversation Context

The accumulated information from previous messages in a dialog session that helps the chatbot understand user intent and maintain coherent interactions.

**Example:** Remembering that a user asked about "laptops" so when they ask "What about gaming?" the bot knows to discuss gaming laptops.

#### Conversational Agent

An AI system designed to engage in dialog with users, understanding natural language input and generating appropriate responses to accomplish tasks or provide information.

**Example:** A virtual assistant that can book appointments, answer questions, and help navigate complex processes through natural conversation.

#### Coreference Resolution

The natural language processing task of identifying when different expressions in text refer to the same entity, enabling systems to track references across sentences.

**Example:** In "John went to the store. He bought milk," resolving that "He" refers to "John."

#### Corporate Nervous System

An organizational infrastructure of interconnected knowledge graphs, data systems, and AI agents that enables rapid information flow and decision-making throughout an enterprise.

**Example:** A unified system connecting customer data, product information, and employee knowledge to power intelligent chatbots and decision support tools.

#### Cosine Similarity

A metric measuring the similarity between two vectors by calculating the cosine of the angle between them, commonly used for comparing embeddings.

**Example:** Comparing a user query embedding with document embeddings to find the most semantically similar content, where 1.0 indicates identical direction.

#### Cypher Query Language

A declarative graph query language designed for querying and manipulating property graphs in Neo4j and compatible graph databases.

**Example:** `MATCH (u:User)-[:ASKED]->(q:Question) RETURN u.name, q.text` retrieves users and their questions.

#### Data Privacy

The protection of personal information from unauthorized access, use, or disclosure, ensuring individuals retain control over their data.

**Example:** Encrypting chat logs containing user queries and removing personally identifiable information before analysis.

#### Data Retention

Policies and practices governing how long data is stored before deletion, balancing operational needs, legal requirements, and privacy concerns.

**Example:** Retaining chat logs for 90 days for analysis, then automatically deleting them to protect user privacy.

#### Database Query

A request for data from a database, typically written in a structured query language like SQL, that specifies what information to retrieve or manipulate.

**Example:** `SELECT * FROM orders WHERE user_id = 123` retrieves all orders for a specific user.

#### Dependency Parsing

A natural language processing technique that analyzes the grammatical structure of sentences by identifying relationships between words.

**Example:** In "The quick brown fox jumps," identifying that "quick" and "brown" both modify "fox."

#### Dialog System

A computer system designed to conduct conversations with users, managing dialog flow, maintaining context, and generating appropriate responses across multiple turns.

**Example:** A travel booking system that asks clarifying questions about dates, destinations, and preferences through multi-turn conversation.

#### Dialogflow

A Google-owned conversational AI platform that provides natural language understanding, intent recognition, and chatbot development tools with integration to Google services.

**Example:** Using Dialogflow to build a voice-activated assistant for Google Home devices.

#### Document Corpus

A collection of documents used as a knowledge source for training models, building search indexes, or providing context for retrieval systems.

**Example:** A corpus of 10,000 company policy documents used to train a corporate chatbot.

#### Document Frequency

The number of documents in a corpus that contain a specific term, used in TF-IDF calculations to weight term importance.

**Example:** If the word "chatbot" appears in 50 out of 1,000 documents, its document frequency is 50.

#### Dublin Core

A standardized metadata schema with 15 core elements for describing digital resources, widely used for cataloging and discovering information.

**Example:** Tagging documents with Dublin Core elements like Title, Creator, Subject, and Date for better searchability.

#### Edge

A connection between two nodes in a graph that represents a relationship, often labeled with a type and containing properties.

**Example:** In a knowledge graph, an edge labeled "AUTHORED" connects a Person node to a Book node.

#### Embedding Model

A neural network trained to convert text into dense vector representations that capture semantic meaning, enabling similarity comparisons and search.

**Example:** Sentence-BERT is an embedding model that converts sentences into 768-dimensional vectors for semantic search.

#### Embedding Vector

A numerical representation of text as a dense, fixed-length array of numbers that encodes semantic meaning in a high-dimensional vector space.

**Example:** The sentence "artificial intelligence" might be represented as a 512-dimensional vector like [0.23, -0.45, 0.12, ...].

#### Entity Extraction

The process of identifying and classifying specific entities (people, places, organizations, dates) from unstructured text.

**Example:** From "John ordered a laptop from Amazon on Monday," extracting Person:John, Product:laptop, Organization:Amazon, Date:Monday.

#### Entity Linking

The task of connecting extracted entity mentions to specific entries in a knowledge base, disambiguating references to the same real-world entity.

**Example:** Linking "Apple" in "Apple released new products" to the company Apple Inc. rather than the fruit.

#### Entity Type

A category or classification for entities recognized in text, such as Person, Organization, Location, Date, or Product.

**Example:** In named entity recognition, identifying "Microsoft" as an Organization type and "Seattle" as a Location type.

#### Euclidean Distance

A mathematical measure of the straight-line distance between two points in multi-dimensional space, used to compare vector similarity.

**Example:** Calculating the distance between two embedding vectors to determine how semantically different two sentences are.

#### External Knowledge

Information sources publicly available outside an organization, such as websites, encyclopedias, and open datasets, used to augment chatbot capabilities.

**Example:** Using Wikipedia articles as external knowledge to help a chatbot answer general knowledge questions.

#### F-Measure

A harmonic mean combining precision and recall that provides a single score balancing both metrics, with variants like F1 giving equal weight to each.

**Example:** A search system with 80% precision and 70% recall has an F-measure (F1) of approximately 74.7%.

#### F1 Score

A specific F-measure that equally weights precision and recall, calculated as 2 × (precision × recall) / (precision + recall), commonly used for evaluating classification and search systems.

**Example:** An intent classifier with 85% precision and 80% recall has an F1 score of 82.4%.

#### Factual Accuracy

The degree to which information generated or retrieved by a system matches verifiable, objective truth.

**Example:** Measuring what percentage of a chatbot's factual claims can be verified against trusted sources.

#### FAISS

Facebook AI Similarity Search, an open-source library for efficient similarity search and clustering of dense vectors, optimized for billion-scale datasets.

**Example:** Using FAISS to index 10 million document embeddings and retrieve the top 10 most similar results in milliseconds.

#### False Positive

An instance where a system incorrectly classifies something as belonging to a category when it does not, representing a type of error.

**Example:** A chatbot incorrectly identifying a general question as a "complaint" intent would be a false positive for the complaint category.

#### FAQ

Frequently Asked Questions—a collection of common questions and their answers, often used to train chatbots and provide self-service support.

**Example:** A company website's FAQ section containing 50 common customer questions about shipping, returns, and warranties.

#### FAQ Analysis

The systematic examination of frequently asked questions to identify patterns, gaps in knowledge coverage, and opportunities for improving chatbot responses.

**Example:** Analyzing 1,000 customer questions to discover that 30% ask about return policies, indicating a need for better documentation.

#### FastText

A library developed by Facebook for efficient text classification and learning word embeddings, particularly effective for handling rare words and morphologically rich languages.

**Example:** Using FastText to generate embeddings that understand that "unhappy" and "happiness" are related through shared subword components.

#### Feedback Button

A user interface element that allows users to rate or comment on chatbot responses, typically implemented as thumbs up/down or star ratings.

**Example:** A thumbs up/down button appearing below each chatbot response to collect user satisfaction data.

#### Feedback Loop

A cyclical process where system outputs are monitored, evaluated, and used to improve future performance, creating continuous learning.

**Example:** User thumbs-down ratings trigger review of poor responses, leading to knowledge base updates that improve future answers.

#### Frequency Analysis

The examination of how often specific events, queries, or terms occur, used to identify patterns and prioritize improvements.

**Example:** Analyzing which questions users ask most frequently to prioritize which answers to improve first.

#### Full-Text Search

A search technique that examines all words in stored documents to find matches, supporting features like phrase matching, stemming, and relevance ranking.

**Example:** Searching an entire document collection for pages containing "conversational AI" rather than just matching titles or tags.

#### GDPR

General Data Protection Regulation—a European Union law governing data protection and privacy, imposing strict requirements on how personal data is collected, stored, and processed.

**Example:** Ensuring chatbot logs are deleted within mandated timeframes and users can request deletion of their conversation history.

#### Generation Step

The final phase in RAG where a language model generates a response based on the user's query and retrieved contextual information.

**Example:** After retrieving relevant documents, the LLM generates a natural language answer synthesizing information from those sources.

#### GloVe

Global Vectors for Word Representation—a word embedding technique that learns vectors by factorizing word co-occurrence statistics from large corpora.

**Example:** GloVe embeddings trained on Wikipedia can represent semantic relationships like "king - man + woman ≈ queen."

#### Graph Database

A database that uses graph structures with nodes, edges, and properties to represent and store data, optimized for querying connected information.

**Example:** Neo4j stores customer relationships, product connections, and interaction histories as an interconnected graph.

#### Graph Query

A request to retrieve or manipulate data from a graph database, typically using specialized languages like Cypher that leverage graph structure.

**Example:** Finding all products a customer has viewed within 3 clicks of products they purchased.

#### GraphRAG Pattern

An architecture combining knowledge graphs with retrieval augmented generation, where structured graph data provides curated context for language model responses.

**Example:** A chatbot that traverses a corporate knowledge graph to find connected information before generating comprehensive answers.

#### Grep Command

A command-line utility for searching text using patterns, widely used for finding specific strings or regular expressions in files.

**Example:** Running `grep -i "error" server.log` to find all lines containing "error" (case-insensitive) in a log file.

#### Hallucination

When a language model generates plausible-sounding but factually incorrect or nonsensical information not grounded in its training data or provided context.

**Example:** A chatbot confidently stating a product has a feature it doesn't actually have, based on plausible inference rather than facts.

#### Index Performance

The efficiency and speed of search index operations, including query response time, update speed, and resource utilization.

**Example:** Optimizing an inverted index so that keyword searches return results in under 100 milliseconds even with millions of documents.

#### Intent Classification

The task of categorizing user inputs into predefined intent categories to understand what action or information the user seeks.

**Example:** Classifying "I want to return my order" as a "return_request" intent.

#### Intent Modeling

The process of designing and implementing a system to recognize and categorize user intentions from natural language input.

**Example:** Creating 20 intent categories like "check_balance," "transfer_money," and "report_fraud" for a banking chatbot.

#### Intent Recognition

The process of identifying the underlying goal or purpose behind a user's message in a conversational system.

**Example:** Recognizing that "Can you help me reset my password?" expresses a "password_reset" intent.

#### Internal Knowledge

Proprietary or confidential information specific to an organization, such as company policies, internal documentation, and customer data.

**Example:** Using internal product specifications and troubleshooting guides as a knowledge source for an employee support chatbot.

#### Inverted Index

A data structure mapping terms to the documents or locations where they appear, enabling fast full-text search by looking up terms rather than scanning documents.

**Example:** An index showing that "chatbot" appears in documents 5, 23, 47, and 102, allowing instant retrieval.

#### JavaScript Library

A collection of pre-written JavaScript code providing reusable functionality for specific tasks, such as UI components, API integrations, or data manipulation.

**Example:** Using the React Chatbot library to quickly implement a chat interface without building it from scratch.

#### Key Performance Indicator

A measurable value that demonstrates how effectively an organization or system is achieving key objectives.

**Example:** Using acceptance rate, average response time, and resolution rate as KPIs for chatbot performance.

#### Keyword Search

A search technique that matches exact words or phrases in queries against indexed content, without understanding semantic meaning.

**Example:** Searching for "chatbot tutorial" returns only documents containing those exact words, missing semantically similar content like "conversational AI guide."

#### Knowledge Graph

A structured representation of information as entities (nodes) and relationships (edges) that captures semantic connections between concepts, enabling advanced reasoning and retrieval.

**Example:** A corporate knowledge graph connecting employees, projects, skills, and documents to enable sophisticated question answering.

#### Knowledge Management

The systematic process of creating, sharing, using, and managing an organization's knowledge and information assets.

**Example:** Implementing a knowledge graph and chatbot system to make internal expertise easily discoverable across departments.

#### KPI

See Key Performance Indicator.

#### LangChain

An open-source framework for developing applications powered by language models, providing tools for prompt management, chains of reasoning, and integration with external data sources.

**Example:** Using LangChain to build a RAG chatbot that retrieves documents, formats prompts, and generates responses with minimal code.

#### Large Language Model

A neural network with billions of parameters trained on vast text corpora that can understand and generate human-like text for various natural language tasks.

**Example:** GPT-4 and Claude are large language models capable of answering questions, writing code, and engaging in complex conversations.

#### Lemmatization

The linguistic process of reducing words to their base or dictionary form (lemma), considering grammatical context to make more accurate reductions than stemming.

**Example:** Converting "running," "ran," and "runs" all to the lemma "run" while keeping "better" as "good."

#### LlamaIndex

A framework designed specifically for building retrieval augmented generation applications, providing tools for indexing, querying, and integrating external data with language models.

**Example:** Using LlamaIndex to create searchable indexes of company documents that a chatbot can query to answer questions.

#### Log Analysis

The examination of system logs to identify patterns, diagnose issues, track usage, and extract insights about system behavior and user interactions.

**Example:** Analyzing chatbot logs to identify the 20% of questions that account for 80% of user queries.

#### Log Storage

The infrastructure and practices for persisting system logs, including storage location, format, retention policies, and access controls.

**Example:** Storing chat logs in a secure database with encryption and automatic deletion after 90 days.

#### Logging System

Infrastructure for capturing, storing, and managing records of system events, user interactions, and operational data.

**Example:** Implementing a logging system that records every chatbot query, response, latency, and user feedback.

#### Message Bubble

A visual element in chat interfaces that displays individual messages, typically styled as rounded rectangles alternating between user and bot sides.

**Example:** User messages appear in gray bubbles on the left, while chatbot responses appear in blue bubbles on the right.

#### Metadata

Structured information that describes, explains, or provides context about other data, facilitating organization, discovery, and management.

**Example:** Document metadata including title, author, creation date, and tags used to improve search and organization.

#### Metadata Tagging

The process of assigning descriptive labels or attributes to content to enable better organization, searchability, and categorization.

**Example:** Tagging documents with subject categories, departments, and relevance scores to improve chatbot retrieval accuracy.

#### Moore's Law

The observation that the number of transistors on integrated circuits doubles approximately every two years, historically driving exponential growth in computing power.

**Example:** This doubling effect has enabled the massive computational resources required to train modern large language models.

#### Named Entity Recognition

The natural language processing task of locating and classifying named entities in text into predefined categories such as persons, organizations, and locations.

**Example:** From "Apple was founded by Steve Jobs in Cupertino," extracting Apple (Organization), Steve Jobs (Person), and Cupertino (Location).

#### Natural Language Processing

The field of artificial intelligence focused on enabling computers to understand, interpret, and generate human language in meaningful ways.

**Example:** NLP powers chatbots' ability to understand questions like "What's the weather?" and generate appropriate responses.

#### Natural Language to SQL

The task of converting questions posed in natural language into executable SQL database queries.

**Example:** Translating "How many orders did we have last month?" into `SELECT COUNT(*) FROM orders WHERE month = LAST_MONTH`.

#### Neo4j

A popular open-source graph database management system that uses Cypher query language and is optimized for storing and querying highly connected data.

**Example:** Using Neo4j to store a corporate knowledge graph connecting employees, projects, documents, and expertise.

#### NLP Pipeline

A sequence of processing steps that transform raw text into structured representations suitable for analysis or downstream tasks.

**Example:** A pipeline consisting of tokenization → stemming → part-of-speech tagging → named entity recognition.

#### Node

A fundamental unit in a graph database representing an entity, containing properties and connected to other nodes via edges.

**Example:** A Person node with properties like name: "Alice" and role: "Engineer" connected to Project nodes via WORKS_ON edges.

#### Node.js

A JavaScript runtime environment that executes JavaScript code outside browsers, commonly used for building server-side applications and chatbot backends.

**Example:** Building a chatbot API server using Node.js and Express to handle user queries and integrate with language models.

#### Ontology

A formal specification of concepts, categories, properties, and relationships within a domain, providing structured knowledge representation.

**Example:** A medical ontology defining relationships between diseases, symptoms, treatments, and body systems for a healthcare chatbot.

#### OpenCypher

An open-source specification for the Cypher graph query language, enabling portability of graph queries across compatible database systems.

**Example:** Writing OpenCypher queries that work with both Neo4j and Amazon Neptune graph databases.

#### Optimization

The process of improving system performance, efficiency, or effectiveness by refining algorithms, configurations, or resource allocation.

**Example:** Optimizing a chatbot's response time by caching frequent queries and tuning vector search parameters.

#### Organizational Knowledge

Collective information, expertise, best practices, and institutional memory accumulated within an organization.

**Example:** Internal wikis, process documents, and expert knowledge captured in a corporate knowledge graph.

#### Page Rank Algorithm

A link analysis algorithm that assigns importance scores to web pages based on the quantity and quality of links pointing to them, originally developed for Google Search.

**Example:** In a knowledge graph, using PageRank to identify the most central and important concepts based on their connections.

#### Parameter Extraction

The process of identifying and extracting specific values from natural language input to fill slots in structured queries or commands.

**Example:** From "Show me sales for Q3 2023," extracting quarter=Q3 and year=2023.

#### Parameterized Query

A database query template with placeholder values that are supplied separately, improving security and enabling query reuse.

**Example:** `SELECT * FROM users WHERE id = ?` where the ID value is provided separately to prevent SQL injection.

#### Pareto Analysis

An analytical technique based on the Pareto Principle that identifies the vital few factors accounting for the majority of effects.

**Example:** Analyzing chatbot queries to find that 20% of question types generate 80% of user traffic.

#### Part-of-Speech Tagging

The process of marking words in text with their grammatical categories (noun, verb, adjective, etc.) based on context and definition.

**Example:** In "The quick brown fox jumps," tagging "The" as determiner, "quick" and "brown" as adjectives, "fox" as noun, "jumps" as verb.

#### Performance Tuning

The systematic process of adjusting system parameters, configurations, and implementations to optimize speed, efficiency, and resource utilization.

**Example:** Tuning vector search parameters to balance retrieval accuracy against response latency in a RAG chatbot.

#### Personally Identifiable Info

See PII.

#### Personalization

The customization of user experiences based on individual preferences, history, and context to provide more relevant and tailored interactions.

**Example:** A chatbot that remembers a user's product preferences and suggests relevant items based on past interactions.

#### PII

Personally Identifiable Information—data that can identify a specific individual, such as names, addresses, phone numbers, or email addresses, requiring special privacy protection.

**Example:** Scrubbing user names and email addresses from chat logs before analysis to protect privacy.

#### Pinecone

A managed vector database service optimized for storing and querying high-dimensional embeddings at scale with low latency.

**Example:** Using Pinecone to store and search 100 million document embeddings for a large-scale chatbot application.

#### Private Documents

Confidential or restricted organizational content not intended for public access, often used as internal knowledge sources for chatbots.

**Example:** Employee handbooks, internal procedures, and confidential reports used to train an internal corporate chatbot.

#### Prompt Engineering

The practice of designing and refining input prompts to language models to elicit desired outputs, behaviors, or reasoning patterns.

**Example:** Crafting a system prompt like "You are a helpful technical support agent. Provide concise, accurate answers with step-by-step instructions."

#### Public Knowledge Base

A collection of information openly available to anyone, such as public documentation, wikis, or educational resources.

**Example:** Using publicly available product manuals and FAQs as a knowledge source for a customer-facing chatbot.

#### Query Description

A natural language or structured explanation of what information a query seeks, used to improve query understanding and execution.

**Example:** Describing "Find all orders placed this week" before converting it to SQL.

#### Query Execution

The process of running a query against a database or search system and returning results.

**Example:** Executing `SELECT * FROM products WHERE category='electronics'` and retrieving 247 matching products.

#### Query Frequency

The rate at which specific queries or query types occur, used to identify common questions and prioritize improvements.

**Example:** Discovering that "how do I reset my password" is asked 500 times daily, making it a high-priority question to answer well.

#### Query Optimization

The process of improving query performance through better indexing, query restructuring, or caching strategies.

**Example:** Adding an index on the "created_date" column to speed up queries filtering by date range.

#### Query Parameter

A value extracted from user input that fills a slot in a structured query template.

**Example:** Extracting "electronics" and "under $100" as parameters from "Show me electronics under $100."

#### Query Parser

A component that analyzes and interprets search queries, extracting keywords, operators, and structure to construct effective searches.

**Example:** Parsing "iPhone OR Android -tablet" into separate tokens with operators to execute a Boolean search.

#### Query Template

A reusable query structure with placeholders for variable values, enabling consistent query construction from natural language.

**Example:** "SELECT * FROM orders WHERE customer_id = {user_id} AND status = {status}" as a template for order status queries.

#### Question to Query Mapping

The process of translating natural language questions into structured database queries or search operations.

**Example:** Mapping "Who ordered the most products last month?" to a SQL query with aggregation and date filtering.

#### Question-Answer Pair

A structured unit consisting of a question and its corresponding answer, commonly used to train chatbots and build FAQ systems.

**Example:** Q: "What is your return policy?" A: "We accept returns within 30 days of purchase with original receipt."

#### RAG Limitations

The constraints and challenges of Retrieval Augmented Generation systems, including context length limits, retrieval quality dependency, and difficulty handling multi-hop reasoning.

**Example:** A RAG system struggling to answer questions requiring information synthesis from multiple unconnected documents.

#### RAG Pattern

See Retrieval Augmented Generation.

#### Rasa

An open-source conversational AI framework that provides tools for natural language understanding, dialog management, and custom chatbot development with full control.

**Example:** Using Rasa to build a customer service bot with custom entity extraction and dialog policies.

#### RBAC

See Role-Based Access Control.

#### React Chatbot

A chatbot user interface component built using the React JavaScript library, leveraging component-based architecture for reusable UI elements.

**Example:** Creating a React chatbot component that can be embedded in any React application with minimal configuration.

#### RDF

Resource Description Framework—a standard model for data interchange on the web using subject-predicate-object triples to represent information.

**Example:** Representing "Alice knows Bob" as the RDF triple (Alice, knows, Bob).

#### Regular Expressions

Patterns that describe sets of strings, used for text searching, matching, and manipulation with compact and powerful syntax.

**Example:** Using the regex `\d{3}-\d{2}-\d{4}` to match Social Security numbers in the format XXX-XX-XXXX.

#### Response Accuracy

The degree to which a chatbot's answers are correct, relevant, and truthful, measured against ground truth or expert evaluation.

**Example:** Evaluating 100 chatbot responses and finding that 87 are factually correct, yielding 87% accuracy.

#### Response Generation

The process of creating appropriate output messages in response to user inputs, either through template selection, retrieval, or language model generation.

**Example:** Using an LLM to generate a natural language answer based on retrieved documents and user query.

#### Response Latency

The time delay between receiving a user query and delivering a response, a critical performance metric affecting user experience.

**Example:** Measuring that 95% of chatbot responses are delivered within 2 seconds.

#### Response Quality

The overall effectiveness of a chatbot response considering accuracy, relevance, helpfulness, clarity, and appropriateness.

**Example:** Rating responses on a 1-5 scale based on whether they correctly and completely address the user's question.

#### Retrieval Augmented Generation

An architecture that combines information retrieval with language generation, where relevant documents are first retrieved and then used as context for generating responses.

**Example:** When asked about a company policy, first retrieving relevant policy documents, then using them as context for the LLM to generate an answer.

#### Retrieval Step

The first phase in RAG where relevant documents or information are identified and retrieved from a knowledge base based on the user's query.

**Example:** Using semantic search to find the top 5 most relevant FAQ entries for a user's question.

#### Reverse Index

See Inverted Index.

#### Role-Based Access Control

A security model that restricts system access based on user roles, with permissions assigned to roles rather than individual users.

**Example:** Allowing users with the "Manager" role to query financial data while restricting "Employee" role users to general information.

#### Search Index

A data structure that enables fast information retrieval by pre-processing and organizing content for efficient querying.

**Example:** Building a search index of 1 million documents that enables keyword searches to return results in milliseconds.

#### Search Performance

The efficiency of a search system measured by query response time, resource utilization, and scalability.

**Example:** A search system that handles 10,000 queries per second with average response time under 50ms demonstrates excellent performance.

#### Search Precision

The fraction of retrieved results that are relevant, calculated as (relevant retrieved) / (total retrieved), measuring result quality.

**Example:** If a search returns 20 results and 15 are relevant, precision is 75%.

#### Search Query

A request submitted to a search system specifying what information to find, typically consisting of keywords, phrases, or structured criteria.

**Example:** A user entering "chatbot frameworks for Python" into a search system.

#### Search Ranking

The process of ordering search results by relevance, importance, or other criteria to present the most useful results first.

**Example:** Ranking search results using a combination of keyword matching, semantic similarity, and PageRank scores.

#### Search Recall

The fraction of all relevant documents that are successfully retrieved, calculated as (relevant retrieved) / (total relevant), measuring completeness.

**Example:** If 100 relevant documents exist and the search retrieves 70 of them, recall is 70%.

#### Security

The protection of systems, data, and resources from unauthorized access, use, disclosure, disruption, or destruction.

**Example:** Implementing authentication, encryption, and access controls to protect sensitive chatbot interactions.

#### Semantic Search

A search approach that understands the meaning and intent behind queries rather than just matching keywords, using techniques like embeddings and vector similarity.

**Example:** Searching for "AI chatbot" and also retrieving results about "conversational agents" and "virtual assistants" based on semantic similarity.

#### Sentence Embedding

A dense vector representation of an entire sentence that captures its semantic meaning, enabling sentence-level similarity comparisons.

**Example:** Converting "I love programming" into a 384-dimensional vector that can be compared with other sentences for similarity.

#### Session Management

The process of maintaining state and context across multiple interactions within a conversation or user session.

**Example:** Tracking conversation history and user preferences throughout a chat session that may span multiple questions.

#### Slot Filling

The process of extracting specific pieces of information from user input to populate predefined fields or parameters needed for task completion.

**Example:** From "Book a flight to Paris on Friday," filling slots: destination=Paris, date=Friday.

#### SQL Query

A structured query written in Structured Query Language to retrieve, insert, update, or delete data from relational databases.

**Example:** `SELECT name, price FROM products WHERE category='electronics' ORDER BY price DESC`.

#### Stemming

The process of reducing words to their root form by removing suffixes, enabling matching of related word forms.

**Example:** Reducing "running," "runner," and "runs" to the stem "run."

#### String Matching

The process of finding occurrences of a character sequence (pattern) within another string, fundamental to text search.

**Example:** Finding all occurrences of "chatbot" in a document, regardless of whether it appears in "chatbots" or "chatbot's."

#### Subject-Predicate-Object

A three-part structure for representing knowledge, where a subject is related to an object via a predicate, forming the basis of triples in RDF and knowledge graphs.

**Example:** In the triple (Alice, works_at, Google), "Alice" is the subject, "works_at" is the predicate, and "Google" is the object.

#### Subword Tokenization

A tokenization approach that splits words into smaller units when necessary, balancing vocabulary size with the ability to represent rare or unknown words.

**Example:** Splitting "unhappiness" into ["un", "happiness"] to handle a rare word using known components.

#### Synonym Expansion

A query enhancement technique that adds synonymous terms to improve recall by matching alternative expressions of the same concept.

**Example:** Expanding "automobile" to include "car," "vehicle," and "auto" in the search query.

#### System Prompt

An initial instruction or context provided to a language model that defines its role, behavior, and constraints for subsequent interactions.

**Example:** "You are a knowledgeable customer service agent for TechCorp. Be helpful, concise, and professional in all responses."

#### Taxonomy

A hierarchical classification system that organizes concepts into categories and subcategories based on relationships and shared characteristics.

**Example:** A product taxonomy organizing items into categories like Electronics > Computers > Laptops > Gaming Laptops.

#### Team Project

A collaborative assignment where students work together to design, implement, and deliver a project, developing teamwork and communication skills.

**Example:** A team of four students building a chatbot for a local business, with members handling frontend, backend, NLP, and testing.

#### Term Frequency

The number of times a term appears in a document, used in TF-IDF calculations to measure term importance within that document.

**Example:** If "chatbot" appears 15 times in a document, its term frequency is 15.

#### Text Normalization

The process of transforming text into a consistent, canonical form by handling case, punctuation, spacing, and character variations.

**Example:** Converting "ChatBot," "chatbot," and "CHATBOT" all to "chatbot" for consistent matching.

#### Text Preprocessing

The initial steps of cleaning and transforming raw text into a standardized format suitable for analysis or processing.

**Example:** Removing special characters, converting to lowercase, and removing extra whitespace before tokenization.

#### Text Processing

The computational manipulation and analysis of textual data, including operations like parsing, searching, extracting, and transforming text.

**Example:** Processing customer reviews to extract sentiment, topics, and product mentions.

#### TF-IDF

Term Frequency-Inverse Document Frequency—a numerical statistic that reflects how important a word is to a document in a corpus by balancing term occurrence with rarity.

**Example:** Words like "the" have high term frequency but low IDF (common across documents), while domain-specific terms score high on both.

#### Thesaurus

A reference work listing words grouped by similarity of meaning, used in search systems for synonym expansion and query enhancement.

**Example:** Using a thesaurus to expand "fast" to include "quick," "rapid," and "speedy" in search queries.

#### Thumbs Up/Down

A simple binary feedback mechanism allowing users to indicate approval or disapproval of chatbot responses.

**Example:** Displaying thumbs up and down buttons below each response to collect quick satisfaction feedback.

#### Token

A basic unit of text resulting from tokenization, which may represent a word, subword, character, or other meaningful segment.

**Example:** The sentence "I love AI" might be tokenized into three tokens: ["I", "love", "AI"].

#### Tokenization

The process of breaking text into smaller units (tokens) such as words, subwords, or characters for processing by NLP systems.

**Example:** Splitting "Hello, world!" into tokens ["Hello", ",", "world", "!"].

#### Transformer Architecture

A neural network architecture based on self-attention mechanisms that processes entire sequences in parallel, forming the foundation of modern large language models.

**Example:** BERT, GPT, and Claude all use transformer architectures to understand and generate text.

#### Triple

A three-part knowledge representation consisting of subject, predicate, and object that expresses a single fact or relationship.

**Example:** The triple (Neo4j, is_a, GraphDatabase) represents the fact that Neo4j is a type of graph database.

#### True Positive

A correct prediction where a system correctly identifies something as belonging to a category when it actually does.

**Example:** A chatbot correctly classifying "I want a refund" as a "refund_request" intent is a true positive.

#### User Context

Information about a user's current situation, preferences, history, and environment that helps personalize and improve interaction relevance.

**Example:** Knowing a user previously asked about laptops helps the chatbot understand that "What about warranty?" refers to laptop warranty.

#### User Feedback

Information provided by users about their experience, satisfaction, or problems with a system, used to drive improvements.

**Example:** Collecting thumbs up/down ratings, comments, and behavioral signals like query reformulation.

#### User History

A record of a user's past interactions, queries, preferences, and behaviors used to personalize future experiences.

**Example:** Storing what products a user has viewed and purchased to provide personalized recommendations.

#### User Intent

The underlying goal or purpose a user wants to accomplish through their interaction with a system.

**Example:** Behind the query "Where's my package?", the user intent is to track an order shipment.

#### User Interface

The visual and interactive components through which users interact with a system, including layouts, controls, and feedback elements.

**Example:** A chatbot's user interface includes the message display area, input field, send button, and feedback controls.

#### User Permission

Authorization granted to a user specifying what actions they can perform and what resources they can access.

**Example:** Granting a user permission to query product information but not modify pricing data.

#### User Preferences

Settings, choices, and favored options that customize a user's experience based on their individual tastes and needs.

**Example:** A user's preference for concise answers rather than detailed explanations, stored to customize chatbot response style.

#### User Profile

A collection of information about a user including demographics, preferences, history, and permissions that enables personalization and access control.

**Example:** A profile containing user role, department, preferred topics, and interaction history.

#### User Prompt

The input or question provided by a user to a language model or chatbot, as opposed to system-generated prompts.

**Example:** A user typing "What is semantic search?" into a chatbot interface.

#### User Query

A question or request submitted by a user to a search system or chatbot seeking information or assistance.

**Example:** A user asking "How do I return an item?" in a customer service chatbot.

#### User Satisfaction

The degree to which users are pleased with their experience, often measured through surveys, ratings, and behavioral metrics.

**Example:** Measuring user satisfaction through post-interaction surveys showing 4.2 out of 5 stars average rating.

#### Vector Database

A specialized database optimized for storing, indexing, and querying high-dimensional vector embeddings with efficient similarity search capabilities.

**Example:** Using Pinecone or Weaviate to store and search millions of document embeddings for a chatbot.

#### Vector Dimension

The number of numeric values in a vector representation, determining the capacity to encode information and computational requirements.

**Example:** Sentence-BERT generates 768-dimensional vectors, meaning each sentence is represented by 768 numbers.

#### Vector Index

A data structure that organizes vector embeddings to enable fast similarity search, using techniques like locality-sensitive hashing or clustering.

**Example:** Building a FAISS index of document embeddings to enable millisecond similarity searches.

#### Vector Similarity

A measure of how close two vectors are in multi-dimensional space, indicating semantic similarity between their represented meanings.

**Example:** Calculating cosine similarity between query and document embeddings to find the most relevant results.

#### Vector Space Model

A mathematical model representing text as vectors in a high-dimensional space, where semantic similarity corresponds to geometric proximity.

**Example:** Representing documents and queries as vectors so that semantically similar texts cluster together in vector space.

#### Vector Store

A system for persisting and retrieving vector embeddings, providing the infrastructure for semantic search in RAG systems.

**Example:** Storing product description embeddings in a vector store to enable semantic product search.

#### Weaviate

An open-source vector database that combines vector search with structured filtering and integrates with various AI models for embedding generation.

**Example:** Using Weaviate to store documents with both embeddings for semantic search and metadata for filtering by date or category.

#### Word Embedding

A dense vector representation of a word that captures its semantic meaning based on context and usage patterns in text.

**Example:** The word "king" might be represented as a 300-dimensional vector that's mathematically closer to "queen" than to "car."

#### Word2Vec

A technique for learning word embeddings by predicting words from their context (CBOW) or context from words (Skip-gram), creating semantically meaningful vector representations.

**Example:** Word2Vec learns that "doctor" and "nurse" are similar by observing they appear in similar contexts.
