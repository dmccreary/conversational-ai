# Database Queries and Parameter Extraction

## Summary

This chapter teaches how to enable chatbots to execute database queries based on natural language questions, a critical capability for data-driven conversational applications. You will learn about database query fundamentals, SQL query construction, parameter extraction from user questions, query templates and parameterization, natural language to SQL conversion, and slot filling techniques. These skills enable chatbots to answer questions that require accessing structured data from databases.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Database Query
2. SQL Query
3. Query Parameter
4. Parameter Extraction
5. Query Template
6. Parameterized Query
7. Query Execution
8. Query Description
9. Natural Language to SQL
10. Question to Query Mapping
11. Slot Filling

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Building Chatbots and Intent Recognition](../06-building-chatbots-intent/index.md)
- [Chapter 11: NLP Pipelines and Text Processing](../11-nlp-pipelines-processing/index.md)

---

## Introduction to Database-Connected Chatbots

The most valuable chatbots don't just retrieve static documents—they answer questions by querying live databases, providing users with real-time information about sales, inventory, customer records, or system status. When a business analyst asks, "What were our Q4 sales in the Northeast region?" the chatbot must translate this natural language question into a database query, execute it against the appropriate tables, and present the results in a conversational format.

This capability transforms chatbots from simple FAQ systems into powerful data interfaces that democratize access to organizational information. Instead of requiring users to learn SQL or navigate complex business intelligence tools, chatbots enable anyone to ask questions in plain English and receive accurate, data-driven answers. However, building database-connected chatbots introduces significant challenges: understanding user questions, extracting query parameters, constructing safe SQL queries, handling ambiguities, and preventing SQL injection attacks.

In this chapter, you'll learn the architecture and techniques for connecting chatbots to databases, focusing on the critical skill of parameter extraction—identifying the specific values users reference in their questions and mapping them to database query parameters. By mastering these techniques, you'll be able to build conversational interfaces that make organizational data accessible to non-technical users while maintaining security and reliability.

## Understanding Database Queries in Conversational Context

Database queries retrieve, filter, and aggregate data from structured storage systems according to specified criteria. While traditional database applications present users with forms or visual query builders, conversational interfaces must infer query intent and parameters from unstructured natural language, introducing complexity at every stage of the process.

Consider a simple database schema for a sales system:

```sql
CREATE TABLE sales (
    sale_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    region VARCHAR(50),
    sale_date DATE,
    amount DECIMAL(10,2),
    sales_rep VARCHAR(100)
);
```

A business user might ask any of these equivalent questions:

- "What were sales in Q4?"
- "Show me Q4 revenue"
- "How much did we sell last quarter?"
- "Q4 sales total?"

All these questions require the same underlying query structure, but the chatbot must recognize temporal references ("Q4," "last quarter"), understand the implicit date filtering requirement, and distinguish between detailed records (return all rows) versus aggregated totals (return SUM).

The fundamental challenge of database-connected chatbots is **bridging the semantic gap** between how humans ask questions and how databases represent and query data:

| User's Mental Model | Database Reality |
|---------------------|------------------|
| "Last quarter" | WHERE sale_date BETWEEN '2024-10-01' AND '2024-12-31' |
| "Northeast region" | WHERE region IN ('NY', 'MA', 'CT', 'NH', 'VT', 'ME', 'RI') |
| "Top products" | ORDER BY amount DESC LIMIT 10 |
| "Average sale" | SELECT AVG(amount) FROM sales |
| "Sales trend" | GROUP BY MONTH(sale_date) ORDER BY sale_date |

Conversational database queries involve several distinct components:

- **Query intent:** What operation does the user want? (retrieve, aggregate, compare, trend)
- **Target entity:** What table or view contains the relevant data?
- **Filter parameters:** What constraints limit the result set? (date ranges, categories, thresholds)
- **Aggregation:** Should results be summarized or returned as individual records?
- **Presentation:** How should results be formatted for conversational display?

Understanding these components enables systematic approaches to natural language to SQL conversion.

## SQL Query Fundamentals for Chatbot Applications

SQL (Structured Query Language) provides the standard interface for querying relational databases, and chatbot systems must generate valid, safe SQL to retrieve data. While comprehensive SQL instruction lies beyond this chapter's scope, understanding core query patterns enables effective chatbot design.

### Essential SQL Query Patterns

Most chatbot queries fall into a few common patterns:

**1. Simple filtering (WHERE clause):**

```sql
-- User: "Show me sales from the Northeast region"
SELECT * FROM sales
WHERE region = 'Northeast';
```

**2. Date range filtering:**

```sql
-- User: "What were sales in Q4 2024?"
SELECT * FROM sales
WHERE sale_date >= '2024-10-01'
  AND sale_date <= '2024-12-31';
```

**3. Aggregation (COUNT, SUM, AVG):**

```sql
-- User: "What's the total sales for Q4?"
SELECT SUM(amount) as total_sales
FROM sales
WHERE sale_date >= '2024-10-01'
  AND sale_date <= '2024-12-31';
```

**4. Grouping (GROUP BY):**

```sql
-- User: "Show me sales by region"
SELECT region, SUM(amount) as total
FROM sales
GROUP BY region
ORDER BY total DESC;
```

**5. Top-N queries (LIMIT/TOP):**

```sql
-- User: "Who are our top 5 sales reps?"
SELECT sales_rep, SUM(amount) as total_sales
FROM sales
GROUP BY sales_rep
ORDER BY total_sales DESC
LIMIT 5;
```

For chatbot applications, the SQL patterns remain relatively simple—complex joins, subqueries, and window functions rarely appear in natural language questions. The complexity lies in **mapping user questions to the appropriate pattern** and **extracting the correct parameter values**.

Here's a comparison of query complexity levels appropriate for chatbot systems:

| Complexity Level | SQL Features | Example User Question | Chatbot Feasibility |
|-----------------|--------------|----------------------|---------------------|
| Basic | Single table, WHERE clause | "Sales in Northeast" | High - Easy to implement |
| Moderate | Aggregation, GROUP BY | "Total sales by region" | High - Common pattern |
| Advanced | Date functions, HAVING | "Regions above average in Q4" | Medium - Requires calculation |
| Complex | Joins across 2-3 tables | "Products sold by rep in region" | Medium - Need schema knowledge |
| Very Complex | Subqueries, window functions | "Month-over-month growth by category" | Low - Consider pre-built views |

For production chatbot systems, the pragmatic approach limits supported queries to basic and moderate complexity, while providing pre-built reports or dashboard links for complex analytical questions.

## Query Parameters: The Bridge Between Questions and Data

Query parameters are the specific values that constrain database queries, determining which subset of data the query retrieves. In the SQL query `WHERE region = 'Northeast' AND sale_date >= '2024-10-01'`, the parameters are `'Northeast'` and `'2024-10-01'`. Extracting these parameter values from natural language questions represents the central challenge of database-connected chatbots.

Consider how many ways a user might express the same parameter constraints:

**Temporal parameters:**

