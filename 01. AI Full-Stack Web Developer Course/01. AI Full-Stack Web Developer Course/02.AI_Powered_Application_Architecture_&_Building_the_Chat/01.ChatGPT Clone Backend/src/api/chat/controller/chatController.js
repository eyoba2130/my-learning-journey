
export async function createConversationController(req, res) {
    console.log(req.body); // Access the request body
    
    try {
        console.log(req.body); // Log the request body to the console
    } catch (error) {
        throw error; // Pass the error to the error handler middleware 
    }
}

export async function getConversationController(req, res) {
    try {
        console.log(req.body); // Log the request body to the console
    } catch (error) {
        throw error; // Pass the error to the error handler middleware 
    }
}