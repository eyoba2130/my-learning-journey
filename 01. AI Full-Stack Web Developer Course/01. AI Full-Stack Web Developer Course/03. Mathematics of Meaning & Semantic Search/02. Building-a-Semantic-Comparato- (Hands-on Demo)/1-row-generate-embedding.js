import 'dotenv/config' // for esm

import { GoogleGenAI } from "@google/genai";

const GEMINI_EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
throw new Error('GEMINI_API_KEY enviroment variable required');}
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
        console.log(result.embeddings[0].values.splice(0,5));
    } catch (error) {
        console.log(`Error generating embedding`, error);
    }
}

generateEmbedding()


// (A dot B) / (||A|| * ||B||)
function cosineSimilarity(vecA, vecB) {
     
    if (vecA.length != vecB.length) {
        throw new Error('vectors must have the same length');
    
    }
    // dot product 
    let dotProduct = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
    }

    //magnitude 
    let magnitudeA = 0;
    let magnitudeB = 0;
    for (let i = 0; i < vecA.length; i++) {
        magnitudeA += vecA[i] * vecA[i];
    }
    magnitudeA = Math.sqrt(magnitudeA);
    for (let i = 0; i < vecA.length; i++) {
        magnitudeB += vecA[i] * vecA[i];
    }
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
        return0;
    }
    return dotProduct / magnitudeA * magnitudeB;
}

// merge use one for

   


  //Example 
    const vector1 = [1, 2];
    const vector2 = [2, 4]