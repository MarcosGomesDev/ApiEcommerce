import asyncHandler from 'express-async-handler';
import Category from '../../Models/Category';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body)

        res.json(newCategory)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default createCategory