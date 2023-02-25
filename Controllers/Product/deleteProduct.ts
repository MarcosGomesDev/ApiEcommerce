import asyncHandler from 'express-async-handler';
import Product from '../../Models/Product';
import slugify from 'slugify';

const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        const deletedProduct = await Product.findOneAndDelete({_id: id})

        res.json(deletedProduct)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default deleteProduct