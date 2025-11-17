# Interactive Regular Expression Pattern Matcher

An educational MicroSim for experimenting with regular expression patterns and seeing real-time matches, building intuition for regex syntax and capabilities.

## Interactive MicroSim

<iframe src="main.html" width="100%" height="800px" frameborder="0"></iframe>

[View Fullscreen](main.html){:target="_blank" .md-button .md-button--primary}

## Overview

Regular expressions (regex) provide a powerful pattern language for matching and extracting text. This interactive MicroSim allows you to experiment with regex patterns and immediately see what text they match, helping you build intuition for this essential text processing tool.

## Features

### Interactive Elements

- **Test Text Area:** Enter or paste any text you want to search through
- **Pattern Input:** Enter regex patterns using standard JavaScript regex syntax
- **Example Patterns:** Dropdown menu with pre-loaded examples:
  - Email addresses
  - Phone numbers (US formats)
  - URLs (HTTP/HTTPS)
  - Dates (ISO format YYYY-MM-DD)
  - Hashtags
  - Numbers (integers and decimals)
  - Custom (create your own)

- **Regex Flags:**
  - Global (g): Find all matches (not just first)
  - Case insensitive (i): Ignore case when matching
  - Multiline (m): Treat beginning and end characters (^ and $) as working across multiple lines

- **Buttons:**
  - Test Pattern: Manually trigger pattern matching (also happens automatically on input)
  - Clear: Reset both text and pattern fields

### Visual Feedback

- **Matches Visualization:** Shows your test text with matches highlighted in yellow
- **Match Details:** Lists all matches found with their positions in the text
- **Match Count:** Shows total number of matches
- **Pattern Explanation:** Breaks down what each part of your regex pattern means
- **Error Display:** Shows helpful error messages if your pattern has syntax errors

## How to Use

### Basic Workflow

1. **Select an Example:** Choose an example pattern from the dropdown (or start with Custom)
2. **Observe the Match:** See how the pattern matches the example text (yellow highlights)
3. **Modify the Pattern:** Change the regex pattern to experiment
4. **Change the Text:** Enter your own test text to see what matches
5. **Adjust Flags:** Toggle global, case insensitive, or multiline modes
6. **Review Results:** Check the match details section to see what was found

### Example: Matching Email Addresses

1. Select "Email addresses" from the dropdown
2. Pattern: `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b`
3. Test text: `Contact us at support@example.com or sales@company.org`
4. Observe two matches highlighted in yellow
5. Match details show both email addresses and their positions

**Pattern Breakdown:**
- `\b` = word boundary (ensures we match complete emails)
- `[A-Za-z0-9._%+-]+` = one or more valid email characters before @
- `@` = literal @ symbol
- `[A-Za-z0-9.-]+` = domain name characters
- `\.` = literal dot (escaped because . means "any character" in regex)
- `[A-Z|a-z]{2,}` = two or more letters for top-level domain (com, org, etc.)
- `\b` = word boundary (end of email)

### Example: Matching Phone Numbers

1. Select "Phone numbers" from the dropdown
2. Pattern: `\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}`
3. Test text: `Call (555) 123-4567 or 555.987.6543 or 555-111-2222`
4. Observe three different phone number formats all matching

**Pattern Breakdown:**
- `\(?` = optional opening parenthesis
- `\d{3}` = exactly 3 digits (area code)
- `\)?` = optional closing parenthesis
- `[-.\s]?` = optional separator (dash, dot, or space)
- `\d{3}` = exactly 3 digits (exchange)
- `[-.\s]?` = optional separator
- `\d{4}` = exactly 4 digits (line number)

## Common Regex Patterns

### Basic Matchers

| Pattern | Meaning | Example |
|---------|---------|---------|
| `.` | Any single character | `c.t` matches "cat", "cot", "c9t" |
| `*` | Zero or more of preceding | `ab*c` matches "ac", "abc", "abbc" |
| `+` | One or more of preceding | `ab+c` matches "abc", "abbc" (not "ac") |
| `?` | Zero or one of preceding | `colou?r` matches "color", "colour" |
| `{n}` | Exactly n of preceding | `\d{3}` matches "123", "456" |
| `{n,m}` | Between n and m | `\d{2,4}` matches "12", "123", "1234" |

### Character Classes

| Pattern | Meaning | Example |
|---------|---------|---------|
| `\d` | Any digit (0-9) | `\d+` matches "123", "4567" |
| `\w` | Word character (a-z, A-Z, 0-9, _) | `\w+` matches "hello", "test_123" |
| `\s` | Whitespace (space, tab, newline) | `hello\s+world` matches "hello  world" |
| `\D` | Non-digit | `\D+` matches "abc" |
| `\W` | Non-word character | - |
| `\S` | Non-whitespace | - |
| `[abc]` | Any character in set | `[Pp]ython` matches "Python", "python" |
| `[a-z]` | Any character in range | `[0-9]{2}` matches "42", "99" |
| `[^abc]` | Any character NOT in set | `[^0-9]+` matches any non-digit |