- "last quarter" → `>= '2024-10-01' AND <= '2024-12-31'`
- "Q4" → same date range
- "October through December" → same date range
- "the past 3 months" → dynamically calculated based on current date
- "last 90 days" → dynamically calculated
- "this year" → `>= '2024-01-01' AND <= '2024-12-31'`

**Geographic parameters:**

- "Northeast" → `= 'Northeast'` or `IN ('NY', 'MA', 'CT', ...)`
- "New England" → `IN ('MA', 'CT', 'NH', 'VT', 'ME', 'RI')`
- "the East Coast" → region mapping required
- "New York" → single state or city (disambiguation needed)

**Categorical parameters:**

- "top products" → `ORDER BY amount DESC LIMIT 10`
- "best performing" → same as above
- "worst sellers" → `ORDER BY amount ASC LIMIT 10`
- "products under $100" → `WHERE price < 100`

Parameter types commonly encountered in chatbot queries include:

| Parameter Type | Examples | Extraction Challenge | Database Mapping |
|---------------|----------|---------------------|------------------|
| Temporal | "last month", "Q3", "2024" | Requires date calculation | Date range WHERE clause |
| Geographic | "Northeast", "California", "EMEA" | Region name normalization | Exact match or IN clause |
| Numeric | "over $1M", "top 10", "above average" | Unit parsing, threshold calc | WHERE/HAVING with operator |
| Categorical | "electronics", "active customers" | Category vocabulary mapping | WHERE category = value |
| Person | "John Smith", "my team" | Name resolution, possessives | WHERE sales_rep = value |
| Comparison | "better than", "compared to" | Requires subquery or join | Complex WHERE clause |

### Parameter Extraction Techniques

Extracting parameters from natural language involves several complementary techniques:

**1. Named Entity Recognition (NER):** Identifying entities like dates, locations, organizations, and numbers

**2. Pattern matching:** Recognizing common phrases like "in [REGION]", "during [TIME]", "over [AMOUNT]"

**3. Dependency parsing:** Understanding grammatical relationships to determine what modifies what

**4. Slot filling:** Maintaining a structured representation of extracted parameter values

**5. Context resolution:** Using conversation history to resolve references like "them," "there," "that quarter"

Let's examine a detailed example of parameter extraction in action:

**User question:** "Show me sales over $10,000 in the Northeast region during Q4 last year"

**Parameter extraction process:**

1. **Temporal:** "Q4 last year" → Calculate Q4 of previous year → `2023-10-01` to `2023-12-31`
2. **Geographic:** "Northeast region" → Map to database region value → `'Northeast'`
3. **Numeric threshold:** "over $10,000" → Extract amount and operator → `> 10000`
4. **Aggregation intent:** "show me sales" → Determine if detail or summary → Individual records

**Resulting parameter set:**

```json
{
  "entity": "sales",
  "filters": {
    "amount": {"operator": ">", "value": 10000},
    "region": {"operator": "=", "value": "Northeast"},
    "sale_date": {
      "operator": "BETWEEN",
      "value": ["2023-10-01", "2023-12-31"]
    }
  },
  "aggregation": null,
  "limit": null
}
```

This structured parameter representation can then be transformed into SQL:

```sql
SELECT * FROM sales
WHERE amount > 10000
  AND region = 'Northeast'
  AND sale_date BETWEEN '2023-10-01' AND '2023-12-31';
```

#### MicroSim: Parameter Extraction Interactive Demo

<details markdown="1">
<summary>Parameter Extraction Interactive Demo</summary>
Type: microsim

Learning objective: Demonstrate how parameter extraction identifies and extracts query constraints from natural language questions, showing the step-by-step process of recognizing entities, temporal expressions, and numeric values

Canvas layout (1000x700px):
- Top section (1000x150): Input area
  - Text input for natural language question
  - "Extract Parameters" button
  - Pre-loaded example questions dropdown
- Middle section (1000x400): Two-column display
  - Left column (480x400): NL question with highlighted entities
  - Right column (480x400): Extracted parameters as JSON structure
- Bottom section (1000x150): SQL preview panel

Visual elements:
- Question text with color-coded entity highlighting:
  - Blue: Temporal expressions
  - Green: Geographic entities
  - Orange: Numeric values
  - Purple: Categorical filters
- JSON parameter tree with expandable nodes
- Generated SQL query with parameter substitution highlighted
- Extraction confidence scores for each parameter

Interactive controls:
- Text input: "Enter your natural language question about sales data"
- "Extract Parameters" button
- Example questions dropdown:
  - "Sales over $10,000 in Northeast last quarter"
  - "Top 10 products by revenue in 2024"
  - "Average order value for electronics in California"
  - "How many orders did we get last month?"
  - "Compare Q3 and Q4 sales by region"
- "Step Through" button to show extraction process incrementally
- Hover over highlighted entities to see extraction rules applied

Default parameters:
- Example: "Show me sales over $10,000 in the Northeast region during Q4"
- Current date: 2024-11-15 (for relative date calculations)

Behavior:
- When "Extract Parameters" clicked:
  1. Tokenize and parse the input question
  2. Run NER to identify entities (dates, locations, amounts, products)
  3. Apply pattern matching for common query structures
  4. Extract parameters into structured format
  5. Highlight recognized entities in the question text
  6. Display extracted parameters as JSON in right panel
  7. Generate SQL query using extracted parameters
  8. Show confidence scores for each extraction

- Entity highlighting:
  - "over $10,000" → Orange (numeric threshold with operator)
  - "Northeast region" → Green (geographic entity)
  - "Q4" → Blue (temporal expression)

- JSON structure displays:
  ```json
  {
    "table": "sales",
    "filters": {
      "amount": {"op": ">", "value": 10000, "confidence": 0.95},
      "region": {"op": "=", "value": "Northeast", "confidence": 0.98},
      "date": {"op": "BETWEEN", "value": ["2024-10-01", "2024-12-31"], "confidence": 0.92}
    }
  }
  ```

- SQL preview shows:
  ```sql
  SELECT * FROM sales
  WHERE amount > 10000
    AND region = 'Northeast'
    AND sale_date BETWEEN '2024-10-01' AND '2024-12-31';
  ```

- "Step Through" mode:
  - Step 1: Identify intent ("show me" = SELECT query)
  - Step 2: Find entity ("sales" = table name)
  - Step 3: Extract numeric filter ("over $10,000")
  - Step 4: Extract geographic filter ("Northeast region")
  - Step 5: Calculate temporal range ("Q4" based on current date)
  - Step 6: Assemble filters into SQL WHERE clause
  - Step 7: Generate complete query

- Hover tooltips explain:
  - "over $10,000" → "Numeric threshold: Operator '>' extracted from 'over', value 10000 extracted and normalized"
  - "Q4" → "Temporal: Q4 of current year (2024) = Oct 1 - Dec 31"
  - "Northeast region" → "Geographic: Matched to database region value 'Northeast'"

