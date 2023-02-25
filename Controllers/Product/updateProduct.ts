import asyncHandler from 'express-async-handler';
import Product from '../../Models/Product';
import slugify from 'slugify';

const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title)
        }

        const updatedProduct = await Product.findOneAndUpdate({_id: id}, req.body, {new: true})

        res.json(updatedProduct)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default updateProduct