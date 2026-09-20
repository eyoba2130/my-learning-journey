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
            contents: text,
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
    // for (let i = 0; i < vecA.length; i++) {
    //     magnitudeA += vecA[i] * vecA[i];
    // }
    // magnitudeA = Math.sqrt(magnitudeA);
    // for (let i = 0; i < vecA.length; i++) {
    //     magnitudeB += vecA[i] * vecA[i];
    // }
    // magnitudeB = Math.sqrt(magnitudeB);

    // if (magnitudeA === 0 || magnitudeB === 0) {
    //     return0;
    // }
    // return dotProduct / magnitudeA * magnitudeB;



    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        magnitudeA += vecA[i] * vecA[i];
        magnitudeB += vecB[i] * vecB[i]; 
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);

}   

//   //Example
    const vector1 = [1, 2];
    const vector2 = [2, 4]

// cosineSimilarity(vector1, vector2);
console.log(cosineSimilarity(vector1, vector2));


async function compareText() {
    const text1 = 'what is html in web development?';
    const text2 = 'what is  hyper text markup language?';
    const text3 = 'Nirobi the capital of kenya.';
const result1 = await ai.models.embedContent({
            model: GEMINI_EMBEDDING_MODEL,
            contents: text1,
            config: {
                taskType: "SEMANTIC_SIMILARITY",
            },
        })

    const result2 = await ai.models.embedContent({
            model: GEMINI_EMBEDDING_MODEL,
        contents: text2,
        config: {
                taskType: "SEMANTIC_SIMILARITY",
            },
            
           
        })
const result3 = await ai.models.embedContent({
            model: GEMINI_EMBEDDING_MODEL,
            contents: text3,
           config: {
                taskType: "SEMANTIC_SIMILARITY",
            },
        })
    const v1 = result1.embeddings[0].values;
    const v2 = result2.embeddings[0].values;
    const v3 = result3.embeddings[0].values;


    const v1Andv2 = cosineSimilarity(v1, v2);
    console.log('v1Andv2', v1Andv2)

   const v1Andv3 = cosineSimilarity(v1, v3);
    console.log('v1Andv3', v1Andv3)    
};
compareText();
