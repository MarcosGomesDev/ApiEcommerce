import asyncHandler from 'express-async-handler';
import Product from '../../Models/Product';
import slugify from 'slugify';

const createProduct = asyncHandler(async (req, res) => {

    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title)
        }

        const newProduct = await Product.create(req.body)

        res.json(newProduct)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default createProduct