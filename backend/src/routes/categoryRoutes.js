// Bu dosya ne ise yarar?
// /api/categories ile baslayan endpointleri controller fonksiyonlarina baglar.

import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;
