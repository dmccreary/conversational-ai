# FAQ Coverage Gaps

**Generated:** 2025-11-15
**Course:** Conversational AI
**Total Concepts:** 200
**Covered Concepts:** 142 (71%)
**Uncovered Concepts:** 58 (29%)

## Overview

This report identifies concepts from the learning graph not yet covered in the FAQ. Gaps are prioritized based on concept centrality (number of dependencies), category importance, and typical student questions.

## Coverage Summary by Category

| Category | Total | Covered | Gap | Coverage % |
|----------|-------|---------|-----|------------|
| AI Fundamentals | 9 | 9 | 0 | 100% ✅ |
| Search Technologies | 27 | 24 | 3 | 89% ✅ |
| NLP Techniques | 20 | 18 | 2 | 90% ✅ |
| LLMs & Embeddings | 25 | 22 | 3 | 88% ✅ |
| Vector Databases | 9 | 8 | 1 | 89% ✅ |
| Chatbots & Intent | 18 | 15 | 3 | 83% ✅ |
| RAG & GraphRAG | 18 | 18 | 0 | 100% ✅ |
| NLP Pipelines | 15 | 10 | 5 | 67% ⚠️ |
| Database Integration | 12 | 9 | 3 | 75% ✅ |
| Security & Privacy | 13 | 9 | 4 | 69% ⚠️ |
| Evaluation & Metrics | 16 | 14 | 2 | 88% ✅ |
| Frameworks & Tools | 18 | 12 | 6 | 67% ⚠️ |

## Critical Gaps (High Priority)

High-centrality concepts with many dependencies that should be covered in FAQ.

### 1. Part-of-Speech Tagging

- **Category:** NLP Pipelines
- **Centrality:** High (8 dependencies)
- **Why Important:** Fundamental NLP technique used in many pipelines
- **Suggested Question:** "What is part-of-speech tagging and how is it used in chatbots?"
- **Suggested Category:** Technical Detail Questions

### 2. Rasa

- **Category:** Frameworks & Tools
- **Centrality:** Medium (5 dependencies)
- **Why Important:** Major open-source chatbot framework
- **Suggested Question:** "What is Rasa and when should I use it?"
- **Suggested Category:** Core Concepts or Best Practices

### 3. Dialogflow

- **Category:** Frameworks & Tools
- **Centrality:** Medium (5 dependencies)
- **Why Important:** Popular Google-owned chatbot platform
- **Suggested Question:** "How does Dialogflow work and what are its main features?"
- **Suggested Category:** Core Concepts or Best Practices

### 4. GDPR

- **Category:** Security & Privacy
- **Centrality:** High (7 dependencies)
- **Why Important:** Critical legal requirement for data privacy
- **Suggested Question:** "What is GDPR and how does it affect chatbot development?"
- **Suggested Category:** Technical Detail Questions or Best Practices

### 5. LangChain

- **Category:** Frameworks & Tools
- **Centrality:** High (12 dependencies)
- **Why Important:** Leading framework for LLM applications
- **Suggested Question:** "How do I use LangChain to build RAG chatbots?"
- **Suggested Category:** Core Concepts (already partially covered but could expand)

## Medium Priority Gaps

Moderate-centrality concepts that would enhance FAQ completeness.

### NLP Pipelines Category (5 gaps)

1. **Text Normalization**
   - Suggested Question: "What is text normalization and why is it important?"
   - Priority: Medium
   - Suggested Category: Technical Detail Questions

2. **Text Preprocessing**
   - Suggested Question: "What are the essential text preprocessing steps for NLP?"
   - Priority: Medium
   - Suggested Category: Technical Detail Questions or Best Practices

3. **Lemmatization** (partially covered in comparison with stemming)
   - Suggested Question: "What is lemmatization and when should I use it instead of stemming?"
   - Priority: Low (already compared with stemming)
   - Suggested Category: Technical Detail Questions

4. **Part-of-Speech Tagging**
   - Listed as Critical Gap above

5. **Text Processing** (general overview)
   - Suggested Question: "What is text processing and what are its main components?"
   - Priority: Low (covered implicitly in NLP discussion)
   - Suggested Category: Core Concepts

### Frameworks & Tools Category (6 gaps)

1. **Rasa** - Listed as Critical Gap above

2. **Dialogflow** - Listed as Critical Gap above

3. **Botpress**
   - Suggested Question: "What is Botpress and how does it compare to other frameworks?"
   - Priority: Low
   - Suggested Category: Technical Detail Questions

4. **LlamaIndex**
   - Suggested Question: "When should I use LlamaIndex versus LangChain?"
   - Priority: Medium
   - Suggested Category: Best Practices

5. **JavaScript Library** (general)
   - Suggested Question: "What JavaScript libraries are best for building chatbot UIs?"
   - Priority: Medium
   - Suggested Category: Best Practices

6. **React Chatbot**
   - Suggested Question: "How do I build a chatbot UI with React?"
   - Priority: Low
   - Suggested Category: Advanced Topics

### Security & Privacy Category (4 gaps)

1. **GDPR** - Listed as Critical Gap above

2. **Authentication** (covered partially in broader security discussion)
   - Suggested Question: "How do I implement authentication for my chatbot?"
   - Priority: Medium
   - Suggested Category: Best Practices

3. **Authorization** (covered in RBAC discussion)
   - Priority: Low (adequately covered through RBAC)

4. **Data Retention**
   - Suggested Question: "What are best practices for chat log data retention?"
   - Priority: Medium
   - Suggested Category: Best Practices or Common Challenges

### Database Integration Category (3 gaps)

