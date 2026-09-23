require('dotenv').config();
const { GoogleGenAI } = require('@google/genai')
// import { GoogleGenAI } from '@google/genai';
console.log(
  'API key loaded:',
  !!process.env.GEMINI_API_KEY
);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {

  const chat =  ai.chats.create({
    model: 'gemini-3.1-flash-lite',
      
  })
  const stream = await chat.sendMessageStream({
    message:'Explain why use arrow function in javascript?'
  })
  // console.log(stream);
  for await (const chunk of stream) {
      // console.log(chunk)
    console.log(chunk.text);
    
    //time slowly /time limit
    await new Promise(resolve => setTimeout(resolve,50))
    }
    
}
run();