Visual styling:
- Entity highlights with semi-transparent colored backgrounds
- JSON tree with syntax highlighting
- SQL query with keyword highlighting (SELECT, FROM, WHERE in blue)
- Confidence scores as progress bars (green = high, yellow = medium, red = low)
- Clear visual connection between highlighted entities and JSON parameters

Implementation notes:
- Use p5.js for rendering
- Implement simplified NER with pattern matching:
  - Temporal: regex for "Q1-Q4", "last [period]", "[month] [year]", etc.
  - Geographic: lookup table of regions/states
  - Numeric: regex for "$X", "X dollars", "over/under/above/below X"
  - Operators: "over" → ">", "under" → "<", "at least" → ">=", etc.
- Date calculation:
  - "Q4" → current year Q4 unless "last" modifier → previous year
  - "last month" → calculate from current date
  - Store current date as configurable parameter
- Parameter confidence scoring:
  - Exact match (e.g., "Northeast" in known regions): 0.95-1.0
  - Pattern match (e.g., "Q4" → date range): 0.85-0.95
  - Inferred (e.g., "this year" with no explicit year): 0.70-0.85
- SQL generation: Template-based with parameter substitution
- Show warnings for ambiguous or low-confidence extractions
</details>

The sophistication of parameter extraction directly impacts chatbot accuracy and user satisfaction. Simple keyword matching might extract "10000" and "Northeast," but fail to recognize that "over" implies a greater-than operator, or that "Q4" requires date range calculation. Production systems employ NLP pipelines (Chapter 11) combined with domain-specific extraction rules to achieve robust parameter identification.

## Query Templates: Reusable Patterns for Common Questions

Query templates provide pre-defined SQL structures with placeholders for parameters, enabling rapid, reliable query construction for common question patterns. Instead of generating SQL from scratch for every user question, chatbot systems match questions to templates and fill in the parameter slots—a pragmatic approach that balances flexibility with safety and performance.

A query template consists of:

- **Natural language patterns:** Question formulations that map to this template
- **SQL structure:** The base query with parameter placeholders
- **Parameter specifications:** What parameters are required, their types, and validation rules
- **Result formatting:** How to present query results conversationally

Here's an example query template for sales-by-region questions:

```json
{
  "template_id": "sales_by_region",
  "description": "Total sales filtered by region and optional date range",

  "patterns": [
    "sales in {region}",
    "how much did we sell in {region}",
    "{region} sales",
    "show me {region} revenue",
    "what were sales in {region} during {time_period}"
  ],

  "sql_template": "SELECT SUM(amount) as total FROM sales WHERE region = {region} {date_filter}",

  "parameters": {
    "region": {
      "type": "categorical",
      "required": true,
      "validation": "must_match_region_list",
      "extraction": "NER_location or keyword_match"
    },
    "time_period": {
      "type": "temporal",
      "required": false,
      "default": "all_time",
      "extraction": "temporal_expression_parser"
    }
  },

  "response_template": "Total sales in {region} {time_phrase}: ${total:,.2f}"
}
```

When a user asks "What were Northeast sales in Q4?", the system:

1. Matches the question to the `sales_by_region` template based on pattern similarity
2. Extracts parameters: `region="Northeast"`, `time_period="Q4 2024"`
3. Validates parameters against specifications
4. Substitutes into SQL template: `SELECT SUM(amount) as total FROM sales WHERE region = 'Northeast' AND sale_date BETWEEN '2024-10-01' AND '2024-12-31'`
5. Executes query and retrieves result: `$1,234,567.89`
6. Formats response: "Total sales in Northeast for Q4 2024: $1,234,567.89"

The template approach offers several advantages for chatbot database interfaces:

**Advantages:**

- **Safety:** Pre-defined SQL structures prevent SQL injection attacks
- **Validation:** Parameter specifications enable type checking and range validation
- **Performance:** Templates can be optimized and cached
- **Maintainability:** Centralizing query logic simplifies updates and debugging
- **Consistency:** Standardized result formatting improves UX

**Disadvantages:**

- **Limited flexibility:** Only handles questions matching template patterns
- **Template explosion:** Complex domains may require dozens or hundreds of templates
- **Maintenance overhead:** Adding new query types requires creating new templates
- **Poor handling of novel questions:** Falls back to error messages or generic responses

Here's a comparison of template-based versus dynamic SQL generation approaches:

| Approach | Strengths | Weaknesses | Best For |
|----------|-----------|------------|----------|
| **Template-based** | Safe, fast, predictable | Limited to predefined queries | Well-defined domains with stable query patterns |
| **Pattern matching + templates** | Flexible within patterns, safe | Requires pattern library | Moderate complexity with some variation |
| **Semantic parsing** | Handles novel questions | Complex, slower, error-prone | Research applications, high variability |
| **LLM-based SQL generation** | Very flexible, natural | Security risks, hallucinations, cost | Prototyping, internal tools with query review |

Most production chatbot systems employ a **hybrid approach**: template-based handling for common questions (80-90% of queries), with fallback to more sophisticated parsing or human escalation for edge cases.

### Building an Effective Template Library

Successful template-based chatbot systems require careful template design:

**1. Start with query frequency analysis:** Analyze actual user questions (if migrating from existing system) or anticipated questions (for new systems) to identify the most common patterns. Build templates for the top 80% of questions first.

**2. Design flexible patterns:** Use placeholders that capture variations:
   - `{region}` matches "Northeast", "California", "EMEA"
   - `{time_period}` matches "Q4", "last month", "2024"
   - `{product_category}` matches "electronics", "software", "services"

**3. Handle parameter optionality:** Many parameters should be optional with sensible defaults:
   - Time range defaults to "all time" or "current quarter"
   - Region defaults to "all regions"
   - Aggregation defaults to SUM for amounts, COUNT for records

**4. Provide template variants:** Create related templates for detail vs. summary questions:
   - "sales in Northeast" (summary) → SUM(amount)
   - "list sales in Northeast" (detail) → SELECT *
   - "breakdown of Northeast sales" (grouped) → GROUP BY product

**5. Document and version templates:** Maintain a template registry with descriptions, creation dates, usage statistics, and change history.

#### Diagram: Query Template Matching Flow

<details markdown="1">
<summary>Query Template Matching Flow</summary>
Type: workflow

Purpose: Show the process of matching a user's natural language question to a query template, extracting parameters, validating, and generating SQL

Visual style: Flowchart with decision points and process boxes

Steps:
1. Start: "User asks natural language question"
   Hover text: "Example: 'What were Northeast sales in Q4?'"

2. Process: "Normalize question"
   Hover text: "Lowercase, expand contractions, remove filler words: 'what were northeast sales in q4'"

3. Process: "Calculate similarity to all template patterns"
   Hover text: "Use fuzzy matching or semantic similarity to find best template match"

4. Decision: "Template match found?"
   Hover text: "Does similarity score exceed threshold (e.g., 0.75)?"

5a. Process: "Select best matching template" (if Yes)
    Hover text: "Template 'sales_by_region' matched with score 0.92"

