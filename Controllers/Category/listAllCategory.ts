import asyncHandler from 'express-async-handler';
import Category from '../../Models/Category';
import validateId from '../../Utils/validateId';

const listAllCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find()

        res.json(category)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default listAllCategory