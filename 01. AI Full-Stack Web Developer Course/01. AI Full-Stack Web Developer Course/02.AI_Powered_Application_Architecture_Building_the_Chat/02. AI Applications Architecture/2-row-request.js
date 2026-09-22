require('dotenv').config();

const {GoogleGenAI} = require('@google/genai')
// import { GoogleGenAI } from '@google/genai';
// console.log(
//   'API key loaded:',
//   !!process.env.GEMINI_API_KEY
// );
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {

  const response1 = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: 'why is the sky blue?',

});
 console.log(response1.text);
const response2 = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: 'why is the sky blue?',

});
 console.log(response2.text);    
}
// run();

async function testChatHistory() {
  const chat = ai.chats.create({
    model: 'gemini-3.1-flash-lite',
  })
  const response = await chat.sendMessage({
    message: 'hello. my name is eyu',
  })
  console.log('user', 'hello, may name is Eyu'); 
  console.log('AI', response.text);
    
  
const history = await chat.getHistory();
console.log('History:', history);
console.log('Second message parts:', history[1].parts);
}
testChatHistory();

async function testChatHistory2() {
  const chat = ai.chats.create({
    model: 'gemini-3.1-flash-lite',
    history: [
      { role: 'user', parts: [{ text: 'hello, my name is Eyu' }] },
    { role: 'model', parts: [{ text: 'AI Hello, Eyu! It’s nice to meet you. How are you doing today? Is there anything I can help you with?' }] },
    ],
    
  });
  const response = await chat.sendMessage({
    message: 'hello. my name is eyu',
  })
  console.log('user', 'hello, may name is Eyu'); 
  console.log('AI', response.text);
    //   console.log(chat.getHistory);
    
    const history = chat.getHistory;
  console.log(history);
  // console.log(history[1].parts);
}
testChatHistory2();