5b. Process: "Return 'unsupported query' message" (if No)
    Hover text: "No template matches question pattern. Suggest similar supported questions."
    → End

6. Process: "Extract parameters from question"
   Hover text: "Extract 'Northeast' for {region}, 'Q4' for {time_period}"

7. Process: "Validate extracted parameters"
   Hover text: "Check: 'Northeast' in valid regions list? 'Q4' valid temporal expression?"

8. Decision: "Parameters valid?"
   Hover text: "All required parameters present and passing validation?"

9a. Process: "Request missing/invalid parameters" (if No)
    Hover text: "Clarifying question: 'Which region did you mean: Northeast, Northwest, Southeast?'"
    → Loop back to step 6

9b. Process: "Calculate dynamic parameter values" (if Yes)
    Hover text: "Convert 'Q4' to date range: '2024-10-01' to '2024-12-31'"

10. Process: "Substitute parameters into SQL template"
    Hover text: "Replace {region} with 'Northeast', {date_filter} with date range WHERE clause"

11. Process: "Execute SQL query against database"
    Hover text: "Run: SELECT SUM(amount) FROM sales WHERE region='Northeast' AND sale_date BETWEEN..."

12. Decision: "Query successful?"
    Hover text: "Did query execute without errors?"

13a. Process: "Log error and return friendly message" (if No)
    Hover text: "Log technical error, show user: 'Sorry, I encountered an error retrieving that data'"
    → End

13b. Process: "Format results using response template" (if Yes)
    Hover text: "Insert query results into template: 'Total sales in Northeast for Q4 2024: $1,234,567'"

14. End: "Return formatted response to user"
    Hover text: "Display conversational response with data"

Color coding:
- Blue: Input/output steps
- Green: Processing steps
- Yellow: Decision points
- Orange: Validation steps
- Red: Error handling paths

Annotations:
- Show example values flowing through each step
- Highlight validation checks (parameter type, value range, required fields)
- Indicate caching opportunity at template matching step

Swimlanes:
- User Interaction
- Template Matching Engine
- Parameter Extraction & Validation
- SQL Generation & Execution
- Response Formatting

Implementation: Mermaid flowchart or process diagram tool
</details>

Template libraries should be treated as living artifacts, continuously refined based on user query logs, error rates, and user satisfaction metrics. Track which templates get used most frequently, which generate errors, and which result in user clarification requests—this data guides template optimization efforts.

## Parameterized Queries: Security and Performance

Parameterized queries (also called prepared statements) separate SQL structure from data values, providing critical security and performance benefits for database-connected chatbots. Instead of concatenating user input directly into SQL strings—which creates SQL injection vulnerabilities—parameterized queries use placeholders that the database driver safely substitutes with properly escaped values.

### The SQL Injection Problem

Consider a naive chatbot implementation that builds SQL by string concatenation:

```python
# DANGEROUS - DO NOT USE
user_input = "Northeast"
query = f"SELECT * FROM sales WHERE region = '{user_input}'"
# Results in: SELECT * FROM sales WHERE region = 'Northeast'
```

This works fine for legitimate input, but what if a malicious user provides this input?

```python
user_input = "Northeast' OR '1'='1"
query = f"SELECT * FROM sales WHERE region = '{user_input}'"
# Results in: SELECT * FROM sales WHERE region = 'Northeast' OR '1'='1'
# This returns ALL sales records, bypassing the region filter!
```

Even worse, an attacker could inject destructive commands:

```python
user_input = "Northeast'; DROP TABLE sales; --"
query = f"SELECT * FROM sales WHERE region = '{user_input}'"
# Results in: SELECT * FROM sales WHERE region = 'Northeast'; DROP TABLE sales; --'
# This could delete the entire sales table!
```

SQL injection represents one of the most common and dangerous web application vulnerabilities. For chatbot systems that construct queries from natural language input, the attack surface is particularly large because users can phrase questions in countless ways.

### Using Parameterized Queries Safely

Parameterized queries eliminate SQL injection by separating query structure from data:

```python
# SAFE - Parameterized query
user_input = "Northeast' OR '1'='1"  # Malicious input

# Using parameterized query (Python with psycopg2 for PostgreSQL)
cursor.execute(
    "SELECT * FROM sales WHERE region = %s",
    (user_input,)
)
# The database driver treats user_input as a literal string value,
# not executable SQL. The malicious SQL code becomes inert.
```

The database driver automatically escapes special characters, ensuring the input is treated as data rather than code. Even if the user provides SQL keywords, operators, or quotes, they become part of the search value rather than altering the query structure.

Here's a comparison of safe versus unsafe query construction:

| Approach | Code Example | SQL Injection Risk | Performance | Use Case |
|----------|--------------|-------------------|-------------|----------|
| **String concatenation** | `f"WHERE region = '{input}'"` | ❌ CRITICAL VULNERABILITY | Slow (re-parse each time) | NEVER USE |
| **Parameterized query** | `cursor.execute(sql, (input,))` | ✅ SAFE | Fast (prepared once) | ALL production queries |
| **ORM with parameter binding** | `Sales.query.filter_by(region=input)` | ✅ SAFE | Fast | Web applications |
| **Stored procedures** | `CALL get_sales_by_region(input)` | ✅ SAFE (if procedure is safe) | Very fast | High-performance systems |

For chatbot applications, parameterized queries provide the right balance of security, performance, and simplicity. All modern database drivers support parameterization:

```python
# PostgreSQL (psycopg2)
cursor.execute("SELECT * FROM sales WHERE region = %s AND sale_date >= %s",
               (region, start_date))

# MySQL (mysql-connector-python)
cursor.execute("SELECT * FROM sales WHERE region = %s AND sale_date >= %s",
               (region, start_date))

# SQLite (sqlite3)
cursor.execute("SELECT * FROM sales WHERE region = ? AND sale_date >= ?",
               (region, start_date))

# SQL Server (pyodbc)
cursor.execute("SELECT * FROM sales WHERE region = ? AND sale_date >= ?",
               (region, start_date))
```

### Additional Security Considerations

Beyond SQL injection protection, database-connected chatbots require several security layers:

**1. Least privilege database access:** The chatbot database user should have SELECT permissions only, never INSERT, UPDATE, DELETE, or DDL permissions. If the chatbot requires write access (rare), limit it to specific tables or views.

**2. Query timeout limits:** Set maximum execution time to prevent resource exhaustion from complex queries:
   ```python
   cursor.execute("SET statement_timeout = 5000")  # 5 second limit
   ```

**3. Result set size limits:** Cap the number of rows returned to prevent memory exhaustion:
   ```python
   cursor.execute("SELECT * FROM sales WHERE region = %s LIMIT 1000", (region,))
   ```

**4. Input validation:** Even with parameterized queries, validate parameter values before execution:
   - Check region against allowed list
   - Verify date ranges are reasonable (not 100 years in the past)
   - Ensure numeric values are within expected bounds

