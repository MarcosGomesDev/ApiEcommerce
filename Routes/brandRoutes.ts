import express from 'express';
import createBrand from '../Controllers/Brand/createBrand';
import deleteBrand from '../Controllers/Brand/deleteBrand';
import listAllBrand from '../Controllers/Brand/listAllBrand';
import listBrand from '../Controllers/Brand/listBrand';
import updateBrand from '../Controllers/Brand/updateBrand';
import { authMiddleware, isAdmin } from '../Middlewares/authMiddleware';

const brandRoutes = express.Router()

brandRoutes.post('/', authMiddleware, isAdmin, createBrand)
brandRoutes.put('/:id', authMiddleware, isAdmin, updateBrand)
brandRoutes.delete('/:id', authMiddleware, isAdmin, deleteBrand)
brandRoutes.get('/:id', listBrand)
brandRoutes.get('/', listAllBrand)

export default brandRoutes