---
title: Course Description for Conversational AI
description: Build intelligent chatbots and conversational agents from the ground up—from simple keyword search to cutting-edge GraphRAG systems that power the future of human-AI interaction
quality_score: 95
---

# Course Description for Conversational AI

**Title:** Conversational AI<br/>
**Grade Level:** College Sophomores

## Why This Course?

Ever wondered how ChatGPT, Alexa, or customer service bots actually work? Want to build AI systems that can hold intelligent conversations, answer questions, and solve real problems? This course takes you from "Hello, World!" to deploying production-ready conversational AI systems that people will actually want to use.

You'll start by building a simple chatbot in Week 2, and by the end of the semester, you'll have created sophisticated AI agents that understand context, search massive knowledge bases in milliseconds, and integrate with real databases—all while keeping user data secure and private.

This isn't just theory. You'll write code, ship projects, and build a portfolio that demonstrates real AI engineering skills. Whether you're eyeing a career in AI, want to add conversational interfaces to your projects, or are just fascinated by how machines learn to "talk," this course will get you there.

## Prerequisites

**What you need to get started:**

- Basic Python programming (if you can write functions and loops or use Claude, you're good!)
- Comfort with terminal/shell commands (or willingness to learn in Weeks 1-2)
- VSCode IDE installed on your computer
- GitHub account (free) for sharing your projects

!!! Note "Designed for Accessibility"
    We've intentionally kept prerequisites minimal.  Non-CS majors are welcome! If you're new to GitHub or command-line tools, expect to invest extra time in the first two weeks getting up to speed. We'll provide resources and support to help you succeed.  If you have never used the terminal or GitHub we strongly suggest you use Anthropic Claude or ChatGPT.

## Course Overview: Your Journey from Novice to AI Engineer

### Act I: Foundations (Weeks 1-4)
**Build your first chatbot and master the fundamentals**

You'll dive right in, building a working chatbot that answers questions from text files—no AI magic yet, just smart keyword matching. Along the way, you'll discover why traditional search falls short and what makes semantic search so powerful. We'll explore how to measure search quality using precision, recall, and F-measures, giving you the vocabulary to talk about AI systems like a professional.

Next, you'll peek under the hood at search performance, learning how reverse indexes and Page Rank make Google-scale search possible. Then comes the exciting part: Large Language Models (LLMs), tokenization, and natural language understanding. You'll learn to analyze FAQs, model user intent, and implement feedback loops that make your chatbot smarter over time.

### Act II: Advanced Architectures (Weeks 5-9)
**Level up with embeddings, vector stores, and RAG**

This is where it gets really interesting. You'll discover embeddings—the mathematical representation of meaning that powers modern AI—and learn to build vector stores that enable semantic search. We'll introduce the RAG (Retrieval Augmented Generation) pattern, the architecture behind most production chatbots today.

But here's the kicker: RAG has limitations. You'll learn exactly what they are, then build something better—GraphRAG. This cutting-edge approach uses curated knowledge graphs that become the "central nervous system" of organizations, connecting information in ways that simple retrieval can't match.

### Act III: Production Systems (Weeks 10-14)
**Build real-world systems with databases, security, and dashboards**

Now you'll connect your chatbots to actual database services, learning to match natural language questions to structured queries and extract parameters on the fly. ("Show me sales for Q3" becomes `SELECT * FROM sales WHERE quarter = 3`—automatically!)

We'll tackle the serious stuff: user context, security, role-based access control, and privacy concerns. You'll learn to build chatbot dashboards with KPIs, analyze usage patterns with Pareto analysis, and tune performance for real-world deployment.

### The Finale: Your Capstone Project
**Bring it all together**

You'll design and build a complete conversational AI system that showcases everything you've learned—your portfolio piece that demonstrates you can ship production-quality AI applications.

## What Makes This Course Different

**Hands-on from Day 1:** No endless lectures—you'll build working systems immediately and using AI to help get unstuck
**Real tools, real frameworks:** Use the same technologies deployed in production by companies worldwide
**Progressive complexity:** Each project builds on the last, creating a clear learning path
**Career-focused:** Every skill taught is directly applicable to AI engineering roles
**Privacy and ethics integrated:** Learn to build responsible AI systems, not just powerful ones


## Topics Covered: The Complete Skillset

### AI Fundamentals & Context
- **Artificial Intelligence fundamentals** - Understanding the landscape
- **AI Timelines** - How we got here and where we're going
- **AI Doubling Rate** - Why AI is accelerating faster than Moore's Law
- **Corporate Nervous Systems** - How AI becomes organizational infrastructure

### Search Technologies (From Simple to Semantic)
- **Traditional Search** - Grep, keyword search, and their limitations
- **Advanced Search Techniques** - Synonym expansion, ontology enrichment, metadata tagging
- **Semantic Search** - Understanding meaning, not just keywords
- **Search Performance** - Reverse indexes, Page Rank, and scaling to billions of documents
- **Vector Search & TF-IDF** - The math behind modern search

### Natural Language Processing
- **NLP Fundamentals** - How machines understand human language
- **Tokenization** - Breaking language into processable units
- **Intent Modeling** - Understanding what users really want
- **FAQ Analysis** - Extracting patterns from common questions
- **NLP Pipelines** - Production-ready text processing systems
- **Entity Extraction** - Identifying people, places, things, and concepts automatically

### Large Language Models (LLMs)
- **LLM Architecture** - How ChatGPT-style models work (without building them from scratch)
- **Embeddings** - The vector representations that power semantic understanding
- **Vector Stores** - Storing and searching billions of embeddings efficiently

### Conversational AI Architectures
- **Building Your First Chatbot** - From idea to implementation
- **The RAG Pattern** - Retrieval Augmented Generation in depth
- **Limitations of RAG** - When retrieval isn't enough
- **The GraphRAG Pattern** - Next-generation architecture using knowledge graphs
- **Knowledge Graphs** - Structuring knowledge for AI systems
- **Graph Databases & Cypher** - Neo4j and graph query languages

### Search Quality & Metrics
- **Precision & Recall** - The fundamental tradeoff
- **F-Measures & F1** - Combining metrics for holistic evaluation
- **Measuring Response Quality** - Beyond accuracy
- **Chatbot KPIs** - Metrics that matter in production
- **Acceptance Rate** - Are users satisfied?
- **Query Frequency Analysis** - Using Pareto principles to prioritize improvements

### Production Systems Engineering
- **Database Integration** - Connecting chatbots to real data
- **Query Execution** - From natural language to SQL
- **Parameter Extraction** - Pulling structured data from conversations
- **User Context** - Maintaining conversation state
- **Security & Privacy** - Protecting user data
- **Role-based Access Control** - Who can ask what?
- **Logging & Monitoring** - Tracking conversations responsibly
- **Privacy Considerations** - Handling PII in chat logs

### User Experience & Feedback
- **User Interfaces** - Building chatbot UIs that people love
- **Feedback Mechanisms** - Thumbs up/down and beyond
- **The AI Flywheel** - Using feedback to continuously improve
- **Chatbot Dashboards** - Visualizing performance

### Tools & Frameworks
- **Chatbot Frameworks** - Industry-standard tools and when to use them
- **JavaScript Libraries** - Frontend integration
- **Performance Tuning** - Making chatbots fast and efficient
- **Performance Tradeoffs** - Balancing speed, accuracy, and cost

### Professional Development
- **Team Projects** - Collaborating on AI systems
- **Capstone Project** - Your portfolio showcase
- **Chatbot Careers** - Where this skillset takes you
- **External vs. Internal Knowledge** - Public data vs. private organizational knowledge

## What We're NOT Covering (And Why)

This course focuses on building and deploying conversational AI systems, not on the underlying ML theory. We deliberately skip:

- **Deep neural network internals** - You'll use pre-trained models, not build them from scratch
- **LLM training & customization** - Training GPT-style models requires millions in compute; we'll teach you to use them effectively instead
- **LLM performance optimization** - Advanced model optimization is its own semester-long course
- **Semantic web technologies** (SPARQL, RDF, Triples) - Historically interesting but not part of modern graph databases and conversational AI

**The philosophy:** We teach you to build AI systems that solve real problems today, using production tools and best practices. Deep learning theory and semantic web protocols are fascinating but won't help you ship your first chatbot.

## Learning Objectives: What You'll Actually Be Able to Do

We've structured this course around Bloom's Taxonomy to ensure you don't just memorize facts—you'll develop deep understanding and hands-on skills. Here's what you'll master:

### Remember

- Define key terms including LLM, tokenization, embeddings, vector stores, and RAG
- List the components of a conversational AI system
- Identify the differences between keyword search and semantic search
- Recall the metrics used to measure search quality (precision, recall, F-measures)
- Name common chatbot frameworks and JavaScript libraries
- Recognize the structure of NLP pipelines

### Understand

- Explain how semantic search improves upon traditional keyword search
- Describe the RAG (Retrieval Augmented Generation) pattern and its components
- Summarize the limitations of RAG and how GraphRAG addresses them
- Discuss the role of reverse indexes and Page Rank in search performance
- Explain how embeddings and vector stores enable semantic search
- Interpret chatbot KPIs and dashboard metrics
- Clarify the importance of knowledge graphs as organizational nervous systems

### Apply

- Build a simple chatbot using keyword search
- Implement a RAG-based chatbot using embeddings and vector stores
- Use NLP pipelines to process and analyze text
- Apply TF-IDF techniques for text analysis
- Configure logging for chatbot responses
- Execute queries with extracted parameters from user questions
- Implement role-based access control for chatbot queries

### Analyze

- Compare the effectiveness of keyword search versus semantic search
- Examine chatbot logs to identify frequently asked questions with incorrect answers
- Perform Pareto analysis on query frequency data
- Break down the differences between RAG and GraphRAG patterns
- Differentiate between external public knowledge and internal private knowledge sources
- Analyze user feedback to improve chatbot performance
- Investigate privacy concerns related to storing PII in chat logs

### Evaluate

- Assess chatbot response quality using appropriate metrics
- Critique the trade-offs between different search approaches
- Judge the acceptance rate and user satisfaction of chatbot responses
- Evaluate the security implications of query execution and user permissions
- Determine which chatbot framework best fits specific use cases
- Appraise the performance trade-offs in chatbot design decisions
- Measure and evaluate the effectiveness of intent modeling approaches

### Create

- Design and develop a complete RAG-based chatbot system
- Construct a GraphRAG implementation with curated knowledge graphs
- Generate a chatbot dashboard with relevant KPIs and metrics
- Develop an entity extraction system for building knowledge graphs
- Design a query matching system that extracts parameters from natural language questions
- Produce a comprehensive chatbot evaluation framework
- Complete a capstone project integrating multiple conversational AI concepts

## Grading

- Homework and class participation (25%)
- Midterm project (15%)
- Final capstone project (35%)
- Final exam - in person Q&A with instructor (25%)