**5. Audit logging:** Log all queries executed by the chatbot, including user, timestamp, query, and parameters. This enables security auditing and debugging.

**6. Database view abstraction:** Create database views that expose only necessary columns and pre-filter sensitive data, then grant chatbot access only to views:
   ```sql
   CREATE VIEW sales_summary AS
   SELECT product_name, region, sale_date, amount
   FROM sales
   WHERE deleted_at IS NULL;  -- Hide deleted records
   -- Omits: sale_id, sales_rep (PII), customer_id (PII)

   GRANT SELECT ON sales_summary TO chatbot_user;
   ```

These defense-in-depth strategies ensure that even if one security layer fails, others provide protection.

## Natural Language to SQL: Conversion Strategies

Translating natural language questions into SQL queries represents one of the most challenging problems in conversational AI, requiring understanding of linguistic structure, database schema knowledge, and query semantics. Multiple approaches exist, each with distinct trade-offs between accuracy, flexibility, and implementation complexity.

### Conversion Approaches Compared

Here are the primary strategies for natural language to SQL conversion:

| Approach | How It Works | Accuracy | Flexibility | Complexity | Best Use Case |
|----------|--------------|----------|-------------|------------|---------------|
| **Template Matching** | Match question to predefined templates | High (95%+) for covered patterns | Low | Low | Stable domains with known question types |
| **Semantic Parsing** | Parse to logical form, then SQL | Medium (70-85%) | Medium | High | Academic research, complex domains |
| **Neural Seq2Seq** | Train model to translate NL→SQL | Medium (65-80%) | High | Very High | Large training datasets available |
| **LLM Prompting** | GPT-4/Claude with few-shot examples | Medium-High (75-90%) | Very High | Low (implementation) | Prototyping, internal tools |
| **Hybrid** | Templates + LLM fallback | High (90%+) | Medium-High | Medium | Production systems |

Let's examine each approach in detail:

### 1. Template Matching (Covered in Previous Section)

We've already explored template-based approaches extensively. This remains the most reliable method for production chatbots with well-defined query patterns.

### 2. Semantic Parsing

Semantic parsing translates natural language to an intermediate logical representation, which then converts to SQL. This approach understands query structure more deeply than simple template matching.

Example semantic parse for "What were sales over $10,000 in Q4?":

```
Question: "What were sales over $10,000 in Q4?"

Logical Form:
SELECT(
  table: sales,
  aggregate: none,
  filters: [
    Filter(column: amount, operator: >, value: 10000),
    Filter(column: sale_date, operator: BETWEEN,
           value: [date(2024-10-01), date(2024-12-31)])
  ]
)

SQL Generation:
SELECT * FROM sales
WHERE amount > 10000
  AND sale_date BETWEEN '2024-10-01' AND '2024-12-31'
```

Semantic parsing handles compositional questions better than templates—questions combining multiple constraints or requiring complex aggregations. However, it requires substantial linguistic and database schema annotation, making it impractical for many applications.

### 3. Neural Sequence-to-Sequence Models

Neural models treat NL→SQL conversion as a translation task, training on large datasets of question-SQL pairs. Models like SQLNet, TypeSQL, and RAT-SQL have achieved strong results on benchmark datasets like WikiSQL and Spider.

**Advantages:**
- Learns patterns from data rather than requiring manual rules
- Can generalize to similar but unseen question patterns
- Handles complex multi-table joins and nested queries

**Disadvantages:**
- Requires large training datasets (10,000+ question-SQL pairs)
- Domain-specific: trained on one schema doesn't transfer to another
- Black-box nature makes debugging difficult
- Computational overhead (though inference is relatively fast)

For enterprise chatbot applications, the training data requirements and domain-specificity make pure neural approaches challenging unless you already have extensive query logs with gold-standard SQL.

### 4. Large Language Model (LLM) Prompting

Modern LLMs like GPT-4 and Claude can generate SQL from natural language questions with appropriate prompting. This approach provides remarkable flexibility with minimal implementation effort:

```python
prompt = f"""Given this database schema:

CREATE TABLE sales (
    sale_id INT,
    product_name VARCHAR(100),
    region VARCHAR(50),
    sale_date DATE,
    amount DECIMAL(10,2)
);

Convert this question to a SQL query:
"{user_question}"

Return only the SQL query without explanation.
"""

sql_query = llm.generate(prompt)
```

Example output for "What were total sales in the Northeast during Q4 2024?":

```sql
SELECT SUM(amount) as total_sales
FROM sales
WHERE region = 'Northeast'
  AND sale_date BETWEEN '2024-10-01' AND '2024-12-31';
```

**Advantages:**
- Extremely flexible—handles questions never seen before
- Minimal implementation effort
- Can incorporate schema descriptions and example queries for better results
- Handles complex joins and aggregations

**Disadvantages:**
- Non-deterministic—same question may generate different SQL
- Hallucination risk—may reference non-existent tables or columns
- Security concerns—requires careful validation before execution
- API costs and latency
- No guarantee of SQL correctness

For production systems, LLM-generated SQL should **never execute directly without validation**. Safe implementation requires:

1. Schema validation: Verify all referenced tables and columns exist
2. Query allowlist: Check that generated query matches expected patterns
3. Dry-run execution: Test query with LIMIT 1 before full execution
4. Human review: For high-stakes queries, show SQL to user for approval

### 5. Hybrid Approaches (Recommended for Production)

The most robust production systems combine approaches:

```
User Question
     ↓
Template Matching (handles 80-90% of queries)
     ↓ (if no match)
LLM SQL Generation (handles novel questions)
     ↓
Schema Validation (verify table/column names)
     ↓
Pattern Validation (ensure safe query structure)
     ↓
Execution with safeguards (timeout, result limits)
```

This architecture provides template reliability for common patterns while gracefully handling unusual questions through LLM generation with appropriate safety checks.

#### Diagram: Natural Language to SQL Conversion Pipeline

<details markdown="1">
<summary>Natural Language to SQL Conversion Pipeline</summary>
Type: diagram

Purpose: Illustrate the complete pipeline for converting natural language questions to executed SQL queries, showing multiple conversion strategies and safety layers

Components to show:
- Input Layer:
  - User natural language question
  - Question normalization (lowercase, expand abbreviations)

- Conversion Strategy Layer (parallel branches):
  Branch 1: Template-Based Path
    - Template pattern matching
    - Parameter extraction
    - Template SQL substitution
    - Confidence score: HIGH

  Branch 2: LLM-Based Path
    - Schema-aware LLM prompt construction
    - LLM SQL generation
    - Confidence score: MEDIUM

  Branch 3: Semantic Parsing Path (optional)
    - Linguistic parsing
    - Logical form construction
    - SQL generation from logical form
    - Confidence score: MEDIUM

- Selection & Validation Layer:
  - Select highest confidence result
  - Schema validation (verify tables/columns exist)
  - Query pattern validation (ensure safe structure)
  - Parameter sanitization

- Safety & Execution Layer:
  - Set query timeout (5 seconds)
  - Set result limit (1000 rows)
  - Execute parameterized query
  - Catch and handle errors

