const express = require('express');
const { run, get, all } = require('../config/db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [req.user.id];
    if (status) { query += ' AND status = ?'; params.push(status); }
    if (priority) { query += ' AND priority = ?'; params.push(priority); }
    if (search) { query += ' AND (title LIKE ? OR description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    query += ' ORDER BY created_at DESC';
    const tasks = await all(query, params);
    res.json(tasks);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await get('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!task) return res.status(404).json({ error: 'Task not found.' });
    res.json(task);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    if (!title) return res.status(400).json({ error: 'Task title is required.' });
    const result = await run(
      'INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, title, description || null, status || 'pending', priority || 'medium', due_date || null]
    );
    const task = await get('SELECT * FROM tasks WHERE id = ?', [result.lastInsertRowid]);
    if (!task) {
      return res.status(500).json({ error: 'Task created but could not be retrieved.' });
    }
    res.status(201).json(task);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const existing = await get('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!existing) return res.status(404).json({ error: 'Task not found.' });
    await run(`UPDATE tasks SET
      title = COALESCE(?, title), description = COALESCE(?, description),
      status = COALESCE(?, status), priority = COALESCE(?, priority),
      due_date = COALESCE(?, due_date), updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?`,
      [title||null, description||null, status||null, priority||null, due_date||null, req.params.id, req.user.id]);
    const task = await get('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(task);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const existing = await get('SELECT id FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!existing) return res.status(404).json({ error: 'Task not found.' });
    await run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Task deleted successfully.' });
  } catch (err) { next(err); }
});

module.exports = router;