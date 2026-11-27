import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

// DB connection settings, read from env with sensible local defaults
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'rag-admin',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'rag_demo',
};

export const db = mysql.createPool(dbConfig);

/**
 * Run a parameterized SQL query and return only the rows/result.
 * Using `?` placeholders + params guards against SQL injection.
 * @param {string} sql - SQL statement with `?` placeholders
 * @param {Array} params - Values to bind to the placeholders
 * @returns {Promise<any>} The query result (rows for SELECT, metadata otherwise)
 */
export const executeQuery = async (sql, params = []) => {
  const [result] = await db.execute(sql, params);
  return result;
};
