import db from '../../../../db/db.config.js';
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
       await db.execute('INSERT INTO conversations (content) VALUES (?)', [question]);
        
    return `Conversation created successfully: ${question}`;

    } catch (error) {
        throw error;
    }
}
