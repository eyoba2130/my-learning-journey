require('dotenv').config();

const {GoogleGenAI} = require('@google/genai')
// import { GoogleGenAI } from '@google/genai';
// console.log(
//   'API key loaded:',
//   !!process.env.GEMINI_API_KEY
// );
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


async function runExperiment(parasema, userQuestion) {
    const chat = ai.chats.create({
        model: 'gemini-3.1-flash-lite',
        config: {
            systemInstruction: parasema,
        }
    })

    const response = await chat.sendMessage({
        message: userQuestion,
    })
    
    console.log('user', userQuestion);
    console.log('AI', response.text);


}
runExperiment(
  "You are a senior developer.",
  "Explain the use of functions in JavaScript."
);