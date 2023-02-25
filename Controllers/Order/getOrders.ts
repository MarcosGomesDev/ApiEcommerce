import asyncHandler from 'express-async-handler';
import Order from '../../Models/Order';
import validateId from '../../Utils/validateId';

const getOrders = asyncHandler(async (req, res) => {
    const { _id} = req.user
    validateId(_id)

    try {
        const userOrders = await Order.findOne({orderBy: _id}).populate("products.product")

        res.json(userOrders)
    } catch (error: any) {
        throw new Error(error);
        
    }
})

export default getOrders