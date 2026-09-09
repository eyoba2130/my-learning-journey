import db from '../../../../db/db.config.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite';

const geminiClient = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY, model: GEMINI_MODEL });
const getConversationRows = async (limit = 5) => {
    const normaliedLimit = parseInt(limit, 10);
    const safeLimit = Number.isNaN(normaliedLimit) || normaliedLimit <= 0 ? 20 : normaliedLimit;
    const [rows] = await db.execute(`SELECT id, role, content, created_at FROM conversations ORDER BY id DESC LIMIT ${safeLimit}`);

    return rows.reverse();
};

const generateAssistantAnswer = async ({
    historyRows, question }) => {

    const formattedHistory = historyRows.map(row => ({
        role: row.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: row.content }],
    }))
    
    const chat = geminiClient.chats.create({
        model: GEMINI_MODEL,
        history: formattedHistory,
    })
    const result = await chat.sendMessage({ message: question });
    return result.content;
};




export async function createConversationService({ question }) {
    // Implementation for creating a conversation
    try {
        //validation logic for question
        if(!question.trim()) {
            const error = new Error('Question is required');
            error.status = 400;
            throw error;
        }
        //save to db
    //    await db.execute('INSERT INTO conversations (content) VALUES (?)', [question, ]);
        
        // await db.execute('INSERT INTO chatgpt_clone.conversations (content) VALUES (?)', [question])  

      //get recent 5 conversations from db
        const historyRows = await getConversationRows(5);
        // return `Conversation created successfully: ${question}`;
        
        //insert new conversation into db
        const [result] = await db.execute('INSERT INTO conversations (role, content) VALUES (?, ?)', ['user', question]);
        
        return {
            history: historyRows,
        };
    } catch (error) {
        throw error;
    }
}
