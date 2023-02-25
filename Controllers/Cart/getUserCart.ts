import asyncHandler from 'express-async-handler'

import Cart from "../../Models/Cart";
import validateId from "../../Utils/validateId";

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    validateId(_id);

    try {
        const cart = await Cart.findOne({orderBy: _id}).populate("products.product")

        res.json(cart)
    } catch (error: any) {
        throw new Error(error);
    }
});

export default getUserCart