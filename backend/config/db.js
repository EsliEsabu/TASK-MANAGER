const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

const run = async (text, params) => {
  // PostgreSQL uses $1, $2 instead of ?
  const sql = text.replace(/\?/g, (_, i) => `$${i + 1}`);
  const result = await pool.query(sql, params);
  // For INSERT, we might want the first row back if RETURNING is used
  return { 
    lastInsertRowid: result.rows[0]?.id, 
    rows: result.rows,
    rowCount: result.rowCount 
  };
};

const get = async (text, params) => {
  const sql = text.replace(/\?/g, (_, i) => `$${i + 1}`);
  const result = await pool.query(sql, params);
  return result.rows[0] || null;
};

const all = async (text, params) => {
  const sql = text.replace(/\?/g, (_, i) => `$${i + 1}`);
  const result = await pool.query(sql, params);
  return result.rows;
};

module.exports = { run, get, all, pool };