- Output Layer:
  - Format results for conversational display
  - Cache query for similar future questions
  - Log query for analytics

Connections:
- User question flows to all conversion strategies in parallel
- Each strategy outputs: SQL candidate + confidence score
- Arrows from strategies converge at selection layer
- Validation layer shows multiple gates (schema check, pattern check, sanitization)
- Safety layer wraps execution with timeout and limit constraints
- Error paths show fallback to human escalation

Style: Layered architecture with parallel processing paths converging

Labels:
- "Template Path: 90% of queries" (thick arrow)
- "LLM Path: Novel queries" (medium arrow)
- "Semantic Parse: Research" (thin dotted arrow)
- Validation gates: "Schema ✓", "Pattern ✓", "Sanitize ✓"
- Safety constraints shown as shields: "5s timeout", "1K limit"

Color scheme:
- Green: Template path (high confidence)
- Yellow: LLM path (medium confidence)
- Orange: Semantic parsing path (experimental)
- Blue: Validation layers
- Red: Safety constraints
- Gray: Error/fallback paths

Visual enhancements:
- Parallel arrows showing concurrent strategy execution
- Validation checkpoints as gates/filters
- Safety layer as protective shields around execution
- Error paths with dotted red lines to fallback handlers

Implementation: Architectural diagram using draw.io or Lucidchart, or Mermaid flowchart
</details>

This hybrid approach achieves high accuracy on common questions (via templates) while maintaining flexibility for edge cases (via LLM), with comprehensive safety validation ensuring no malformed or dangerous queries reach the database.

## Question to Query Mapping: Understanding User Intent

Mapping natural language questions to appropriate database queries requires more than literal translation—it demands understanding user intent, implicit context, and conversational expectations. The same database table can answer questions in dozens of different ways depending on what the user actually wants to know.

Consider this sales table and several questions users might ask:

```sql
CREATE TABLE sales (
    sale_id INT,
    product_name VARCHAR(100),
    category VARCHAR(50),
    region VARCHAR(50),
    sale_date DATE,
    amount DECIMAL(10,2),
    sales_rep VARCHAR(100)
);
```

**Different questions requiring different query structures:**

| User Question | User Intent | Required SQL Approach | Specific Challenge |
|---------------|-------------|----------------------|-------------------|
| "Sales in Q4?" | Summary total | `SELECT SUM(amount) WHERE date range` | Aggregate vs. detail |
| "What sold in Q4?" | Product list | `SELECT DISTINCT product_name WHERE date range` | Distinct products, not amounts |
| "Top products in Q4?" | Ranked list | `GROUP BY product ORDER BY SUM DESC LIMIT 10` | Aggregation + ordering |
| "Did we hit $1M in Q4?" | Yes/no answer | `SELECT SUM(amount) >= 1000000 WHERE date range` | Boolean result |
| "Q4 trend?" | Time series | `GROUP BY month ORDER BY month` | Temporal grouping |
| "Who sold the most in Q4?" | Person identification | `GROUP BY sales_rep ORDER BY SUM DESC LIMIT 1` | Group by person, not product |
| "How does Q4 compare to Q3?" | Comparison | Requires two aggregations + subtraction | Multiple time periods |

Each question references the same time period ("Q4") and same table, but the **intent** differs dramatically:

- **Aggregation intent:** Summary (SUM), Count (COUNT), Average (AVG), or Detail (SELECT *)
- **Grouping intent:** By product, by region, by time period, by person, or ungrouped
- **Ordering intent:** Highest first (DESC), lowest first (ASC), chronological, or unordered
- **Limit intent:** Top N, bottom N, all results, or single result
- **Comparison intent:** Absolute values, differences, ratios, or trends

Successfully mapping questions to queries requires detecting these intent signals:

**Aggregation signals:**

- "total", "sum", "how much" → SUM aggregation
- "average", "mean" → AVG aggregation
- "how many", "count" → COUNT aggregation
- "list", "show me", "what" → detail query (SELECT *)

**Grouping signals:**

- "by region", "for each region", "breakdown by region" → GROUP BY region
- "per product", "product-by-product" → GROUP BY product
- "monthly", "by month" → GROUP BY MONTH(date)

**Ordering signals:**

- "top", "best", "highest", "most" → ORDER BY DESC
- "bottom", "worst", "lowest", "least" → ORDER BY ASC
- "first", "earliest" → ORDER BY date ASC
- "recent", "latest" → ORDER BY date DESC

**Limit signals:**

- "top 10", "best 5" → LIMIT N
- "who", "which" (singular) → LIMIT 1
- No signal → return reasonable default (e.g., 100 rows)

### Handling Ambiguity Through Clarification

Many questions contain ambiguity that prevents accurate query construction. Rather than guessing, robust chatbot systems detect ambiguity and request clarification:

**Example ambiguous question:** "Show me sales for Smith"

Possible interpretations:
1. Sales made by sales rep named Smith (WHERE sales_rep = 'Smith')
2. Sales of products with "Smith" in the name (WHERE product_name LIKE '%Smith%')
3. Sales in Smith County/Smith region (WHERE region = 'Smith')

**Clarification response:**
"I found multiple ways to interpret that. Did you mean:
1. Sales made by sales representative Smith
2. Products with 'Smith' in the name
3. Sales in the Smith region"

**Another ambiguous example:** "Compare sales this year and last year"

Possible aggregations:
1. Total sales each year (single number per year)
2. Monthly breakdown each year (12 numbers per year)
3. Regional breakdown each year (N regions × 2 years)

**Clarification response:**
"How would you like to see the comparison?
1. Total sales for each year
2. Month-by-month comparison
3. Comparison by region"

Detecting ambiguity requires analyzing:
- Multiple possible entity matches (multiple sales reps named "Smith")
- Underspecified grouping/aggregation (no indication of granularity)
- Vague time references ("recently", "a while ago")
- Ambiguous pronouns or references ("them", "that", "there")

The best user experience balances minimizing clarification requests (which slow conversation flow) with avoiding incorrect query execution (which frustrates users). Use clarification when:
- Confidence in parameter extraction is below threshold (< 0.7)
- Multiple interpretations have similar confidence scores
- Query would access sensitive data or execute expensive operations
- User's question is novel and doesn't match known patterns

## Slot Filling: Structured Parameter Representation

Slot filling, borrowed from dialog system research, provides a structured approach to parameter extraction by maintaining a frame representation of the query being constructed. Each "slot" corresponds to a query parameter, and the chatbot fills slots incrementally through conversation turns until sufficient information exists to execute the query.

Consider a query template for sales reports with these slots:

```json
{
  "intent": "get_sales_report",
  "slots": {
    "time_period": {
      "value": null,
      "required": true,
      "type": "temporal",
      "status": "empty"
    },
    "region": {
      "value": null,
      "required": false,
      "type": "categorical",
      "status": "empty"
    },
    "product_category": {
      "value": null,
      "required": false,
      "type": "categorical",
      "status": "empty"
    },
    "aggregation": {
      "value": "total",
      "required": false,
      "type": "aggregation_type",
      "status": "filled",
      "default": "total"
    }
  }
}
```

