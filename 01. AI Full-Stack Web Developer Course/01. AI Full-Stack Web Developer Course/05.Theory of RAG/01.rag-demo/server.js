import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { db } from './db/db.config.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3788;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Verify the DB connection before accepting traffic, then start listening
const startServer = async () => {
  try {
    const connection = await db.getConnection();
    connection.release();
    app.listen(port, () => {
      console.log(`RAG demo server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(
      'Failed to connect to MySQL. Server not started.',
      error.message,
    );
    process.exit(1);
  }
};

startServer();
