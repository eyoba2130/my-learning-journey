import express from "express";
import db from './db/database.js';
const app = express();

async function startServer() {
    try {
      const connection = await db.getConnection();

      console.log("db connected")
      connection.release();

        app.listen(3300, () => {
       
        console.log("Server is running on http://localhost:3000");
      
})
    } catch (error) {
       console.log("Error server starting", error.message);

    }
    
}
startServer();