### Anchors and Boundaries

| Pattern | Meaning | Example |
|---------|---------|---------|
| `^` | Start of string/line | `^Hello` matches "Hello world" (not "Say Hello") |
| `$` | End of string/line | `world$` matches "Hello world" (not "world peace") |
| `\b` | Word boundary | `\bcat\b` matches "cat" (not "category") |
| `\B` | Non-word boundary | `\Bcat` matches "category" (not "cat") |

### Groups and Alternation

| Pattern | Meaning | Example |
|---------|---------|---------|
| `(...)` | Capture group | `(\d{3})-(\d{4})` captures area code and number |
| `(?:...)` | Non-capturing group | `(?:https?):` matches http or https |
| `|` | OR alternation | `cat|dog` matches "cat" or "dog" |

## Educational Use Cases

This MicroSim helps students:

1. **Learn Regex Syntax:** Experiment with patterns and see immediate results
2. **Build Pattern Intuition:** Understand what different regex elements match
3. **Debug Patterns:** Test patterns before using them in code
4. **Extract Data:** Practice extracting structured information (emails, phone numbers, dates)
5. **Understand Greedy vs. Lazy:** See how `+` vs `+?` affects matching
6. **Test Edge Cases:** Verify patterns work with unusual inputs

## Practical Applications

Regular expressions are essential for:

- **Data Validation:** Verify email addresses, phone numbers, credit cards
- **Text Extraction:** Pull specific information from logs, documents, web pages
- **Search and Replace:** Find and modify patterns in text editors
- **Log Analysis:** Extract error codes, timestamps, IP addresses
- **Web Scraping:** Find specific patterns in HTML content
- **Chatbot Input Processing:** Extract dates, product codes, tracking numbers from user queries

### Example: Chatbot Query Processing

A conversational AI system might use regex to extract structured data:

**User Query:** "What's the weather next Friday?"

**Regex Extraction:**
- Date pattern: `(next|this)\s+(Monday|Tuesday|...|Sunday)`
- Extracts: "next Friday"
- Can then convert to actual date for weather API call

**User Query:** "Show me details for item SKU-12345"

**Regex Extraction:**
- Product code pattern: `SKU-\d+`
- Extracts: "SKU-12345"
- Can then query product database

## Limitations and Best Practices

### When NOT to Use Regex

- **Parsing HTML/XML:** Use proper parsers (BeautifulSoup, lxml) instead
- **Complex Grammars:** Use dedicated parsing libraries
- **When Simpler Methods Work:** String methods (`.contains()`, `.startsWith()`) are clearer

### Best Practices

1. **Start Simple:** Begin with basic patterns and add complexity gradually
2. **Test Edge Cases:** Try empty strings, special characters, unexpected formats
3. **Use Raw Strings:** In Python, use `r"pattern"` to avoid escaping issues
4. **Comment Complex Patterns:** Explain what each part does
5. **Consider Readability:** Sometimes multiple simple patterns beat one complex pattern

### Common Pitfalls

- **Greedy Matching:** `.*` matches too much; use `.*?` for lazy matching
- **Forgetting to Escape:** `.` matches any character; use `\.` for literal dots
- **Case Sensitivity:** Remember to use the `i` flag if needed
- **Word Boundaries:** `\b` prevents matching inside larger words

## Technical Details

- **Library:** p5.js 1.11.10
- **Regex Engine:** JavaScript RegExp
- **Canvas Size:** 900×750px
- **Browser Compatibility:** All modern browsers
- **Dependencies:** p5.js (loaded from CDN)

## Related Topics

- [Chapter 1: Foundations of AI and NLP](../../chapters/01-foundations-ai-nlp/index.md) - Detailed discussion of text processing and regex
- [Text Processing Workflow](../text-processing-workflow/index.md) - Where regex fits in the NLP pipeline
- String matching techniques
- Grep command for pattern searching in files
- Modern NLP alternatives (semantic search with embeddings)

## References

- Friedl, J. (2006). Mastering Regular Expressions. O'Reilly Media.
- [MDN Web Docs: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Regex101](https://regex101.com/) - Online regex tester with detailed explanations
- [RegExr](https://regexr.com/) - Learn, build, and test regex
- [p5.js Documentation](https://p5js.org/reference/)

## Testing in p5.js Editor

You can test and modify this MicroSim directly in the p5.js online editor:

1. Go to [https://editor.p5js.org/](https://editor.p5js.org/)
2. Copy the contents of `regex-matcher.js`
3. Paste into the editor
4. Click "Play" to run the simulation
5. Modify and experiment with the code

This allows you to understand how the simulation works and create your own variations.
