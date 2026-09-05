
export function createConversationController(req, res) {
   console.log(req.body); // Access the request body
    res.send("post method is working");
}

export function getConversationController(req, res) {
    res.send("get method is working");
}