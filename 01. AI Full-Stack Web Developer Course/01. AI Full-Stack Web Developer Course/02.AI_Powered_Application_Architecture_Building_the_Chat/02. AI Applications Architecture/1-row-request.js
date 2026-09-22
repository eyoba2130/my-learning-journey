require('dotenv').config();

const {GoogleGenAI} = require('@google/genai')
// import { GoogleGenAI } from '@google/genai';
// console.log(
//   'API key loaded:',
//   !!process.env.GEMINI_API_KEY
// );
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: 'why is the sky blue?',

});
 console.log(response.text);
    
}
// run();
async function createChat() {
  const chat = ai.chats.create({
    model: 'gemini_2.0_flash_lite',
  })
  const response = await chat.sendMessage({
    message: 'hello. my name is eyu',
  })
  console.log(response.text);
  // console.log(response.usageMetaData);
 }
createChat();