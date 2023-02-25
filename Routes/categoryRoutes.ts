import express from 'express';
import createCategory from '../Controllers/Category/createCategory';
import deleteCategory from '../Controllers/Category/deleteCategory';
import listAllCategory from '../Controllers/Category/listAllCategory';
import listCategory from '../Controllers/Category/listCategory';
import updateCategory from '../Controllers/Category/updateCategory';
import { authMiddleware, isAdmin } from '../Middlewares/authMiddleware';

const categoryRoutes = express.Router()

categoryRoutes.post('/', authMiddleware, isAdmin, createCategory)
categoryRoutes.put('/:id', authMiddleware, isAdmin, updateCategory)
categoryRoutes.delete('/:id', authMiddleware, isAdmin, deleteCategory)
categoryRoutes.get('/:id', listCategory)
categoryRoutes.get('/', listAllCategory)

export default categoryRoutes