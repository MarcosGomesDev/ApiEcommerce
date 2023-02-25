import asyncHandler from 'express-async-handler';
import Category from '../../Models/Category';
import validateId from '../../Utils/validateId';

const listCategory = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    validateId(id);

    try {
        const category = await Category.findById(id)

        res.json(category)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default listCategory