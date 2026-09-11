import db from '../../../../db/db.config.js';
import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getRecentConversationRows = async (limit = 5) => {
    const normaliedLimit = parseInt(limit, 10);
    const safeLimit = Number.isNaN(normaliedLimit) || normaliedLimit <= 0 ? 20 : normaliedLimit;
    const [rows] = await db.execute(`SELECT id, role, content, created_at FROM conversations ORDER BY id DESC LIMIT ${safeLimit}`);

    return rows.reverse();
};

const generateAssistantAnswer = async ({ historyRows, question }) => {
    const contents = historyRows.map(row => ({
        role: row.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: row.content }],
    }));

    contents.push({
        role: 'user',
        parts: [{ text: question }],
    });

    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: contents,
    });

    return {
        text: response.text,
        totalTokens: response.usageMetadata?.totalTokenCount || 0
    };
};

const getMessageById = async messageId => {
    const [rows] = await db.execute(
        'SELECT id, role, content, token_count, created_at FROM conversations WHERE id = ? LIMIT 1', 
        [messageId]
    );
    if (!rows[0]) return null;
    return {
        id: rows[0].id,
        role: rows[0].role,
        content: rows[0].content,
        tokenCount: Number(rows[0].token_count || 0),
        createdAt: rows[0].created_at,
    };
};

export async function createConversationService({ question }) {
    try {
        if (!question || !question.trim()) {
            const error = new Error('Question is required');
            error.status = 400;
            throw error;
        }

       const historyRows = await getRecentConversationRows(5);
        const [result] = await db.execute(
            'INSERT INTO conversations (role, content) VALUES (?, ?)', 
            ['user', question]
        );

        const assistantAnswer = await generateAssistantAnswer({ historyRows, question });

        const [assistantResult] = await db.execute(
            'INSERT INTO conversations (role, content, token_count) VALUES (?, ?, ?)', 
            ['assistant', assistantAnswer.text, assistantAnswer.totalTokens]
        );

        const userConversation = await getMessageById(result.insertId);
        const assistantConversation = await getMessageById(assistantResult.insertId);

        return {
            userConversation,
            assistantConversation,
        };
    } catch (error) {
        throw error;
    }
}