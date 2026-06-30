// Bu dosya ne ise yarar?
// Gorevlerle ilgili requestleri karsilar ve PostgreSQL sorgularini calistirir.

import pool from '../db/pool.js';

const taskSelectQuery = `
  SELECT
    tasks.id,
    tasks.title,
    tasks.description,
    tasks.status,
    tasks.category_id,
    categories.name AS category_name,
    tasks.created_at,
    tasks.updated_at
  FROM tasks
  LEFT JOIN categories ON categories.id = tasks.category_id
`;

export async function getTasks(req, res) {
  try {
    const { search = '', status = '', categoryId = '' } = req.query;
    const values = [];
    const conditions = [];

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`(tasks.title ILIKE $${values.length} OR tasks.description ILIKE $${values.length})`);
    }

    if (status) {
      values.push(status);
      conditions.push(`tasks.status = $${values.length}`);
    }

    if (categoryId) {
      values.push(Number(categoryId));
      conditions.push(`tasks.category_id = $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `${taskSelectQuery} ${whereClause} ORDER BY tasks.created_at DESC`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Gorevler listelenirken hata:', error);
    res.status(500).json({ message: 'Gorevler listelenemedi.' });
  }
}

export async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(`${taskSelectQuery} WHERE tasks.id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Gorev bulunamadi.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Gorev detayi alinirken hata:', error);
    res.status(500).json({ message: 'Gorev detayi alinamadi.' });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description, status = 'todo', category_id } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'title alani zorunludur.' });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, category_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description || '', status, category_id || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Gorev eklenirken hata:', error);
    res.status(500).json({ message: 'Gorev eklenemedi.' });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status, category_id } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'title alani zorunludur.' });
    }

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           status = $3,
           category_id = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [title, description || '', status, category_id || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Guncellenecek gorev bulunamadi.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Gorev guncellenirken hata:', error);
    res.status(500).json({ message: 'Gorev guncellenemedi.' });
  }
}

export async function updateTaskStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET status = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Durumu degistirilecek gorev bulunamadi.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Gorev durumu guncellenirken hata:', error);
    res.status(500).json({ message: 'Gorev durumu guncellenemedi.' });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Silinecek gorev bulunamadi.' });
    }

    res.json({ message: 'Gorev silindi.', deletedTask: result.rows[0] });
  } catch (error) {
    console.error('Gorev silinirken hata:', error);
    res.status(500).json({ message: 'Gorev silinemedi.' });
  }
}
