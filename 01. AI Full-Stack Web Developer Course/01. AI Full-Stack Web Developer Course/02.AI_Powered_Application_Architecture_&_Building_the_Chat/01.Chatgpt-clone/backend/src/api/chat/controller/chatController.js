import { createConversationService } from '../service/chat.service.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite';

const createGeminiClient = () => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not set in the environment variables');
    }
    return new GoogleGenerativeAI({apiKey: process.env.GEMINI_API_KEY, model: GEMINI_MODEL});
};

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