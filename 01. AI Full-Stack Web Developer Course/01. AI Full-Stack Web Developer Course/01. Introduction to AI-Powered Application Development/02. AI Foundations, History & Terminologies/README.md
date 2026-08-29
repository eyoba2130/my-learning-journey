# AI Foundations, History & Terminology

> AI is not magic and it's not just a chatbot — it's a way of building software systems that recognize patterns, make predictions, generate content, and support human decision-making.

## Table of Contents
- [1. Understanding Intelligence](#1-understanding-intelligence)
- [2. Brief History of AI](#2-brief-history-of-ai)
- [3. Types of AI & Key Concepts](#3-types-of-ai--key-concepts)
- [4. How LLMs Actually Work](#4-how-llms-actually-work)

---

## 1. Understanding Intelligence

**Simple definition:** Intelligence is the ability to understand a situation, connect ideas, learn from experience, and solve problems to achieve a goal. It's more than memorizing facts — it's using information usefully.

### Natural vs. Artificial Intelligence

| Concept | Natural Intelligence | Artificial Intelligence |
|---|---|---|
| Physical basis | Brain, nerves, senses, body | Software, hardware, data, algorithms |
| Learning source | Experience, teaching, feedback | Training data, optimization, prompts |
| Strength | Common sense, flexibility, emotion | Speed, scale, pattern recognition |
| Weakness | Slow calculation, bias, fatigue | Hallucination, no lived experience |
| Example | A chef adjusting a recipe by taste | A recommendation engine predicting movies |

**Developer takeaway:** Human intelligence is flexible and general; AI is powerful but usually narrow and task-specific.

### Everyday Examples of AI
- Recommendation engines (Netflix, YouTube, TikTok)
- Spam filters
- Navigation apps (traffic prediction)
- Code assistants (GitHub Copilot, Cursor)
- Customer support bots
- Semantic search

---

## 2. Brief History of AI

| Period | Main Idea | Why It Mattered |
|---|---|---|
| **1950s — The Dream** | Turing's "Imitation Game" (1950); term "Artificial Intelligence" coined at Dartmouth (1956) | AI became a formal research field, built on Symbolic AI (hand-coded rules) |
| **Rule-Based Era** | If-then logic and expert systems | Worked for narrow tasks, failed on messy real-world problems |
| **AI Winters** | Funding collapsed after inflated promises went unmet | Proved intelligence couldn't be solved by hand-written rules alone |
| **2010s — Deep Learning Boom** | Big Data + fast GPUs enabled neural networks | Massive gains in image recognition, speech, translation |
| **2017 — Transformer Era** | Google's *"Attention Is All You Need"* paper | Foundation for GPT and nearly all modern LLMs |
| **Modern AI Apps** | Developers call models via APIs | AI moved from research labs into everyday software |

### Why Rule-Based AI Failed
Trying to hand-write every rule (like every driving rule) breaks down because real life has too many exceptions. Machine learning solved this by letting computers learn patterns from data instead.

### Why Transformers Mattered
Older models read text sequentially, word by word. Transformers let a model "pay attention" to an entire sequence at once — better grasping context (e.g., knowing "bank" means *riverbank* vs. *financial bank* depending on surrounding words). The "T" in GPT stands for **Transformer**.

---

## 3. Types of AI & Key Concepts

### 3.1 The Layers of AI (Nested Circles)

```
Artificial Intelligence
 └── Machine Learning
      └── Deep Learning
           └── Generative AI
```

Every inner circle is a more specific case of the outer one.

| Layer | Description | Examples |
|---|---|---|
| **AI** | Broadest term — any technique making computers act "intelligently," rule-based or not | Chess programs, spam filters, thermostats |
| **Machine Learning** | Computer learns patterns from data instead of hard-coded rules | Spam detection, recommendations, fraud detection |
| **Deep Learning** | ML using multi-layered neural networks, good for complex data | Face recognition, speech-to-text, translation |
| **Generative AI** | Deep Learning that *creates* new content instead of just classifying | ChatGPT, Claude, DALL·E, GitHub Copilot |

**Key distinction:** Traditional/discriminative models *classify* ("Is this a cat or dog?"). Generative models *create* ("Draw a cat that's never existed").

### 3.2 What Is a Model?

- **The Process (verb):** Training — like a student studying thousands of practice problems.
- **The Model (noun):** The result — the student's brain after studying, packed with learned patterns.
- **Inference:** Using the trained model on new input, like a student answering a new exam question.

> Technical note: A model file often contains billions of learned numbers. Hosted APIs run the model for you — you don't download it.

### 3.3 Levels of Intelligence

| Level | Nickname | Description | Status |
|---|---|---|---|
| **ANI** | "The Specialist" | Excellent at one narrow task, useless outside it | **Current reality** — includes Siri, ChatGPT, Claude, AlphaGo |
| **AGI** | "Human Level" | Can perform any intellectual task a human can | Theoretical / research goal |
| **ASI** | Superintelligence | Surpasses human intelligence in every domain | Purely speculative |

**Reminder:** Sounding human ≠ having human common sense, memory, or understanding.

### 3.4 Foundation Models

Large, general-purpose models trained on broad data, then adapted via prompts, tools, or fine-tuning instead of building a new model per task.

| Model Type | Focus | Example Use |
|---|---|---|
| Large Language Models | Text and code | Chatbots, summarizers, coding assistants |
| Vision models | Images/video | Object detection, image generation |
| Audio models | Speech/sound | Transcription, voice assistants |
| Multimodal models | Multiple types combined | Reading a screenshot and explaining an error |

---

## 4. How LLMs Actually Work

**Core idea:** LLMs are *token predictors*, not databases. They repeatedly predict the most likely next token based on the prompt and prior tokens.

### 4.1 The Next-Token Game
The model calculates probabilities for the next token, picks one, appends it, and repeats — building a response piece by piece.

### 4.2 Tokens
Text is broken into tokens (whole words, word fragments, punctuation). Token count affects **cost**, **context limits**, and **speed**.

### 4.3 Context Window
The total text the model can "see" in one request — system instructions, chat history, current message, retrieved data, and examples. Think of it as a whiteboard: the model only reasons over what's currently written on it.

> **Developer lesson:** The model has no memory beyond the current request. For persistent memory, store data externally and re-send relevant parts.

### 4.4 Temperature

| Setting | Behavior | Good For |
|---|---|---|
| Low | Precise, predictable | Code, math, structured JSON |
| Medium | Balanced, conversational | Chatbots, tutoring |
| High | Creative, varied | Brainstorming, stories, marketing |

### 4.5 Hallucinations
A hallucination is a confident-sounding but false or invented answer — the model generates *likely* text, not *verified* truth. This matters especially in coding, where a model might invent nonexistent packages or functions.

---

## Rule for Developers

> **AI is a co-pilot, not the captain.** Never accept code or explanations you can't explain, test, or verify.

The goal isn't to memorize every AI term — it's to internalize that AI-powered apps are still software applications. The model is powerful, but developers still own the UI, backend flow, database design, prompts, validation, testing, and overall user experience.