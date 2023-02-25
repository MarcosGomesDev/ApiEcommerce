import asyncHandler from 'express-async-handler';
import Category from '../../Models/Category';
import validateId from '../../Utils/validateId';

const updateCategory = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    validateId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {new: true})

        res.json(updatedCategory)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default updateCategory