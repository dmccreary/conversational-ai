# Chapter 11 Quiz: NLP Pipelines and Processing

Test your understanding of NLP pipelines and text processing concepts covered in this chapter.

---

## Question 1

<div class="upper-alpha" markdown>

What is an NLP pipeline?

1. A physical pipe for data transfer
2. A sequence of processing steps that transform raw text into structured information
3. A database query optimizer
4. A network routing protocol

??? question "Show Answer"
    The correct answer is **B**.

    An [NLP pipeline](../../glossary.md#nlp-pipeline) is a sequence of processing steps that transform raw text into structured information. Each step performs a specific task like tokenization, part-of-speech tagging, or entity recognition. Option A describes physical infrastructure, option C describes database optimization, and option D describes networking.

</div>

---

## Question 2

<div class="upper-alpha" markdown>

What is text preprocessing?

1. Writing text before processing
2. The initial cleaning and normalization of raw text before analysis
3. Printing text on paper
4. Encrypting text data

??? question "Show Answer"
    The correct answer is **B**.

    [Text preprocessing](../../glossary.md#text-preprocessing) is the initial step of cleaning and normalizing raw text before analysis. This includes removing unwanted characters, converting to lowercase, handling whitespace, and other normalization tasks to prepare text for further NLP processing. Options A, C, and D describe different activities unrelated to text preparation.

</div>

---

## Question 3

<div class="upper-alpha" markdown>

What is tokenization in NLP?

1. User authentication with tokens
2. The process of breaking text into smaller units like words or sentences
3. Cryptocurrency transactions
4. Database indexing

??? question "Show Answer"
    The correct answer is **B**.

    [Tokenization](../../glossary.md#tokenization) in NLP is the process of breaking text into smaller units (tokens) such as words, sentences, or subwords. This is typically the first step in an NLP pipeline after preprocessing. Option A describes security tokens, option C describes blockchain, and option D describes database optimization.

</div>

---

## Question 4

<div class="upper-alpha" markdown>

What is stemming?

1. The process of reducing words to their root or base form
2. Creating flowcharts
3. Organizing files in folders
4. Compressing images

??? question "Show Answer"
    The correct answer is **A**.

    [Stemming](../../glossary.md#stemming) is the process of reducing words to their root or base form by removing suffixes. For example, "running," "runs," and "ran" might all be reduced to "run." This helps treat different forms of the same word as equivalent. Options B, C, and D describe unrelated activities.

</div>

---

## Question 5

<div class="upper-alpha" markdown>

What is lemmatization?

1. Creating lists of items
2. The process of reducing words to their dictionary base form using linguistic rules
3. Sorting data alphabetically
4. Backing up databases

??? question "Show Answer"
    The correct answer is **B**.

    [Lemmatization](../../glossary.md#lemmatization) is the process of reducing words to their dictionary base form (lemma) using vocabulary and linguistic rules. Unlike stemming, lemmatization produces actual words. For example, "better" would be lemmatized to "good." Options A, C, and D describe different operations.

</div>

---

## Question 6

<div class="upper-alpha" markdown>

What is Part-of-Speech (POS) tagging?

1. Marking posts in a social media feed
2. The process of identifying the grammatical role of each word in a sentence
3. Tagging images with metadata
4. Creating hashtags for content

??? question "Show Answer"
    The correct answer is **B**.

    [Part-of-Speech tagging](../../glossary.md#part-of-speech-tagging) is the process of identifying the grammatical role of each word in a sentence (noun, verb, adjective, etc.). This linguistic information is valuable for many NLP tasks like parsing and entity recognition. Option A describes social media, option C describes image metadata, and option D describes hashtags.

</div>

---

## Question 7

<div class="upper-alpha" markdown>

What is the main difference between stemming and lemmatization?

1. Stemming is faster but less accurate; lemmatization uses linguistic knowledge for better results
2. They are exactly the same
3. Stemming only works with English
4. Lemmatization is always faster

??? question "Show Answer"
    The correct answer is **A**.

    [Stemming](../../glossary.md#stemming) is typically faster but cruder, using simple rules to chop off word endings. [Lemmatization](../../glossary.md#lemmatization) uses vocabulary and morphological analysis to produce actual dictionary words, making it more accurate but computationally expensive. Option B is false, option C is incorrect (stemming works with many languages), and option D is backwards.

</div>

---

## Question 8

<div class="upper-alpha" markdown>

Which preprocessing step would convert "The QUICK Brown Fox" to "the quick brown fox"?

1. Tokenization
2. Stemming
3. Case normalization (lowercasing)
4. Lemmatization

??? question "Show Answer"
    The correct answer is **C**.

    Case normalization, specifically lowercasing, is a [text preprocessing](../../glossary.md#text-preprocessing) step that converts all text to lowercase, making "The QUICK Brown Fox" become "the quick brown fox." This helps treat the same words in different cases as identical. Tokenization (option A) splits text, stemming (option B) reduces to stems, and lemmatization (option D) reduces to lemmas.

</div>

---

## Question 9

<div class="upper-alpha" markdown>

Why is tokenization an important first step in NLP pipelines?

1. It encrypts the data
2. It breaks text into manageable units that can be processed individually
3. It translates text to another language
4. It compresses the text

??? question "Show Answer"
    The correct answer is **B**.

    [Tokenization](../../glossary.md#tokenization) is crucial because it breaks text into manageable units (tokens) that can be processed individually by subsequent steps in the [NLP pipeline](../../glossary.md#nlp-pipeline). Most NLP algorithms operate on tokens rather than raw text. Option A describes encryption, option C describes translation, and option D describes compression.

</div>

---

## Question 10

<div class="upper-alpha" markdown>

In an NLP pipeline for a chatbot, which processing step would typically come first?

1. Part-of-speech tagging
2. Entity recognition
3. Text preprocessing and tokenization
4. Sentiment analysis

??? question "Show Answer"
    The correct answer is **C**.

    [Text preprocessing](../../glossary.md#text-preprocessing) and [tokenization](../../glossary.md#tokenization) typically come first in an [NLP pipeline](../../glossary.md#nlp-pipeline), as they prepare and structure the raw text for subsequent analysis. Part-of-speech tagging (option A), entity recognition (option B), and sentiment analysis (option D) all depend on having preprocessed and tokenized text.

</div>
