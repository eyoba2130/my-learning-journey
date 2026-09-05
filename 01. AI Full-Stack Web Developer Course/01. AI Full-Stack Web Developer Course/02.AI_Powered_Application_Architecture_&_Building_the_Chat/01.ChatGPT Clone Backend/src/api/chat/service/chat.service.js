export async function createConversationService(question ) {
    // Implementation for creating a conversation
    try {
        //validation logic for question
        if(!question.trim()) {
            const error = new Error('Question is required');
            error.status = 400;
            throw error;
        }
 
        return ({ 'Conversation created successfully': question });
    } catch (error) {
        throw error; 
    }
}

