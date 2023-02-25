import asyncHandler from 'express-async-handler';
import Coupon from '../../Models/Coupon';
import validateId from '../../Utils/validateId';

const deleteCoupon = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    validateId(id)

    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id)

        res.json(deleteCoupon)
    } catch (error: any) {
        throw new Error(error);
        
    }
})

export default deleteCoupon