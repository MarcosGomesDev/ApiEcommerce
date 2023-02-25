import asyncHandler from 'express-async-handler';
import Cart from '../../Models/Cart';
import Coupon from '../../Models/Coupon';
import Order from '../../Models/Order';
import validateId from '../../Utils/validateId';
import uniqid from 'uniqid'
import Product from '../../Models/Product';

const createOrder = asyncHandler(async (req, res) => {
    const {COD, couponApplied} = req.body
    const {_id} = req.user

    validateId(_id)
    
    try {
        if (!COD) throw new Error("Create cash order failed");

        let userCart = await Cart.findOne({orderBy: _id})

        let finalAmount = 0

        if(couponApplied && userCart!.totalAfterDiscount) {
            finalAmount = userCart!.totalAfterDiscount
        } else {
            finalAmount = userCart!.cartTotal
        }

        let newOrder = await Order.create({
            products: userCart?.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmount,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: "usd"
            },
            orderBy: _id,
            orderStatus: "Cash on Delivery",
        })

        let update = userCart!.products.map((item) => {
            return {
                updateOne: {
                    filter: {_id: item.product._id},
                    update: {$inc: {quantity: -item.count, sold: +item.count}}
                }
            }
        })

        const updated = await Product.bulkWrite(update, {})

        res.json({
            message: 'success'
        })

    } catch (error: any) {
        throw new Error(error);
        
    }
})

export default createOrder