import asyncHandler from 'express-async-handler'

import Cart from "../../Models/Cart";
import User from '../../Models/User';
import validateId from "../../Utils/validateId";

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    validateId(_id);

    try {
        const user = await User.findOne({_id})

        const cart = await Cart.findOneAndRemove({orderBy: user?._id})

        res.json(cart)
    } catch (error: any) {
        throw new Error(error);
    }
});

export default emptyCart