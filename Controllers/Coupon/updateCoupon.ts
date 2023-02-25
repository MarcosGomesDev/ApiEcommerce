import asyncHandler from 'express-async-handler';
import Coupon from '../../Models/Coupon';
import validateId from '../../Utils/validateId';

const updateCoupon = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    validateId(id)

    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {new: true})

        res.json(updateCoupon)
    } catch (error: any) {
        throw new Error(error);
        
    }
})

export default updateCoupon