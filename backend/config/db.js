const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const dbPath = path.join(dataDir, 'taskmanager.db');

let db;

const getDb = async () => {
  if (db) return db;
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    due_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`);
  save();
  console.log('SQLite (sql.js) database initialized');
  return db;
};

const save = () => {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
};

const run = async (sql, params = []) => {
  const database = await getDb();
  database.run(sql, params);
  const row = database.exec('SELECT last_insert_rowid()');
  save();
  const lastId = row[0]?.values[0][0];
  return { lastInsertRowid: lastId };
};

const get = async (sql, params = []) => {
  const database = await getDb();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
};

const all = async (sql, params = []) => {
  const database = await getDb();
  const results = database.exec(sql, params);
  if (!results.length) return [];
  const { columns, values } = results[0];
  return values.map(row => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
};

module.exports = { run, get, all };