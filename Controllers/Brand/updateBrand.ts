import asyncHandler from 'express-async-handler';
import Brand from '../../Models/Brand';
import validateId from '../../Utils/validateId';

const updateBrand = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    validateId(id);
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {new: true})

        res.json(updatedBrand)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default updateBrand