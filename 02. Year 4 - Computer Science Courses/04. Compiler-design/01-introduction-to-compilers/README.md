# Compiler Design (CoSec3112)

## Chapter 1: Introduction

An introduction to programming languages and compilers: what a compiler is, how it differs from an interpreter, the phases of compilation, the types of compilers, and the tools used to build them.

| Course information | |
|--------------------|---|
| **Prerequisite** | Formal Language and Automata |
| **Lecture** | 2 sessions (Monday, 4:10-5:50 tutorial) |
| **Lab** | 3 hours |

## Table of Contents

- [Learning Objectives](#learning-objectives)
- [1. Programming Languages and Compilers](#1-programming-languages-and-compilers)
- [2. Interpreters](#2-interpreters)
- [3. Compiler vs Interpreter](#3-compiler-vs-interpreter)
- [4. The Language Processing System](#4-the-language-processing-system)
- [5. Compiler Under the Hood: Analysis and Synthesis](#5-compiler-under-the-hood-analysis-and-synthesis)
- [6. Phases of Compilation](#6-phases-of-compilation)
- [7. The Symbol Table](#7-the-symbol-table)
- [8. Types of Compilers](#8-types-of-compilers)
- [9. Compiler Construction Tools](#9-compiler-construction-tools)
- [10. Types of Errors](#10-types-of-errors)
- [Key Takeaways](#key-takeaways)
- [Review Questions](#review-questions)

## Learning Objectives

After this chapter you should be able to:

- Explain what a programming language and a compiler are.
- Distinguish a compiler from an interpreter.
- Describe the analysis (front end) and synthesis (back end) parts of a compiler.
- List and explain each phase of compilation.
- Name the types of compilers and the compiler construction tools.
- Tell lexical, syntax, and semantic errors apart.

---

## 1. Programming Languages and Compilers

- A **programming language** is a notation for describing computation to humans and computers.
- Every piece of software we run is written in a programming language.
- Before it can run, it must be translated into a form the computer understands. The software that does this translation is the **compiler**.

### What is a compiler?

A compiler is a program that reads a program in one language (the **source**) and translates it into another language (the **target**) **without changing the meaning** of the program.

- It can translate a high-level language such as C, C++, or Java into a low-level language (the target or machine program).
- This process is called **compilation**.
- It reports the errors it detects in the source program during translation. All such errors are detected **before execution**, at compile time.
- If the target is an executable machine-language program, a user can then run it to process an input and produce an output.

```
Source program --> [ Compiler ] --> Target program
                        |
                  Error messages

Input --> [ Target program ] --> Output
```

---

## 2. Interpreters

An interpreter is another common kind of language processor.

- It does **not** translate the source into a target program.
- It **directly executes** the operations in the source program on the inputs provided by the user.
- It stops at the first error, which is a **run-time error**.
- Examples: Python, JavaScript, Ruby.

---

## 3. Compiler vs Interpreter

| | Compiler | Interpreter |
|---|----------|-------------|
| Translation | Translates the whole program into a target program | Executes the source directly, line by line |
| Execution speed | Target program is **faster** at mapping input to output | Slower |
| Error diagnostics | Reports errors found at compile time | Gives **better diagnostics**, since it runs the source line by line |
| Errors found | All detected before execution | Stops at the first (run-time) error |
| Examples | C, C++ | Python, JavaScript, Ruby |

**Hybrid example: the Java language processor.** Java source is compiled to bytecode (`.class` files), which the JVM then executes (using a just-in-time compiler to produce machine code):

```
Java source --> compiler --> bytecode (.class) --> JVM --> machine code
```

---

## 4. The Language Processing System

In addition to the compiler, other programs are needed to produce an executable target program. The standard pipeline is:

```
Source program
      |
 [ Preprocessor ]   removes comments, expands macros (#define) and directives
      |
 [ Compiler ]       produces assembly language
      |
 [ Assembler ]      converts assembly language to machine code
      |
 [ Linker ]         combines object files and libraries into one executable
      |
Executable program
```

- **Preprocessor:** removes comments and replaces predefined macros (`#define`) and preprocessor directives in the source file.
- **Assembler:** software that converts assembly language to machine code.
- **Linker:** a system program that combines object files and libraries to create an executable file.

---

## 5. Compiler Under the Hood: Analysis and Synthesis

So far the compiler has been treated as a black box. Inside, the mapping from source to target uses **two parts**:

| Part | Also called | Job |
|------|-------------|-----|
| **Analysis** | Front end | Breaks the source program into pieces, imposes a grammatical structure on them, and checks that the program is lexically and syntactically correct. Creates an **intermediate representation** |
| **Synthesis** | Back end | Produces the desired target program from the intermediate representation and the information in the symbol table |

During analysis, information about the source program is collected and stored in a data structure called the **symbol table**.

---

## 6. Phases of Compilation

```
Source program (character stream)
        |
   [ Scanner ]  ---------------->  tokens
        |
   [ Parser ]  ----------------->  syntactic structure (parse tree)
        |
   [ Semantic analyzer ]  ------>  checked intermediate representation
        |
   [ Intermediate code generator ]  -->  three-address code
        |
   [ Code optimizer ]  --------->  improved intermediate code
        |
   [ Code generator ]  --------->  target machine code

   (The symbol table is used by all phases.)
```

### 6.1 Scanner (lexical analyzer)

- Begins the analysis by reading the source program **character by character**.
- Groups characters into individual words and symbols called **tokens**.
- A **lexical error** occurs when a sequence of characters does not match the pattern of any token.

*Example:* `position = initial + rate * 60` becomes the token stream
`(id,1) (=) (id,2) (+) (id,3) (*) (60)`.

### 6.2 Parser (syntax analyzer)

- Uses the tokens to create a **tree-like intermediate representation** (a parse tree or syntax tree) that shows the grammatical structure of the token stream.

### 6.3 Semantic analyzer

- Checks the meaning of the program.
- An important role is **type checking**: the compiler verifies that every operator has matching operands.
- *Example:* an array index must be an `int`. The analyzer applies a **type conversion** when necessary.

### 6.4 Intermediate code generator

- After analysis, many compilers generate an intermediate representation, also known as **three-address code**.

*Illustration for the example above (the slides show it as a figure):*

```
t1 = inttofloat(60)
t2 = id3 * t1
t3 = id2 + t2
id1 = t3
```

### 6.5 Code optimizer

- Attempts to improve the intermediate code so that **faster target code** results.
- *Example:* the conversion of `60` from integer to floating point can be done **once and for all at compile time**.

```
t1 = id3 * 60.0
id1 = id2 + t1
```

### 6.6 Code generator

- Takes the optimized intermediate code and converts it into the **target program**.
- Registers and memory locations are used to store the variables.

```
LDF  R2, id3
MULF R2, R2, #60.0
LDF  R1, id2
ADDF R1, R1, R2
STF  id1, R1
```

---

## 7. The Symbol Table

- A data structure **maintained throughout all phases** of the compiler.
- All identifier names are stored in it, along with their types.
- It lets the compiler **quickly search** for an identifier's record and retrieve it.

---

## 8. Types of Compilers

| Type | Description | Example |
|------|-------------|---------|
| **Cross-compiler** | Runs on platform A and produces executable machine code for platform B | SDCC (Small Device C Compiler); GCC can be configured as a cross-compiler |
| **Source-to-source compiler** (transpiler / transcompiler) | Translates the source code of one programming language into the source code of another | Converting C++ source code to Java |
| **Native compiler** (host compiler) | Translates source to object code on the same platform where the output is meant to run (same type of computer and operating system) | A typical compiler on your own machine |
| **Decompiler** | Not really a compiler: it does the reverse, converting machine code into a high-level language | |

---

## 9. Compiler Construction Tools

Tools exist to help implement one or more compiler phases:

| Tool | What it does | Example |
|------|--------------|---------|
| **Scanner generator** | Produces lexical analyzers from a regular-expression description of the language's tokens | LEX |
| **Parser generator** | Produces syntax analyzers from a grammatical description (a context-free grammar) of a programming language | Yacc |
| **Compiler-construction toolkit** | Provides an integrated set of routines for building various compiler phases | |
| **Syntax-directed translation engine** | Generates three-address intermediate code from an input that consists of a parse tree | |
| **Automatic code generator** | Generates the machine code for the target platform | |

---

## 10. Types of Errors

The closing slide shows a C++ program with three kinds of errors. Here is the code with the slide's labels:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int x = 1.5;        // semantic error (per the slides)
    int 3a;             // syntax error (per the slides)
    int number = 1.7.6; // lexical error: not a valid numeric literal
    cout << "Hello World! Welcome to your first C++ program!" << endl;
}
```

| Error type | Detected by | Meaning |
|------------|-------------|---------|
| **Lexical** | Scanner | Characters do not match any token pattern (for example `1.7.6`) |
| **Syntax** | Parser | Tokens do not follow the grammar rules |
| **Semantic** | Semantic analyzer | Meaning or type problems (for example mismatched types) |

> **Note:** in real C++, `int x = 1.5;` is accepted with a possible warning (the value is truncated), and `int 3a;` is rejected because `3a` is not a valid identifier, which many texts treat as a lexical error. Treat the slide's labels as classroom examples of the three categories.

---

## Key Takeaways

- A compiler translates a source program into a target program **without changing its meaning** and reports errors at compile time.
- An interpreter executes the source directly; compiled code runs faster, while interpreters give better diagnostics.
- A compiler has an **analysis** (front end) part and a **synthesis** (back end) part.
- The phases are: scanner, parser, semantic analyzer, intermediate code generator, code optimizer, code generator.
- The **symbol table** is shared by all phases.
- Types of compilers: cross, source-to-source, native, and decompiler.
- Tools: LEX (scanners), Yacc (parsers), toolkits, syntax-directed translation engines, and automatic code generators.

## Review Questions

1. Define a compiler. What does it mean to translate "without changing the meaning" of a program?
2. What is the difference between a compiler and an interpreter? Give two examples of each.
3. Why does the Java language processor combine both approaches?
4. What do the preprocessor, assembler, and linker each do?
5. Explain the analysis and synthesis parts. Which is the front end and which is the back end?
6. List the phases of a compiler in order and state the input and output of each.
7. What is a token? Tokenize `position = initial + rate * 60`.
8. What is type checking, and in which phase does it happen?
9. Why is three-address code used, and what does the optimizer improve in the example?
10. What is the symbol table and why is it needed?
11. Compare cross-compilers, native compilers, source-to-source compilers, and decompilers.
12. Which tools generate scanners and parsers? What input does each need?
13. Classify each error: a misspelled keyword token, a missing semicolon, and adding a string to an integer.

## License

For educational use.