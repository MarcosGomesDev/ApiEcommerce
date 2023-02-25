import asyncHandler from 'express-async-handler';
import Category from '../../Models/Category';
import validateId from '../../Utils/validateId';

const deleteCategory = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    validateId(id);

    try {
        const deletedCategory = await Category.findByIdAndDelete(id)

        res.json(deletedCategory)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default deleteCategory