import 'dotenv/config' // for esm

import { GoogleGenAI } from "@google/genai";

const GEMINI_EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    throw new error('GEMINI_API_KEY enviroment variable required')
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateEmbedding() {
    const text = 'hello, this is vector embedding';
    try {
        const result = await ai.models.embedContent({
            model: GEMINI_EMBEDDING_MODEL,
            content: text,
            config: {
                outputDimensionality: 768,
            },
        })
        console.log(result.embeddings[0].values);
    } catch (error) {
        console.log(`Error generating embedding`, error);
    }
}

generateEmbedding()