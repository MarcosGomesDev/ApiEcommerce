import asyncHandler from 'express-async-handler';
import Brand from '../../Models/Brand';

const listAllBrand = asyncHandler(async (req, res) => {
    try {
        const category = await Brand.find()

        res.json(category)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default listAllBrand