import asyncHandler from 'express-async-handler';
import Brand from '../../Models/Brand';
import validateId from '../../Utils/validateId';

const listBrand = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    validateId(id);

    try {
        const category = await Brand.findById(id)

        res.json(category)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default listBrand