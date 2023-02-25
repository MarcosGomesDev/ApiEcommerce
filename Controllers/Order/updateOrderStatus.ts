import asyncHandler from 'express-async-handler';
import Coupon from '../../Models/Coupon';
import Order from '../../Models/Order';
import validateId from '../../Utils/validateId';

const updateStatusOrder = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    const {status} = req.body

    validateId(id)

    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(id, {
            orderStatus: status,
            paymentIntent: {
                status: status
            }
        }, { new: true})

        res.json(updateOrderStatus)
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
        
    }
})

export default updateStatusOrder