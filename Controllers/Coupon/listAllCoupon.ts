import asyncHandler from 'express-async-handler';
import Coupon from '../../Models/Coupon';

const listAllCoupon = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find()

        res.json(coupons)
    } catch (error: any) {
        throw new Error(error);
        
    }
})

export default listAllCoupon