

import express from "express";
import db from "./db/db.config.js";

const app = express();

async function startSever () {
    try {


        const connection = await db.authenticate();
        console.log("Database connected successfully");
        app.listen(3000, () => {
          if (err) {
            throw (err);
        }

        console.log("Server is running on http://localhost:3000");
      
})
    } catch (error) {
        console.log("Eroo server starting", error.message);
    }
}
startSever();

