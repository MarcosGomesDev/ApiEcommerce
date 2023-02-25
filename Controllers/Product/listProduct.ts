import asyncHandler from 'express-async-handler';
import Product from '../../Models/Product';

const listProduct = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        const findProduct = await Product.findById(id)

        res.json(findProduct)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default listProduct