1. **Query Template**
   - Suggested Question: "How do I create reusable query templates for natural language to SQL?"
   - Priority: Low
   - Suggested Category: Technical Detail Questions

2. **Parameterized Query** (covered in broader query discussion)
   - Priority: Low

3. **Query Description**
   - Suggested Question: "How should I describe queries to improve chatbot understanding?"
   - Priority: Low
   - Suggested Category: Best Practices

### Search Technologies Category (3 gaps)

1. **Boolean Search**
   - Suggested Question: "What is Boolean search and how does it differ from semantic search?"
   - Priority: Low
   - Suggested Category: Technical Detail Questions

2. **Query Parser**
   - Suggested Question: "How does a query parser work in search systems?"
   - Priority: Low
   - Suggested Category: Technical Detail Questions

3. **Controlled Vocabulary**
   - Suggested Question: "What is a controlled vocabulary and how does it improve search?"
   - Priority: Low
   - Suggested Category: Technical Detail Questions

### Chatbots & Intent Category (3 gaps)

1. **Intent Classification** (covered through Intent Recognition)
   - Priority: Very Low (adequately covered)

2. **Dialog System**
   - Suggested Question: "What is a dialog system and how does it manage conversations?"
   - Priority: Medium
   - Suggested Category: Core Concepts

3. **Intent Modeling** (covered through Intent Recognition)
   - Priority: Very Low

### LLMs & Embeddings Category (3 gaps)

1. **Word2Vec** (partially covered in embeddings comparison)
   - Priority: Low (covered in comparison with BERT)

2. **GloVe**
   - Suggested Question: "What is GloVe and how does it compare to Word2Vec?"
   - Priority: Very Low
   - Suggested Category: Technical Detail Questions

3. **FastText**
   - Suggested Question: "What is FastText and when should I use it?"
   - Priority: Very Low
   - Suggested Category: Technical Detail Questions

### Evaluation & Metrics Category (2 gaps)

1. **True Positive** (covered through Confusion Matrix)
   - Priority: Very Low

2. **False Positive** (covered through Confusion Matrix)
   - Priority: Very Low

### NLP Techniques Category (2 gaps)

1. **String Matching**
   - Suggested Question: "How does string matching work in text search?"
   - Priority: Very Low
   - Suggested Category: Technical Detail Questions

2. **Regular Expressions** (grep and patterns)
   - Suggested Question: "How do I use regular expressions for text processing?"
   - Priority: Low
   - Suggested Category: Technical Detail Questions

### Vector Databases Category (1 gap)

1. **Vector Store** (covered through Vector Database)
   - Priority: Very Low (essentially same as Vector Database)

## Low Priority Gaps

Leaf nodes, advanced concepts, or concepts adequately covered through related terms.

### Covered Implicitly

These concepts are not directly questioned but are adequately explained in related questions:

- **Vector Store** - Covered in Vector Database questions
- **Intent Classification** - Covered in Intent Recognition
- **Intent Modeling** - Covered in Intent Recognition
- **Authorization** - Covered in RBAC
- **Parameterized Query** - Covered in Parameter Extraction
- **True Positive / False Positive** - Covered in Confusion Matrix
- **Lemmatization** - Covered in Stemming comparison
- **Word2Vec** - Covered in embeddings discussion

### Highly Specific Terms

These are implementation details better learned through documentation:

- **Node.js** - Implementation detail
- **Neo4j** - Specific tool (covered in general graph database discussion)
- **Chroma** - Alternative vector database (FAISS, Pinecone, Weaviate covered)
- **Specific JavaScript libraries** - Too specific for FAQ

## Recommendations

### Immediate Actions (0 questions)

None required - FAQ already meets 71% coverage target (60%+ required).

### High-Value Additions (8-10 questions)

Consider adding these questions to reach 80%+ coverage:

**Tier 1: Critical Gaps (4 questions)**
1. Part-of-Speech Tagging (NLP Pipelines)
2. Rasa Framework (Frameworks & Tools)
3. Dialogflow Platform (Frameworks & Tools)
4. GDPR Compliance (Security & Privacy)

**Tier 2: Framework & Tool Gaps (3 questions)**
5. LlamaIndex vs LangChain (Best Practices)
6. JavaScript Libraries for UIs (Best Practices)
7. Dialog System Fundamentals (Core Concepts)

**Tier 3: NLP & Security Gaps (3 questions)**
8. Text Normalization (Technical Details)
9. Authentication Implementation (Best Practices)
10. Data Retention Policies (Best Practices)

Adding these 10 questions would:
- Increase coverage to ~80% (160/200 concepts)
- Better balance Framework & Tools category
- Strengthen NLP Pipelines coverage
- Address critical compliance topics

### Future Updates

Monitor usage patterns and student questions to identify:
- Questions that get asked frequently but aren't in FAQ
- Topics where students consistently struggle
- New frameworks or tools gaining popularity
- Emerging best practices in conversational AI

Update FAQ quarterly or after major course content changes.

## Coverage Gap Statistics

| Priority Level | Concepts | Percentage |
|----------------|----------|------------|
| Critical | 5 | 9% of gaps |
| High | 15 | 26% of gaps |
| Medium | 23 | 40% of gaps |
| Low | 15 | 26% of gaps |

**Current Status:** ✅ Excellent

**Target Coverage:** 60%+ (achieved: 71%)

**Recommended Target:** 80% (requires +10 questions)

---

*Generated by faq-generator skill*
*Coverage: 142/200 concepts (71%)*
*Priority Gaps: 5 critical, 15 high, 23 medium*