Slot filling proceeds through multi-turn conversation:

**Turn 1:**
- User: "Show me sales reports"
- System extracts: intent="get_sales_report"
- Required slot "time_period" is empty
- System: "For what time period would you like to see sales?"

**Turn 2:**
- User: "Q4"
- System fills: slots["time_period"] = {"value": "Q4 2024", "status": "filled"}
- All required slots filled
- System executes query and returns: "Total sales for Q4 2024: $1,234,567"

**Alternative: User provides everything upfront:**
- User: "Show me Q4 sales for electronics in the Northeast"
- System extracts:
  - intent = "get_sales_report"
  - slots["time_period"] = "Q4 2024"
  - slots["region"] = "Northeast"
  - slots["product_category"] = "electronics"
- All slots filled in single turn
- System executes immediately

Slot filling enables natural, flexible conversation by:

**1. Supporting incremental refinement:** Users can provide information over multiple turns

**2. Handling under-specification:** Missing required information triggers targeted clarification questions

**3. Enabling over-specification:** Extra information (like product category) adds optional filters

**4. Maintaining context:** Filled slots persist across turns, enabling follow-up questions:
   - User: "How about Q3 instead?"
   - System updates: slots["time_period"] = "Q3 2024" (keeps region and category)

**5. Allowing corrections:** Users can revise slot values:
   - User: "Actually, I meant the Northwest region"
   - System updates: slots["region"] = "Northwest"

#### MicroSim: Slot Filling Interactive Demo

<details markdown="1">
<summary>Slot Filling Interactive Demo</summary>
Type: microsim

Learning objective: Demonstrate how slot filling maintains query state across multiple conversation turns, showing incremental parameter collection and query execution when all required slots are filled

Canvas layout (900x650px):
- Top section (900x150): Conversation area
  - Chat history showing user and chatbot messages
  - User input field
  - "Send" button

- Middle section (900x350): Slot status panel
  - Visual representation of all slots
  - Each slot shows: name, status (empty/partial/filled), current value
  - Required vs. optional indicators
  - Confidence scores for filled slots

- Bottom section (900x150): Query preview and execution
  - Current SQL query (updates as slots fill)
  - "Execute Query" button (enabled when required slots filled)
  - Query results display area

Visual elements:
- Conversation bubbles (user = right-aligned blue, bot = left-aligned gray)
- Slot status cards with color coding:
  - Red border: Required, empty
  - Yellow border: Required, partially filled
  - Green border: Filled
  - Gray border: Optional, empty
- SQL query preview with syntax highlighting
- Results table (appears after execution)

Interactive controls:
- Text input: "Type your message..."
- "Send" button (or Enter key)
- Pre-loaded scenarios dropdown:
  - "Complete query in one turn"
  - "Incremental slot filling (3 turns)"
  - "Correction and refinement"
  - "Optional parameters"
- "Reset Conversation" button
- Click any slot to see extraction confidence and source

Default parameters:
- Scenario: "Incremental slot filling"
- Initial query template: sales_report with slots for time_period, region, product_category

Behavior:
- Turn 1:
  - User types: "Show me sales"
  - System extracts intent: "get_sales_report"
  - Identifies required slot empty: time_period
  - Slots panel updates:
    * time_period: EMPTY (required) - red border
    * region: EMPTY (optional) - gray border
    * product_category: EMPTY (optional) - gray border
    * aggregation: FILLED (default: total) - green border
  - Bot responds: "For what time period would you like to see sales?"
  - SQL preview shows: "SELECT SUM(amount) FROM sales WHERE [time_period pending]"

- Turn 2:
  - User types: "Q4"
  - System fills: time_period = "Q4 2024" (dates: 2024-10-01 to 2024-12-31)
  - Slots panel updates:
    * time_period: FILLED - green border, shows "Q4 2024 (Oct-Dec)"
  - All required slots filled
  - Bot responds: "Total sales for Q4 2024: $1,234,567.89. Would you like to filter by region or product category?"
  - SQL preview shows complete query:
    "SELECT SUM(amount) FROM sales WHERE sale_date BETWEEN '2024-10-01' AND '2024-12-31'"
  - "Execute Query" button enabled and auto-executes
  - Results table appears showing: Total: $1,234,567.89

- Turn 3 (refinement):
  - User types: "Just electronics in the Northeast"
  - System fills:
    * product_category = "electronics"
    * region = "Northeast"
  - Slots panel updates both slots to FILLED - green borders
  - SQL preview updates:
    "SELECT SUM(amount) FROM sales WHERE sale_date BETWEEN '2024-10-01' AND '2024-12-31' AND category = 'electronics' AND region = 'Northeast'"
  - Query re-executes automatically
  - Bot responds: "Total electronics sales in Northeast for Q4 2024: $456,789.12"
  - Results update

- Alternative scenario (complete in one turn):
  - User types: "Show me Q4 electronics sales in the Northeast"
  - System extracts all parameters in single turn:
    * intent: get_sales_report
    * time_period: Q4 2024
    * product_category: electronics
    * region: Northeast
  - All slots fill immediately - all green borders
  - Query executes immediately
  - Bot responds with results: "$456,789.12"

- Correction scenario:
  - User types: "Actually, I meant Q3"
  - System updates: time_period = "Q3 2024"
  - Previous values for region and category preserved
  - Query re-executes with updated time period
  - Bot responds: "Updated to Q3 2024. Total electronics sales in Northeast for Q3 2024: $398,234.56"

Hover behaviors:
- Hover over any slot card:
  - Shows extraction source: "Extracted from: 'Q4' in user message"
  - Shows confidence: 0.95
  - Shows normalization: "Q4" → "2024-10-01 to 2024-12-31"
  - Shows validation status: ✓ Valid temporal expression

- Hover over SQL query:
  - Highlights which slot corresponds to each WHERE clause
  - Color-codes slot substitutions

Visual styling:
- Chat interface: Modern messaging app style
- Slot cards: Material design cards with status indicators
- Color scheme:
  - Red: Required + empty (needs attention)
  - Yellow: Partially filled (extraction uncertain)
  - Green: Filled and validated
  - Gray: Optional + empty
- SQL syntax highlighting: Keywords in blue, values in orange
- Results table: Clean, alternating row colors

Implementation notes:
- Use p5.js for UI rendering
- Maintain slot state object that persists across turns
- Implement simplified NER for parameter extraction:
  - Temporal: "Q1-Q4", "last month", month names, years
  - Geographic: hardcoded region list (Northeast, Northwest, Southeast, Southwest, Midwest)
  - Categorical: product category list (electronics, software, services, hardware)
- Slot filling logic:
  - On each user message, extract any matching slot values
  - Update slot status: empty → filled
  - Check if all required slots filled
  - If yes: enable query execution
  - If no: generate clarification question for next empty required slot
