import db from '../../../../db/db.config.js';

const getConversationRows = async (limit = 5) => {
    const normaliedLimit = parseInt(limit, 10);
    const safeLimit = Number.isNaN(normaliedLimit) || normaliedLimit <= 0 ? 20 : normaliedLimit;
    const [rows] = await db.execute(`SELECT id, role, content, created_at FROM conversations ORDER BY id DESC LIMIT ${safeLimit}`);

    return rows.reverse();
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
