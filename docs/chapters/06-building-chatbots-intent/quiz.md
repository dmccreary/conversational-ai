# Chapter 6 Quiz: Building Chatbots and Intent Recognition

Test your understanding of chatbot development and intent recognition covered in this chapter.

---

## Question 1

<div class="upper-alpha" markdown>

What is a chatbot?

1. A human customer service representative
2. An automated conversational agent that interacts with users through text or voice
3. A web browser extension
4. A type of search engine

??? question "Show Answer"
    The correct answer is **B**.

    A [chatbot](index.md#chatbot) is an automated conversational agent designed to interact with users through text or voice interfaces. Modern chatbots can range from simple rule-based systems to sophisticated AI-powered assistants. Option A describes human agents, option C describes browser tools, and option D describes search engines.

</div>

---

## Question 2

<div class="upper-alpha" markdown>

What is intent recognition?

1. The process of identifying a user's goal or purpose from their input
2. The process of encrypting messages
3. The process of storing chat history
4. The process of translating between languages

??? question "Show Answer"
    The correct answer is **A**.

    [Intent recognition](index.md#intent-recognition) is the process of identifying what the user is trying to accomplish from their message. For example, recognizing that "I need to reset my password" expresses a password-reset intent. This is fundamental to routing users to appropriate responses or actions. Options B, C, and D describe different system capabilities.

</div>

---

## Question 3

<div class="upper-alpha" markdown>

What is entity extraction?

1. Deleting unnecessary data
2. Identifying and extracting specific pieces of information from user input
3. Compressing chat logs
4. Backing up the database

??? question "Show Answer"
    The correct answer is **B**.

    [Entity extraction](index.md#entity-extraction) is the process of identifying and extracting specific pieces of information (entities) from user input. For example, extracting "tomorrow" as a date entity and "New York" as a location entity from "Book me a flight to New York tomorrow." This extracted information can then be used to fulfill the user's request. Options A, C, and D describe different operations.

</div>

---

## Question 4

<div class="upper-alpha" markdown>

What is user intent in the context of chatbots?

1. The user's email address
2. The underlying goal or purpose the user wants to achieve
3. The user's location
4. The user's device type

??? question "Show Answer"
    The correct answer is **B**.

    [User intent](index.md#user-intent) represents the underlying goal or purpose the user wants to achieve through their interaction with the chatbot. Understanding intent allows the chatbot to provide appropriate responses and actions. Options A, C, and D are metadata about the user but not their conversational intent.

</div>

---

## Question 5

<div class="upper-alpha" markdown>

What is FAQ analysis in chatbot development?

1. Creating frequently asked questions for users to read
2. Analyzing existing FAQ documents to train chatbot responses
3. Deleting old questions from the database
4. Testing the chatbot's speed

??? question "Show Answer"
    The correct answer is **B**.

    [FAQ analysis](index.md#faq-analysis) involves analyzing existing FAQ documents and customer service interactions to identify common questions and their answers. This analysis helps train the chatbot to recognize similar questions and provide appropriate responses. Option A is about creating FAQs, option C is about maintenance, and option D is about performance testing.

</div>

---

## Question 6

<div class="upper-alpha" markdown>

Which of the following is an example of an entity in the sentence "Book a table for 4 people at 7pm"?

1. The word "Book"
2. The number "4" (party size) and "7pm" (time)
3. The sentence structure
4. The punctuation

??? question "Show Answer"
    The correct answer is **B**.

    In [entity extraction](index.md#entity-extraction), "4" (party size) and "7pm" (time) are entities - specific pieces of information that the chatbot needs to extract to fulfill the reservation request. The verb "Book" (option A) relates more to intent recognition, while sentence structure (option C) and punctuation (option D) are linguistic features but not entities.

</div>

---

## Question 7

<div class="upper-alpha" markdown>

Why is intent recognition important for chatbots?

1. It makes the chatbot faster
2. It allows the chatbot to understand what the user wants and route them appropriately
3. It reduces storage costs
4. It improves font rendering

??? question "Show Answer"
    The correct answer is **B**.

    [Intent recognition](index.md#intent-recognition) is crucial because it allows the chatbot to understand what the user wants to accomplish and route them to the appropriate response, action, or human agent. Without accurate intent recognition, the chatbot cannot provide relevant assistance. Option A is not the primary benefit, option C is unrelated, and option D is irrelevant.

</div>

---

## Question 8

<div class="upper-alpha" markdown>

What is the relationship between intent and entities?

1. They are the same thing
2. Intent is the "what" (goal) and entities are the "details" (specific information)
3. Entities determine intent
4. There is no relationship

??? question "Show Answer"
    The correct answer is **B**.

    [Intent](index.md#user-intent) represents what the user wants to accomplish (the goal), while [entities](index.md#entity-extraction) are the specific pieces of information needed to fulfill that intent. For example, intent might be "book_flight" while entities would be departure city, destination, and date. Option A is incorrect as they're distinct concepts, option C reverses the relationship, and option D is false.

</div>

---

## Question 9

<div class="upper-alpha" markdown>

In a customer service chatbot, which question would likely trigger a "password_reset" intent?

1. "What are your business hours?"
2. "I can't log into my account"
3. "How much does shipping cost?"
4. "Where is my order?"

??? question "Show Answer"
    The correct answer is **B**.

    The statement "I can't log into my account" would likely trigger a password_reset [intent](index.md#intent-recognition) as it indicates authentication problems. The chatbot should recognize this intent and guide the user through password recovery. Options A, C, and D would trigger different intents related to business information, shipping, and order tracking respectively.

</div>

---

## Question 10

<div class="upper-alpha" markdown>

What makes modern chatbots more effective than simple rule-based systems?

1. They are cheaper to build
2. They use AI to understand natural language variations and context
3. They require no training data
4. They only work with exact phrase matches

??? question "Show Answer"
    The correct answer is **B**.

    Modern AI-powered [chatbots](index.md#chatbot) use natural language understanding to recognize intents and entities even when users express themselves in different ways. They can handle variations, typos, and context, unlike simple rule-based systems that only match exact patterns. Option A is often false (AI chatbots can be expensive), option C is incorrect (they need training data), and option D describes the limitation they overcome.

</div>
