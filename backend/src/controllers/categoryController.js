// Bu dosya ne ise yarar?
// Kategori listeleme, ekleme ve silme islemlerini yonetir.

import pool from '../db/pool.js';

export async function getCategories(req, res) {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Kategoriler listelenirken hata:', error);
    res.status(500).json({ message: 'Kategoriler listelenemedi.' });
  }
}

export async function createCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'name alani zorunludur.' });
    }

    const result = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Kategori eklenirken hata:', error);
    res.status(500).json({ message: 'Kategori eklenemedi. Ayni isimde kategori olabilir.' });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Silinecek kategori bulunamadi.' });
    }

    res.json({ message: 'Kategori silindi.', deletedCategory: result.rows[0] });
  } catch (error) {
    console.error('Kategori silinirken hata:', error);
    res.status(500).json({ message: 'Kategori silinemedi.' });
  }
}
