import asyncHandler from 'express-async-handler'
import Cart, { CartProps } from '../../Models/Cart'
import Coupon from '../../Models/Coupon'
import User from '../../Models/User'
import validateId from '../../Utils/validateId'

const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body
    const {_id} = req.user
    validateId(_id)

    const validCoupon = await Coupon.findOne({name: coupon})

    if(validCoupon === null) throw new Error("Invalid Coupon");

    const user = await User.findOne({ _id})

    let cart = await Cart.findOne({orderBy: user!._id}).populate("products.product")

    let totalAfterDiscount = (cart!.cartTotal - (cart!.cartTotal * validCoupon.discount) / 100).toFixed(2)

    await Cart.findOneAndUpdate(
        {orderBy: user!._id},
        {totalAfterDiscount},
        {new: true}
    )
    

    res.json(totalAfterDiscount)
})

export default applyCoupon