import asyncHandler from 'express-async-handler';
import Coupon from '../../Models/Coupon';

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body)

        res.json(newCoupon)
    } catch (error: any) {
        throw new Error(error);
        
    }
})

export default createCoupon