- SQL generation: Template-based with slot substitution
- Query execution: Simulated with hardcoded sample results
- Show status transitions with smooth animations
- Log all slot updates with timestamps
</details>

Slot-based approaches shine in production chatbot systems because they:

- Provide clear state representation for debugging and logging
- Enable systematic handling of missing information
- Support natural conversation flow without rigid question order
- Allow confidence thresholds per slot (request confirmation if low confidence)
- Integrate cleanly with dialog management systems

Many commercial chatbot platforms (Dialogflow, Rasa, Amazon Lex) use slot-filling as their core parameter extraction mechanism, providing built-in support for slot types, validation, and multi-turn collection.

## Query Execution and Results Handling

Once a valid SQL query is constructed and validated, execution and results handling determine the actual user experience. Database query execution introduces latency, potential errors, and varying result structures—all requiring careful handling for responsive, reliable chatbot interactions.

### Execution Best Practices

**1. Use async execution for responsiveness:**

Long-running queries (>500ms) should execute asynchronously to prevent blocking the chatbot interface:

```python
import asyncio

async def execute_query_async(query, params):
    """Execute query asynchronously to maintain UI responsiveness"""
    # Show "working" indicator to user
    await show_typing_indicator()

    # Execute query in thread pool
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, lambda: cursor.execute(query, params))
    rows = await loop.run_in_executor(None, lambda: cursor.fetchall())

    # Hide "working" indicator
    await hide_typing_indicator()

    return rows
```

**2. Set timeouts to prevent resource exhaustion:**

```python
cursor.execute("SET statement_timeout = 5000")  # 5 second limit
```

**3. Limit result set size:**

Even when users ask open-ended questions, limit results to prevent overwhelming responses:

```sql
-- Always append LIMIT clause
SELECT * FROM sales WHERE region = 'Northeast' LIMIT 1000;
```

**4. Cache frequent queries:**

Identify and cache results for common queries (especially those with expensive aggregations):

```python
from functools import lru_cache
import hashlib

@lru_cache(maxsize=100)
def execute_cached_query(query_hash, query, params):
    """Cache query results for 5 minutes"""
    cursor.execute(query, params)
    return cursor.fetchall()

# Usage
query_hash = hashlib.md5(f"{query}{params}".encode()).hexdigest()
results = execute_cached_query(query_hash, query, params)
```

**5. Handle errors gracefully:**

```python
try:
    cursor.execute(query, params)
    results = cursor.fetchall()
except psycopg2.Error as e:
    # Log technical error for debugging
    logger.error(f"Query failed: {query}, {params}, Error: {e}")

    # Return user-friendly message
    return "I encountered an error retrieving that data. Please try rephrasing your question or contact support."
```

### Results Formatting for Conversational Display

Raw database results require formatting for natural conversation. The presentation depends on result structure and user intent:

**Single aggregate value:**

```python
# Query: SELECT SUM(amount) FROM sales WHERE region = 'Northeast'
# Result: [(1234567.89,)]

response = f"Total sales in Northeast: ${result[0][0]:,.2f}"
# Output: "Total sales in Northeast: $1,234,567.89"
```

**Small result set (1-5 rows):**

```python
# Query: SELECT product_name, amount FROM sales ORDER BY amount DESC LIMIT 5
# Result: [('Widget A', 5000), ('Widget B', 4500), ...]

response = "Top products by sales:\n"
for i, (product, amount) in enumerate(results, 1):
    response += f"{i}. {product}: ${amount:,.2f}\n"

# Output:
# Top products by sales:
# 1. Widget A: $5,000.00
# 2. Widget B: $4,500.00
# ...
```

**Medium result set (6-20 rows):**

Present as formatted table:

```
Product         Region      Sales
---------------------------------
Widget A        Northeast   $5,000
Widget B        Southwest   $4,500
Widget C        Midwest     $4,200
...
```

**Large result set (>20 rows):**

Summarize and offer export:

```
Found 247 sales records matching your criteria:
- Total: $1,234,567.89
- Average: $4,998.65
- Range: $125.00 - $45,678.90

Would you like me to:
1. Show the top 10 results
2. Email you a CSV export
3. Refine the search with additional filters
```

**Empty result set:**

```
No sales found matching those criteria.

You searched for:
- Region: Northeast
- Time: Q4 2024
- Category: Electronics

Try:
- Expanding the time range
- Removing the category filter
- Checking if 'Northeast' is the correct region name
```

### Handling Query Errors and Edge Cases

Production database chatbots must handle numerous error conditions:

| Error Type | Example | Detection | User-Facing Response |
|------------|---------|-----------|---------------------|
| **Timeout** | Query runs > 5 seconds | Catch timeout exception | "That query is taking longer than expected. Try narrowing your search." |
| **Invalid parameter** | Non-existent region "Northeas" | Fuzzy match before execution | "Did you mean 'Northeast'? I don't recognize 'Northeas' as a region." |
| **Insufficient permissions** | User lacks table access | Catch permission denied error | "You don't have access to that data. Contact your administrator." |
| **Empty result** | No matching records | Check row count after execution | "No results found. Try different criteria." |
| **Ambiguous question** | Multiple interpretation paths | Low confidence score | "I'm not sure I understand. Did you mean..." |
| **Database unavailable** | Connection failure | Catch connection exception | "I'm having trouble connecting to the database. Please try again in a moment." |

Robust error handling with informative, actionable user messages dramatically improves chatbot reliability and user satisfaction.

## Key Takeaways

Connecting chatbots to databases transforms them from simple FAQ systems into powerful data interfaces, but this capability introduces significant engineering, security, and user experience challenges. By understanding database query fundamentals, parameter extraction techniques, query templates, and safe execution practices, you can build chatbot systems that make organizational data accessible through natural conversation.

Core concepts to remember:

- **Database queries require parameter extraction:** Identifying specific values (dates, regions, thresholds) from natural language questions is the central challenge

- **SQL injection is a critical threat:** Always use parameterized queries, never concatenate user input into SQL strings

- **Query templates balance safety and flexibility:** Pre-defined templates with parameter slots provide reliable query construction for common patterns

- **Multiple conversion strategies exist:** Template matching, semantic parsing, neural models, and LLM prompting each have distinct trade-offs

- **Slot filling enables multi-turn collection:** Maintaining structured query state across conversation turns supports natural, incremental parameter gathering

- **Intent matters as much as parameters:** The same table answers different questions depending on whether users want totals, lists, rankings, or comparisons

- **Results formatting affects UX:** Raw query results require conversational formatting appropriate to result size and structure

- **Error handling determines reliability:** Graceful handling of timeouts, invalid parameters, and empty results maintains user trust

As you build database-connected chatbots, start with simple, well-defined query patterns using templates, then progressively add sophistication as you analyze actual user questions and identify gaps in coverage. The most successful systems combine multiple approaches—templates for common queries, LLM generation for novel questions—with comprehensive safety validation ensuring no malformed or dangerous queries reach the database.
