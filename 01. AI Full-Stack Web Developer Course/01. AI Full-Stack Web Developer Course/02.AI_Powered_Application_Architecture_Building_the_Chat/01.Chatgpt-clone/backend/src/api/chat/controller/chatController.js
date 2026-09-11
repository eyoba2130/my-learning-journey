import { createConversationService, getRecentConversationRows } from '../service/chat.service.js';

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
        const result = await getRecentConversationRows(100);
        res.status(200).json({
            sucess: true,
            message: 'conversation fetched sucessfully',
            data: result,
        });
    } catch (error) {
        throw error; // Pass the error to the error handler middleware
    }
}  