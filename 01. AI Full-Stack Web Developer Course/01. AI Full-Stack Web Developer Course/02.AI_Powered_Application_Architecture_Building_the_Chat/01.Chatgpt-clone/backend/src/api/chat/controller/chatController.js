import { createConversationService } from '../service/chat.service.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite';

const geminiClient = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY, model: GEMINI_MODEL });

async function main() {
    try {
        //  geminiClient model 
        const model = geminiClient.getGenerativeModel({ model: GEMINI_MODEL });

        const result = await model.generateContent('Explain the concept of artificial intelligence in simple terms.');
        const response = await result.response;
        
        console.log(response.text());
    } catch (error) {
        console.error("Gemini Error:", error);
    }
}
main();
export async function createConversationController(req, res) {
    
    try {
        const { question } = req.body;
       const result = await createConversationService({ question });
        res.status(201).send({
            success: true,
            message: 'Conversation created successfully',
            data: result,

       });
    } catch (error) {
        throw error; // Pass the error to the error handler middleware
    }
}

 export async function getConversationController(req, res) {
    try {
        res.send({ message: 'Get conversation controller' });
    } catch (error) {
        throw error; // Pass the error to the error handler middleware
    }
}  