import express from "express";


const chatRouter = express.Router();

chatRouter.post('/conversation', (req, res) => {
    res.send("post method is working");
})

chatRouter.get('/conversation', (req, res) => {
    res.send("get method is working");
})

export default chatRouter;
