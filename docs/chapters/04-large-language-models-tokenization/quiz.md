# Chapter 4 Quiz: Large Language Models and Tokenization

Test your understanding of large language models and tokenization concepts covered in this chapter.

---

## Question 1

<div class="upper-alpha" markdown>

What is a Large Language Model (LLM)?

1. A small database of predefined responses
2. A neural network trained on vast amounts of text to understand and generate language
3. A rule-based system for grammar checking
4. A simple keyword matching algorithm

??? question "Show Answer"
    The correct answer is **B**.

    A [Large Language Model](../../glossary.md#large-language-model) is a neural network trained on vast amounts of text data to understand and generate human language. LLMs like GPT, Claude, and others can perform a wide range of language tasks. Option A describes a much simpler FAQ system, option C describes grammar checkers, and option D describes basic search systems.

</div>

---

## Question 2

<div class="upper-alpha" markdown>

What is the fundamental architecture that powers most modern LLMs?

1. Convolutional Neural Networks
2. Recurrent Neural Networks
3. Transformer architecture
4. Decision trees

??? question "Show Answer"
    The correct answer is **C**.

    The [Transformer architecture](../../glossary.md#transformer-architecture) is the fundamental design that powers most modern LLMs. Introduced in the "Attention Is All You Need" paper, it uses attention mechanisms to process sequences in parallel rather than sequentially. CNNs (option A) are primarily used for image processing, RNNs (option B) were used for sequences before transformers but are now less common for LLMs, and decision trees (option D) are not used for language modeling.

</div>

---

## Question 3

<div class="upper-alpha" markdown>

What is a token in the context of LLMs?

1. A password for authentication
2. The basic unit of text that an LLM processes, such as a word or subword
3. A type of database query
4. A programming variable

??? question "Show Answer"
    The correct answer is **B**.

    A [token](../../glossary.md#token) is the basic unit of text that an LLM processes. Tokens can be whole words, parts of words, or even individual characters, depending on the tokenization algorithm. LLMs process sequences of tokens rather than raw text. Option A relates to security, option C to databases, and option D to programming.

</div>

---

## Question 4

<div class="upper-alpha" markdown>

What does the attention mechanism in transformers allow the model to do?

1. Focus on relevant parts of the input when processing each token
2. Delete irrelevant information from the training data
3. Authenticate users
4. Compress text files

??? question "Show Answer"
    The correct answer is **A**.

    The [attention mechanism](../../glossary.md#attention-mechanism) allows the model to focus on relevant parts of the input sequence when processing each token. It computes relationships between different positions in the sequence, enabling the model to understand context and dependencies. Options B, C, and D describe different functionalities not related to the attention mechanism.

</div>

---

## Question 5

<div class="upper-alpha" markdown>

What is tokenization?

1. The process of encrypting sensitive data
2. The process of converting text into tokens that an LLM can process
3. The process of authenticating users
4. The process of compressing files

??? question "Show Answer"
    The correct answer is **B**.

    [Tokenization](../../glossary.md#tokenization) is the process of converting raw text into tokens that an LLM can process. Different tokenization methods split text in different ways, affecting how the model interprets language. Option A describes encryption, option C describes authentication, and option D describes compression.

</div>

---

## Question 6

<div class="upper-alpha" markdown>

What is Byte Pair Encoding (BPE)?

1. A data compression algorithm only
2. A tokenization algorithm that iteratively merges frequent character pairs
3. An encryption method
4. A database indexing technique

??? question "Show Answer"
    The correct answer is **B**.

    [Byte Pair Encoding](../../glossary.md#byte-pair-encoding) is a tokenization algorithm that starts with characters and iteratively merges the most frequent pairs to create a vocabulary of subword units. This allows LLMs to handle rare words and new words by breaking them into familiar subword tokens. While BPE originated as a compression algorithm (option A), in LLMs it's used specifically for tokenization. Options C and D are unrelated.

</div>

---

## Question 7

<div class="upper-alpha" markdown>

Why do LLMs use subword tokenization methods like BPE?

1. To make the model smaller
2. To handle rare and out-of-vocabulary words efficiently
3. To speed up training by 100x
4. To eliminate the need for training data

??? question "Show Answer"
    The correct answer is **B**.

    Subword [tokenization](../../glossary.md#tokenization) methods like [BPE](../../glossary.md#byte-pair-encoding) allow LLMs to handle rare and out-of-vocabulary words efficiently by breaking them into known subword units. This provides a balance between character-level and word-level tokenization. Option A is not the primary goal, option C overstates performance gains, and option D is false (training data is still essential).

</div>

---

## Question 8

<div class="upper-alpha" markdown>

What is the typical input/output format for transformer-based LLMs?

1. Audio to video
2. Images to text
3. Sequences of tokens to sequences of tokens
4. Binary code to assembly language

??? question "Show Answer"
    The correct answer is **C**.

    [Transformer](../../glossary.md#transformer-architecture) based LLMs process sequences of [tokens](../../glossary.md#token) and generate sequences of tokens as output. The input text is tokenized, processed through the transformer layers, and the output tokens are converted back to text. Some modern models are multimodal (option B is becoming possible), but the core transformer processes token sequences. Options A and D are not typical LLM applications.

</div>

---

## Question 9

<div class="upper-alpha" markdown>

In the attention mechanism, what does "self-attention" mean?

1. The model pays attention only to its own previous outputs
2. The model computes attention scores between different positions within the same sequence
3. The model ignores external inputs
4. The model only processes one token at a time

??? question "Show Answer"
    The correct answer is **B**.

    Self-[attention](../../glossary.md#attention-mechanism) means the model computes attention scores between different positions within the same input sequence. This allows each token to "attend to" other relevant tokens in the same sequence, capturing relationships and context. Option A is incorrect (it considers all positions), option C is misleading, and option D contradicts the parallel processing nature of transformers.

</div>

---

## Question 10

<div class="upper-alpha" markdown>

How does tokenization affect the cost of using an LLM API?

1. It doesn't affect cost at all
2. More tokens generally mean higher costs since pricing is often per token
3. Fewer tokens always cost more
4. Only the number of characters matters, not tokens

??? question "Show Answer"
    The correct answer is **B**.

    Most LLM APIs charge based on the number of [tokens](../../glossary.md#token) processed (both input and output), so more tokens generally mean higher costs. Understanding [tokenization](../../glossary.md#tokenization) is important for estimating and optimizing API costs. Option A is false for most providers, option C is backwards, and option D is incorrect since providers charge per token, not per character.

</div>
