
import asyncHandler from 'express-async-handler'
import User from '../../Models/User'

const getWishlist = asyncHandler(async (req, res) => {
    const {id} = req.user

    try {
        const findUser = await User.findById(id).populate("wishlist");
        res.json(findUser)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default getWishlist