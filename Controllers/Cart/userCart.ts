import asyncHandler from 'express-async-handler'

import Cart, { CartProps } from "../../Models/Cart";
import Product from '../../Models/Product';
import User from "../../Models/User";
import validateId from "../../Utils/validateId";

const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;

    validateId(_id);

    try {
        let products = [];

        const user = await User.findById(_id);
        // check if user already have product in cart
        const alreadyExistCart = await Cart.findOne({ orderBy: user?._id });

        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object: CartProps | any = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice?.price;
            products.push(object);
        }
        let cartTotal = 0;

        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        }

        let newCart = await new Cart({
            products,
            cartTotal,
            orderBy: user!._id,
        }).save();

        res.json(newCart);
    } catch (error: any) {
        throw new Error(error);
    }
});

export default userCart