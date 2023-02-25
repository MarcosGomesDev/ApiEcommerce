import express from 'express'
import createCoupon from '../Controllers/Coupon/createCoupon'
import listAllCoupon from '../Controllers/Coupon/listAllCoupon'
import updateCoupon from '../Controllers/Coupon/updateCoupon'
import { authMiddleware, isAdmin } from '../Middlewares/authMiddleware'

const couponRoutes = express.Router()

couponRoutes.post('/', authMiddleware, isAdmin, createCoupon)
couponRoutes.get('/', authMiddleware, isAdmin, listAllCoupon)
couponRoutes.put('/:id', authMiddleware, isAdmin, updateCoupon)
couponRoutes.delete('/:id', authMiddleware, isAdmin, updateCoupon)

export default couponRoutes