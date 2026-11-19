# Compiler Design (CoSc4103)

## Chapter 2: Lexical Analysis

Department of Computer Science, 3 Cr. Hrs. / 5 ECTS

This chapter covers the first phase of a compiler: how the lexical analyzer (scanner) turns source code into tokens, how tokens are specified with regular expressions, how they are recognized with transition diagrams, how lexical errors are recovered from, and how lexical analyzer generators automate the work.

## Table of Contents

- [Learning Objectives](#learning-objectives)
- [2.1 Lexical Analysis](#21-lexical-analysis)
- [2.2 Tokens, Lexemes and Non-Tokens](#22-tokens-lexemes-and-non-tokens)
- [2.3 Roles of the Lexical Analyzer](#23-roles-of-the-lexical-analyzer)
- [2.4 Token Specification](#24-token-specification)
- [2.5 Recognition of Tokens](#25-recognition-of-tokens)
- [2.6 Transition Diagrams (State Machines)](#26-transition-diagrams-state-machines)
- [2.7 Error Recovery](#27-error-recovery)
- [2.8 Lexical Analyzer Generators](#28-lexical-analyzer-generators)
- [2.9 DFA Analysis (Reading Assignment)](#29-dfa-analysis-reading-assignment)
- [Key Takeaways](#key-takeaways)
- [Review Questions](#review-questions)

## Learning Objectives

After this chapter you should be able to:

- Define lexical analysis and explain the role of the lexical analyzer.
- Distinguish lexemes, tokens, and non-tokens.
- Specify tokens using alphabets, strings, languages, and regular expressions.
- Recognize tokens with transition diagrams.
- Apply error-recovery methods for lexical errors.
- Describe how a lexical analyzer generator works.

---

## 2.1 Lexical Analysis

**Lexical analysis (scanning)** is the first compiler phase. It reads the source code **character by character** and groups the characters into **lexemes**.

- **Lexeme:** a sequence of characters in the source code that matches the pattern for a token.
- For each lexeme, the lexical analyzer outputs a token of the form:

```
<token-name, attribute-value>
```

| Part | Meaning |
|------|---------|
| **Token-name** | An abstract symbol used in syntax analysis |
| **Attribute-value** | Points to an entry in the symbol table |

### Example

Source code: `position = initial + rate * 60`

- `position` is a lexeme mapped to the token `<id, 1>`, where `id` is an abstract symbol for "identifier" and `1` points to the symbol table entry for `position`.
- The assignment symbol `=` is mapped to the token `<=>`. It needs no attribute value.

After lexical analysis, the statement becomes the token sequence:

```
<id,1> <=> <id,2> <+> <id,3> <*> <60>
```

### Input and output

The lexical analyzer takes a source program as input and produces a **stream of tokens** as output (or an error message).

```
Source: while (j>0) { j=j+2 }
                |
        [ Lexical Analyzer ] ---> Error message
                |
Lexeme stream: while ( j > 0 ) { j = j + 2 }
```

---

## 2.2 Tokens, Lexemes and Non-Tokens

A **token** is an abstract symbol, or category, representing a kind of lexical unit.

### Common token types

| Token type | Description | Examples |
|------------|-------------|----------|
| **Keywords** | Reserved words with special meaning | `if`, `else`, `while`, `for`, `int`, `class` |
| **Identifiers** | Names for variables, functions, classes | `x`, `y`, `myVariable`, `calculateSum` |
| **Operators** | Symbols that perform operations | `+`, `-`, `*`, `/`, `=`, `==`, `>` |
| **Constants / literals** | Values written directly in the code | `5`, `3.14`, `"Hello"`, `true` |
| **Punctuation / separators** | Symbols that structure the code | `;`, `(`, `)`, `{`, `}`, `[`, `]`, `:`, `.` |

### Example: lexemes and tokens for `c = a + b * 5`

| Lexeme | Token |
|--------|-------|
| `c` | IDENTIFIER |
| `=` | ASSIGNMENT OPERATOR |
| `a` | IDENTIFIER |
| `+` | ARITHMETIC OPERATOR |
| `b` | IDENTIFIER |
| `*` | ARITHMETIC OPERATOR |
| `5` | INTEGER |

### Non-tokens

These are removed or handled by the scanner and are **not** passed to the parser:

| Type | Example |
|------|---------|
| Comment | `// This is a single line comment` |
| Preprocessor directive | `#include <stdio.h>` |
| Preprocessor directive | `#define NUM 10` |
| Macro | `NUM` |
| White space | `\n`, `\t` |

---

## 2.3 Roles of the Lexical Analyzer

| Role | Description |
|------|-------------|
| **Tokenization** | Converts source code into a sequence of tokens |
| **Token recognition** | Identifies keywords, identifiers, operators, and literals |
| **Whitespace removal** | Ignores unnecessary spaces, tabs, and newlines |
| **Comment removal** | Skips comments in the source code |
| **Symbol table interaction** | Helps record identifiers and related information |
| **Error detection** | Detects lexical errors such as invalid characters or malformed tokens |
| **Input buffering** | Reads source code efficiently, character by character or in blocks |
| **Passing tokens to the parser** | Supplies tokens to the syntax analyzer for further processing |

---

## 2.4 Token Specification

**Token specification** is the set of rules that define the pattern of characters forming a valid token. In compiler design, token specifications are written as **regular expressions**. The building blocks are: alphabet, string, language, and regular expression.

### Alphabet (Σ)

A finite, non-empty set of symbols, such as the characters allowed to build strings.

- `Σ = {0, 1}` (binary alphabet)
- `Σ = {a, b, c, ..., z}` (lowercase English letters)
- `Σ = {A, B, C, ..., Z}` (uppercase English letters)

Symbols commonly used by programming languages:

| Category | Symbols |
|----------|---------|
| Arithmetic operators | `-` `+` `*` `/` `%` |
| Assignment operators | `=` `+=` `-=` `*=` `/=` `%=` |
| Punctuation and delimiters | `;` `,` `.` `:` `::` `(` `)` `{` `}` `[` `]` `"` `'` `\` |
| Other symbols | `@` `$` `?` `#` `_` |

### String

- A finite sequence of symbols taken from the alphabet. **Order matters.**
- The **empty string**, written **ε** (epsilon), has zero symbols.
- Examples over `Σ = {0, 1}`: `0, 1, 00, 01, 10, 11, 001, ...`

### Language (L)

A set of strings formed from an alphabet. A language can be **finite or infinite**.

- `L = {0, 1, 00, 11}` is a finite language of four strings.
- `L = {0, 00, 000, 0000, ...}` is an infinite language: all strings of only zeros.

### Operations on languages

| Operation | Definition |
|-----------|------------|
| **Union** of L and M | `L ∪ M = { s \| s is in L or s is in M }` |
| **Concatenation** of L and M | `LM = { st \| s is in L and t is in M }` |
| **Kleene closure** of L | `L* = L⁰ ∪ L¹ ∪ L² ∪ ...` (zero or more concatenations of L) |
| **Positive closure** of L | `L⁺ = L¹ ∪ L² ∪ ...` (one or more concatenations of L) |

> The slide leaves the Kleene and positive closure definitions blank. The definitions above are the standard ones.

### Regular expressions

A regular expression is a sequence of characters that defines a search pattern. It describes a set of strings (a language) concisely.

**Example:** the language of C++ identifiers:

```
letter_ (letter_ | digit)*
```

### Regular definitions

C++ identifiers are strings of letters, digits, and underscores:

```
letter_  ->  A | B | ... | Z | a | b | ... | z | _
digit    ->  0 | 1 | ... | 9
id       ->  letter_ ( letter_ | digit )*
number   ->  digit+
```

Using shorthand character classes:

```
letter_  ->  [A-Za-z_]
digit    ->  [0-9]
id       ->  letter_ ( letter_ | digit )*
```

---

## 2.5 Recognition of Tokens

After expressing token patterns with regular expressions, the next step is to **recognize** them in the input.

### Whitespace

The lexical analyzer also strips out white space by recognizing the token `ws`:

```
ws  ->  ( blank | tab | newline )+
```

Unlike other tokens, `ws` is **not returned to the parser**. The lexical analysis simply restarts from the character that follows the whitespace.

### Tokens, patterns, and attribute values

| Lexemes | Token name | Attribute value |
|---------|------------|-----------------|
| Any `ws` | - | - |
| `if` | `if` | - |
| `else` | `else` | - |
| Any `id` | `id` | Pointer to symbol table |
| Any `number` | `number` | Pointer to symbol table |
| `<` | `relop` | `LT` |
| `<=` | `relop` | `LE` |
| `>` | `relop` | `GT` |
| `>=` | `relop` | `GE` |
| `==` | `relop` | `EQ` |
| `!=` | `relop` | `NE` |

---

## 2.6 Transition Diagrams (State Machines)

A **state machine** is a model that moves between states according to the input symbols it reads. It helps the lexer recognize token patterns. A **transition diagram** is a way to visualize it. As an intermediate step in building a lexical analyzer, patterns are converted into stylized flowcharts called transition diagrams.

### Core components

| Component | Meaning |
|-----------|---------|
| **States** (circles) | Conditions or milestones reached while scanning characters to match a token pattern |
| **Start state** | The initial node, marked by an incoming arrow labeled `start` |
| **Edges** (directed arrows) | Connect states; labeled with the character or character class that triggers the transition |
| **Accepting states** (double circles) | A valid, complete token has been recognized |
| **Retract mark (`*`)** | Placed on an accepting state when the input pointer must back up one character because it read too far |

### Retract example: `add*2`

Assume the analyzer uses a transition diagram to recognize identifiers.

1. It reads `a`, `d`, `d`, which form the identifier `add`.
2. It reads the next character, `*`, to see whether the identifier continues.
3. `*` cannot be part of an identifier, so the analyzer has read **one character too far**.
4. It **retracts** the input pointer by one character so `*` can be processed as the next token.

> The slides include a transition diagram for `relop` (`<`, `<=`, `>`, `>=`, `==`, `!=`) as a figure. See the original slides for the picture.

---

## 2.7 Error Recovery

A compiler checks source code against the rules of the language (lexical, syntax, and semantic). A violation is an error.

A naive compiler could stop at the very first error, but that is inefficient: the developer would fix one error, recompile, find the next, and so on. The goal of **error recovery** is to continue processing after an error so that **as many independent errors as possible** are reported in a single compilation run.

### Why it matters

| Benefit | Meaning |
|---------|---------|
| **Efficiency** | Saves developer time by reporting multiple errors at once |
| **Completeness** | Finds errors in later parts of the code that may be unrelated to the first |
| **Usability** | Gives a much better experience for the programmer |

### Methods to recover from lexical errors

| Method | Description | Example |
|--------|-------------|---------|
| **Panic-mode recovery** | Skip invalid characters until a valid character or suitable point to resume scanning is found | Input `ab@cd`: skip `@` and continue |
| **Deleting an extra character** | Remove an invalid or unnecessary character | `int a = 10#;` delete `#` |
| **Inserting a missing character** | Insert a character needed to form a valid token | `cout << "hello;` insert the closing quote |
| **Replacing an incorrect character** | Replace an invalid character with a valid one | `int a = 10$;` replace `$` with `;` |

---

## 2.8 Lexical Analyzer Generators

A **lexical analyzer generator** is a tool that automatically generates the lexical analyzer (lexer or scanner) from a set of rules, typically regular expressions. The generated lexer reads source code and converts it into a sequence of tokens.

### Examples

| Tool | Description |
|------|-------------|
| **Lex** | Traditional generator commonly used on Unix systems |
| **Flex** | A fast, widely used alternative to Lex |
| **JFlex** | A lexical analyzer generator for Java |
| **ANTLR** | A parser generator that also supports lexer generation |

### How it works

1. The programmer defines tokens using **regular expressions**.
2. The generator converts the rules into scanner code, typically using **finite automata**.
3. The generated scanner reads the input source program.
4. It matches character sequences against the token patterns.
5. It executes the corresponding **action** for each match.
6. It produces tokens for the parser, or reports invalid characters.

```
Token rules (regular expressions)
          |
 [ Lexical analyzer generator ]
          |
  Generated scanner (finite automaton)
          |
Source program --> [ Scanner ] --> tokens --> Parser
```

---

## 2.9 DFA Analysis (Reading Assignment)

The slides assign two reading topics: **defining DFA analysis**, and **the role of a DFA in a lexical analyzer generator**.

A starting point for your reading (not from the slides):

- A **DFA (deterministic finite automaton)** has a finite set of states, an input alphabet, one start state, a set of accepting states, and a transition function that gives **exactly one** next state for each state and input symbol.
- A generator typically converts regular expressions into an NFA, then into a DFA, and may minimize the DFA.
- The DFA is then turned into scanner code or tables. Because each input character causes exactly one transition, the scanner runs in time proportional to the input length.

---

## Key Takeaways

- The lexical analyzer reads characters, groups them into **lexemes**, and outputs **tokens** `<token-name, attribute-value>`.
- Whitespace, comments, preprocessor directives, and macros are **non-tokens**.
- Tokens are specified with **regular expressions** built from alphabets, strings, and languages.
- Transition diagrams recognize tokens; a retract mark handles reading one character too far.
- Error recovery (panic mode, delete, insert, replace) lets the compiler report many errors in one run.
- Generators such as **Lex, Flex, JFlex, and ANTLR** build scanners from regular expressions using finite automata.

## Review Questions

1. Define lexical analysis, lexeme, and token. How do they differ?
2. Write the token sequence for `position = initial + rate * 60`.
3. List five roles of the lexical analyzer.
4. Give four examples of non-tokens.
5. Define alphabet, string, language, and the empty string ε.
6. Given `L = {a, b}` and `M = {0, 1}`, compute `L ∪ M` and `LM`.
7. Write a regular definition for C++ identifiers and for numbers.
8. Why is the token `ws` not returned to the parser?
9. What does the retract mark `*` mean? Trace `add*2`.
10. Why is error recovery important? Describe the four lexical recovery methods with an example each.
11. How does a lexical analyzer generator work? Name three such tools.
12. What is the role of a DFA in a lexical analyzer generator?

## License

For educational use.