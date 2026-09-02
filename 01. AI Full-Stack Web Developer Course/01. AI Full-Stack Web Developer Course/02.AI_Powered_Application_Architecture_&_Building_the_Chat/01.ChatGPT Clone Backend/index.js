import express from "express";
const app = express();


function logger(req, res, next) {
    const url = req.url;
    const method = req.method;
    console.log(url, method);
    next();
}

// function loggerSecond(req, res, next) {
  
//    console.log("Second middleware:");
//     next();
     
// }

function errorHandler(err, req, res, next) {
    console.log(err.message);
    res.status(500).send("Something went wrong!");
}
app.use("/api", logger);


app.get("/",(req, res) => {
    res.send("Hello World for home page");
});

app.get("/about", (req, res) => {
    throw new Error("Error in about page");
    res.send("Hello World for about page");
});

app.get("/api/chat", (req, res) => {
    res.send("Hello World for route chat");
});
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})