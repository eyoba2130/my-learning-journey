
import express from "express";
import db from "./db/db.config.js";

const app = express();
app.post("/api/conversations", async (req, res) => {
  res.send("post method is working");
});

app.get("/api/conversations", async (req, res) => {
res.send("get method is working");
});


async function startServer () {
    try {


      const connection = await db.getConnection();
      connection.release();

        app.listen(3000, () => {
          if (err) {
            throw (err);
        }

        console.log("Server is running on http://localhost:3000");
      
})
    } catch (error) {
        console.log("Error server starting", error.message);
    }
}
startServer();