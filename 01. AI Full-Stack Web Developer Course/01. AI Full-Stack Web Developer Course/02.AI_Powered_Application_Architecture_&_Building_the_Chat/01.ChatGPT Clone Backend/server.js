
import express from "express";
import db from "./db/db.config.js";
import mainRouter from "./src/api/main.routes.js"
const app = express();

app.use(express.json());

//api
app.use('/api', mainRouter)


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