import express from 'express';
import applyCoupon from '../Controllers/Cart/applyCoupon';
import emptyCart from '../Controllers/Cart/emptyCart';

import getUserCart from '../Controllers/Cart/getUserCart';
import userCart from '../Controllers/Cart/userCart';
import createOrder from '../Controllers/Order/createOrder';
import getOrders from '../Controllers/Order/getOrders';
import updateStatusOrder from '../Controllers/Order/updateOrderStatus';
import createUser from '../Controllers/User/createUser';
import deleteUser from '../Controllers/User/deleteUser';
import forgotPassword from '../Controllers/User/forgotPassword';
import handlRefreshToken from '../Controllers/User/handleRefreshToken';
import getUser from '../Controllers/User/listUser';
import getAllUsers from '../Controllers/User/listUsers';
import getWishlist from '../Controllers/User/listWishlist';
import loginAdmin from '../Controllers/User/loginAdmin';
import loginUser from '../Controllers/User/loginUser';
import logoutUser from '../Controllers/User/logoutUser';
import resetPassword from '../Controllers/User/resetPassword';
import saveAddress from '../Controllers/User/saveAddress';
import updatePassword from '../Controllers/User/updatePassword';
import updateUser from '../Controllers/User/updateUser';

import { authMiddleware, isAdmin } from '../Middlewares/authMiddleware';

const userRoutes = express.Router()

userRoutes.post('/register', createUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/admin-login', loginAdmin)
userRoutes.post('/cart', authMiddleware, userCart)
userRoutes.post('/cart/applycoupon', authMiddleware, applyCoupon)
userRoutes.post('/cart/cash-order', authMiddleware, createOrder)

userRoutes.post('/forgot-password', forgotPassword)
userRoutes.put('/reset-password/:token', resetPassword)
userRoutes.put('/order/:id', authMiddleware, isAdmin, updateStatusOrder)
userRoutes.get('/users', getAllUsers)
userRoutes.get('/orders', authMiddleware, getOrders)
userRoutes.get('/refresh', handlRefreshToken)
userRoutes.get('/logout', logoutUser)
userRoutes.get('/wishlist', authMiddleware, getWishlist)
userRoutes.get('/cart', authMiddleware, getUserCart)

userRoutes.get('/:id', authMiddleware, isAdmin, getUser)
userRoutes.delete('/empty-cart', authMiddleware, emptyCart)
userRoutes.put('/password', authMiddleware, updatePassword)
userRoutes.put('/save-address', authMiddleware, saveAddress)
userRoutes.put('/edit', authMiddleware, updateUser)
userRoutes.delete('/:id', deleteUser)

export default userRoutes