
import express from "express";
import db from "./db/db.config.js";
import mainRouter from "./src/api/main.routes.js"
import errorHandler from "./src/middleware/errorHandler.js";
const app = express();

//middleware required to parse the incoming request body as JSON
app.use(express.json());
//api
app.use('/api', mainRouter)
//error handler middleware
app.use(errorHandler);

async function startServer() {
  
    try {

      const connection = await db.getConnection();

      console.log("db connected")
      connection.release();

        app.listen(3000, () => {
       
        console.log("Server is running on http://localhost:3000");
      
})
    } catch (error) {
        console.log("Error server starting", error.message);
    }
}

startServer();