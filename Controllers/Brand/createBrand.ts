import asyncHandler from 'express-async-handler';
import Brand from '../../Models/Brand';

const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body)

        res.json(newBrand)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default createBrand