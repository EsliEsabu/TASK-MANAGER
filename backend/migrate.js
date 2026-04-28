require('dotenv').config();
const { connectDB, getDB } = require('../config/db');

const migrate = () => {
  connectDB();
  const db = getDB();

  db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      username    TEXT NOT NULL UNIQUE,
      email       TEXT NOT NULL UNIQUE,
      password    TEXT NOT NULL,
      created_at  TEXT DEFAULT (datetime('now')),
      updated_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS Categories (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
      name        TEXT NOT NULL,
      color       TEXT DEFAULT '#6366f1',
      created_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS Todos (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id      INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
      category_id  INTEGER REFERENCES Categories(id) ON DELETE SET NULL,
      title        TEXT NOT NULL,
      description  TEXT,
      is_completed INTEGER DEFAULT 0,
      priority     TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
      due_date     TEXT,
      created_at   TEXT DEFAULT (datetime('now')),
      updated_at   TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log('✅ Migration complete — all tables created (or already exist).');
};

migrate();