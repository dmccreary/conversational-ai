# References

This textbook draws upon the following high-quality resources curated for college-level students studying Conversational AI:

## AI Capability Increases

[Measuring AI Ability to Complete Long Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) - March 19 2025 - METR Blog.
This chart and paper give convincing evidence that the length of tasks that AI can complete with 50% probability of correctness is doubling every seven months.  This has been consistent since GPT-2 in 2019.  In a few years, you will be able to generate an entire college-level textbook complete with complex charts, diagrams and simulations in a few hours.  This is a wake call for educators around the world!

## Foundational AI and Large Language Models

1. [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - 2017-06-12 - arXiv - Seminal paper by Vaswani et al. introducing the Transformer architecture that revolutionized natural language processing and forms the foundation for modern large language models like GPT and BERT.  If you had to pick one paper that transformed the field of text generation, this is the paper to read.

2. [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805) - 2018-10-11 - arXiv - Google AI's breakthrough paper introducing bidirectional pre-training for language understanding, demonstrating how models can jointly condition on both left and right context in all layers.  BERT was very influential in my career.  I spent over two years at a Fortune 50 healthcare company building custom BERT LLMs that were fine-tuned on clinical terminology.  Although BERT is not used in most commercial systems today, it was very influential is guiding today's industry.

3. [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) - 2020-05-28 - arXiv - The GPT-3 paper by OpenAI demonstrating that scaling language models to 175 billion parameters enables few-shot learning without gradient updates or fine-tuning.

4. [Deep Learning](https://www.deeplearningbook.org/) - 2016-11-18 - MIT Press - Comprehensive textbook by Goodfellow, Bengio, and Courville covering mathematical foundations, deep learning techniques, and research perspectives essential for understanding modern AI systems.

5. [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781) - 2013-01-16 - arXiv - Mikolov et al.'s Word2Vec paper introducing continuous vector representations of words that capture semantic relationships and laid groundwork for modern embeddings.

6. [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - 2018-06-27 - Jay Alammar's Blog - Visual guide breaking down the Transformer architecture through intuitive diagrams, used in ML courses at Stanford, MIT, Harvard, and other top universities.

7. [A Survey of Large Language Models](https://arxiv.org/abs/2303.18223) - 2023-03-31 - arXiv - Comprehensive survey by Zhao et al. reviewing LLM evolution from statistical to neural language models, covering pre-training techniques, model families, and evaluation methods.

8. [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685) - 2021-06-17 - arXiv - Paper introducing parameter-efficient fine-tuning that reduces trainable parameters by 10,000x while maintaining performance, enabling practical customization of large models.

## Search Technologies and Natural Language Processing

9. [Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/pdf/irbookonlinereading.pdf) - 2009-04-01 - Cambridge University Press - Authoritative textbook by Manning, Raghavan, and Schütze covering search fundamentals including TF-IDF, Boolean retrieval, vector space models, and PageRank algorithms essential for understanding chatbot search.

10. [Speech and Language Processing](https://web.stanford.edu/~jurafsky/slp3/) - 2025-08-24 - Stanford University - Comprehensive NLP textbook by Jurafsky and Martin, now in its 3rd edition with extensive coverage of language models, tokenization, intent modeling, and neural approaches used in conversational AI.

11. [Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks](https://arxiv.org/abs/1908.10084) - 2019-08-27 - arXiv - Reimers and Gurevych's modification of BERT using siamese networks to derive semantically meaningful sentence embeddings, reducing similarity search time from 65 hours to 5 seconds.

12. [Faiss: A Library for Efficient Similarity Search](https://engineering.fb.com/2017/03/29/data-infrastructure/faiss-a-library-for-efficient-similarity-search/) - 2017-03-29 - Meta Engineering Blog - Introduction to Facebook AI's open-source library for billion-scale vector similarity search, demonstrating practical implementation of efficient nearest-neighbor algorithms for embeddings.

13. [Dense Passage Retrieval for Open-Domain Question Answering](https://arxiv.org/abs/2004.04906) - 2020-04-10 - arXiv - Facebook AI paper showing that dense vector representations outperform traditional BM25 search by 9-19% for passage retrieval, establishing foundations for modern RAG systems.

14. [The PageRank Citation Ranking: Bringing Order to the Web](http://ilpubs.stanford.edu:8090/422/) - 1998-01-29 - Stanford InfoLab - Original Stanford paper by Page and Brin introducing the PageRank algorithm that made Google-scale search possible, demonstrating graph-based ranking essential for understanding search performance.

15. [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781) - 2013-01-16 - arXiv - Foundational Word2Vec paper introducing continuous bag-of-words and skip-gram models for learning distributed word representations efficiently from large datasets.

## RAG, GraphRAG, and Knowledge Graphs

16. [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) - 2020-05-22 - arXiv - Lewis et al.'s paper introducing RAG architecture combining parametric (LLM) and non-parametric (vector store) memory, the foundation for most production chatbots today.

17. [GraphRAG: Unlocking LLM Discovery on Narrative Private Data](https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/) - 2024-02-13 - Microsoft Research Blog - Introduction to GraphRAG approach using LLM-generated knowledge graphs with hierarchical clustering to improve retrieval beyond traditional vector search for complex queries.

18. [Knowledge Graph Refinement: A Survey of Approaches and Evaluation Methods](https://www.semantic-web-journal.net/content/knowledge-graph-refinement-survey-approaches-and-evaluation-methods) - 2017-01-01 - Semantic Web Journal - Paulheim's comprehensive survey of knowledge graph construction and refinement methods, covering entity extraction, relationship inference, and error detection techniques.

19. [Neo4j Cypher Manual](https://neo4j.com/docs/cypher-manual/current/introduction/) - 2024-01-01 - Neo4j Documentation - Official documentation for Cypher, the declarative graph query language used to interact with Neo4j databases, essential for implementing GraphRAG patterns.

20. [Vector Database Comparison: Pinecone vs Weaviate vs Milvus vs Chroma](https://medium.com/tech-ai-made-easy/vector-database-comparison-pinecone-vs-weaviate-vs-qdrant-vs-faiss-vs-milvus-vs-chroma-2025-15bf152f891d) - 2025-01-15 - Medium - Comprehensive comparison of vector database platforms covering scalability, performance, deployment options, and cost considerations for production chatbot systems.

## Evaluation, Metrics, and Quality Assessment

21. [SQuAD: 100,000+ Questions for Machine Comprehension of Text](https://arxiv.org/abs/1606.05250) - 2016-06-16 - arXiv - Stanford's reading comprehension dataset with 100,000+ question-answer pairs serving as a benchmark for evaluating question-answering systems and chatbot comprehension abilities.

22. [Classification: Accuracy, Recall, Precision, and Related Metrics](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) - 2024-01-01 - Google Machine Learning - Comprehensive guide explaining precision, recall, F1 score, and their applications in evaluating search quality and chatbot response accuracy.

23. [Metrics of Success: Evaluating User Satisfaction in AI Chatbots](https://dl.acm.org/doi/10.1145/3704137.3704182) - 2024-01-01 - ACM Digital Library - Recent research examining chatbot evaluation metrics including CSAT, NPS, and multi-dimensional satisfaction frameworks for production systems.

24. [Survey on Evaluation Methods for Dialogue Systems](https://link.springer.com/article/10.1007/s10462-020-09866-x) - 2021-01-01 - Artificial Intelligence Review - Comprehensive survey of dialogue system evaluation methods covering both automatic metrics and human evaluation approaches for conversational AI.

## Production Systems, Security, and Ethics

25. [ACM Code of Ethics and Professional Conduct](https://www.acm.org/code-of-ethics) - 2018-06-22 - ACM - Professional ethics guidelines covering privacy, security, transparency, and responsible AI development essential for building production chatbot systems.

26. [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) - 2024-01-01 - OpenAI Documentation - Official best practices for crafting effective prompts including clear instructions, few-shot learning, and systematic testing strategies for LLM-based applications.

27. [Build an LLM RAG Chatbot with LangChain](https://realpython.com/build-llm-rag-chatbot-with-langchain/) - 2024-01-01 - Real Python - Comprehensive tutorial demonstrating practical implementation of RAG chatbots using LangChain framework, covering indexing, retrieval, and generation patterns.

28. [Named Entity Recognition using spaCy](https://spacy.io/usage/spacy-101) - 2024-01-01 - spaCy Documentation - Guide to implementing NER for entity extraction from conversations, essential for building knowledge graphs and understanding user queries.

29. [Software-Based Dialogue Systems: Survey, Taxonomy, and Challenges](https://dl.acm.org/doi/10.1145/3527450) - 2022-01-01 - ACM Computing Surveys - Systematic literature review covering evolution of dialogue systems from rule-based approaches to modern neural architectures, including task-oriented and open-domain systems.

30. [Chatbot Frameworks Comparison: Rasa vs Dialogflow vs Microsoft Bot Framework](https://rootstack.com/en/blog/rasa-vs-dialogflow-vs-microsoft-bot-framework-which-chatbot-platform-best-fits-your) - 2024-01-01 - Rootstack Blog - Industry comparison of major chatbot frameworks covering features, deployment options, customization capabilities, and use case recommendations for production systems.

---

## Related Intelligent Textbooks

### Textbooks on Intelligent Textbooks

Here is an intelligent textbooks on the topic of intelligent textbooks:

[Intelligent Textbooks](https://dmccreary.github.io/intelligent-textbooks)

You can find examples of over 40 other related Intelligent Textbooks here:

[Intelligent Textbook Case Studies](https://dmccreary.github.io/intelligent-textbooks/case-studies/)

The [Claude Skills for Building Intelligent Textbooks](https://dmccreary.github.io/claude-skills/) and the textbook on [Learning Graphs](https://dmccreary.github.io/learning-graphs/) are especially useful for anyone that would like to customize this textbook for your own classroom.

For readers not familiar with Graphs, these two intelligent textbooks are relevant.

1. [Graph Algorithms](https://dmccreary.github.io/graph-algorithms/)
2. [Graph Data Modeling](https://dmccreary.github.io/graph-data-modeling-course/)

## References for the Book Building Tools

1. **mkdocs** - [https://www.mkdocs.org/](https://www.mkdocs.org/) - this is our tool for building the website.  It converts Markdown into HTML in the ```site``` directory.
2. **mkdocs material theme** - [https://squidfunk.github.io/mkdocs-material/](https://squidfunk.github.io/mkdocs-material/) - this is the theme for our site.  The theme adds the user interface elements that give our site the look and feel.  It also has the features such as social cards.
3. **GitHub Pages** - [https://pages.github.com/](https://pages.github.com/) - this is the free tool for hosting public websites created by mkdocs
4. **Markdown** - [https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) - this is the format we use for text.  It allows us to have headers, lists, tables, links and images without learning HTML.
5. **Deploy Mkdocs GitHub Action** - [https://github.com/marketplace/actions/deploy-mkdocs](https://github.com/marketplace/actions/deploy-mkdocs) - this is the tool we use to automatically build our site after edits are checked in with Git.
6. **Git Book** - [https://git-scm.com/book/en/v2](https://git-scm.com/book/en/v2) - a useful book on Git.  Just read the first two chapters to learn how to check in new code.
7. **Conda** - [https://conda.io/](https://conda.io/) - this is a command line tool that keeps our Python libraries organized for each project.
8. **VS Code** - [https://code.visualstudio.com/](https://code.visualstudio.com/) - this is the integrated development environment we use to mange the files on our website.
9. **Markdown Paste** - [https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image](https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image) - this is the VS code extension we use to make sure we keep the markdown format generated by ChatGPT.

---

## Dan's Personal Favorites

1. [Five Levels of Intelligent Textbooks](https://medium.com/@dmccreary/five-levels-of-intelligent-textbooks-b81a4c1525a0) - Nov 19, 2024 - Dan McCreary's Personal Blog on Medium.  This is the article I wrote when I first started to use the five-level model for intelligent textbooks.  It is critical because it shows the great divide between 2.99 level books and 3.0 level books where student data needs to be protected and costs go up dramatically.  This is why this textbook does not store any student-specific data.

1. [Using GenAI to Create Learning Graphs: Data Structures for Hyper-Personalized Lesson Plans](https://medium.com/@dmccreary/using-genai-to-create-learning-graphs-fbfe8bcf1eb1) - Oct 16, 2024 - Dan McCreary's Personal Blog on Medium.  This is a good five minute intro to Learning Graphs.

1. [Micro-Simulations for Education: An interview with Valerie Lockhart of Code Savvy](https://medium.com/@dmccreary/micro-simulations-for-education-6989eae8d85d) - Nov 4, 2023 - Dan McCreary's Personal Blog on Medium.  This was the first time we used the term "MicroSim".  All credit to Valerie for her insight that combining processing with generative AI would transform education!

1. [ChatGPT Brings us Closer to the Diamond Age: Personalized Learning Agents are Just Years Away](https://medium.com/@dmccreary/chatgpt-brings-us-closer-to-the-diamond-age-b1469bee4949) - Jan 30, 2023 - Dan McCreary's Personal Blog on Medium.  This is the story behind what inspired me to try to visualize how an intelligent textbook would work.  This is something I have been thinking about since 1995 when Diamond Age was published.

1. [Showing Bias in BERT: How we can easily show occupation-gender bias using the Hugging Face website](https://dmccreary.medium.com/showing-bias-in-bert-475e98dabf51) - Feb 25, 2022 - Dan McCreary's Personal Blog on Medium.  Are LLMs biased?  You bet they are! This blog was the basis for a class I taught on detecting and correcting for bias in LLMs.

1. [The Learning-Knowledge-Language Innovation Hot Zone](https://medium.com/@dmccreary/the-learning-knowledge-language-innovation-hot-zone-1a7d2b471889) - Aug 23, 2021 - Dan McCreary's Personal Blog on Medium.  A good summary of why the LKL Innovation Hot Zone needs focus.

1. [Grading GPT-3 For STEM Lesson Plan Content Generation](https://medium.com/data-science/grading-gpt-3-for-stem-lesson-plan-content-generation-c8d9d1f59806) - Jan 24, 2021 - Dan McCreary's Personal Blog on Medium.  My first attempt to score LLMs on their ability to generate educational content.  Generating good multiple choice questions was REALLY hard back in early 2021.  Now we have a Claude Skill that totally rocks and generating high-quality multiple-choice questions.

2. [Grounding LLMs: The Knowledge Graph foundation every AI project needs](https://medium.com/@alessandro-negro/grounding-llms-the-knowledge-graph-foundation-every-ai-project-needs-1eef81e866ec) - Nov 6, 2025 - by Alessandro Negro.  If you wonder why all our intelligent textbooks are built around a graph, this is a good place to start.  Alessandro is the Chief Scientist at GraphAware and author of the books Graph-Powered Machine Learning (Manning, 2021) and Knowledge Graphs and LLMs in Action (Manning, 2025).  He and I are both Manning authors.


## Additional Resources

For readers interested in deeper exploration of conversational AI topics, the following supplementary resources are recommended:

### Online Courses and Tutorials
- **LangChain Documentation** - Comprehensive guides for building production RAG systems
- **Neo4j GraphAcademy** - Free courses on graph databases and Cypher query language
- **Hugging Face Transformers** - Tutorials and pre-trained models for NLP tasks

### Communities and Forums
- **r/LanguageTechnology** - Reddit community for NLP discussions
- **Papers With Code** - Benchmark datasets and model implementations
- **AI Alignment Forum** - Discussions on responsible AI development

### Research Venues
- **NeurIPS** (Neural Information Processing Systems) - Premier AI/ML conference
- **ACL** (Association for Computational Linguistics) - Leading NLP conference
- **EMNLP** (Empirical Methods in Natural Language Processing) - Applied NLP research

---

*References last updated: 2025-11-16*

*Note: This reference list includes 30 college-level resources mixing peer-reviewed papers (60%), authoritative textbooks, official documentation, and high-quality technical articles. URLs were verified where possible, though some sites restrict automated access while remaining publicly available through web browsers.*
