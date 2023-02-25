import express from 'express';
import addToWishList from '../Controllers/Product/addToWishList';
import createProduct from '../Controllers/Product/createProduct';
import deleteProduct from '../Controllers/Product/deleteProduct';
import listAllProducts from '../Controllers/Product/listAllProducts';
import listProduct from '../Controllers/Product/listProduct';
import rating from '../Controllers/Product/rating';
import updateProduct from '../Controllers/Product/updateProduct';
import { authMiddleware, isAdmin } from '../Middlewares/authMiddleware';

const productRoutes = express.Router()

productRoutes.get('/', listAllProducts)
productRoutes.get('/:id', listProduct)
productRoutes.put('/wishlist', authMiddleware, addToWishList)
productRoutes.put("/rating", authMiddleware, rating);
productRoutes.put('/:id', updateProduct)
productRoutes.post('/create', createProduct)
productRoutes.delete('/:id', authMiddleware, isAdmin, deleteProduct)


export default productRoutes