import asyncHandler from 'express-async-handler';
import Brand from '../../Models/Brand';
import validateId from '../../Utils/validateId';

const deleteBrand = asyncHandler(async (req, res) => {
    const {id}: any = req.params
    validateId(id);

    try {
        const deletedBrand = await Brand.findByIdAndDelete(id)

        res.json(deletedBrand)
    } catch (error: any) {
        throw new Error(error);
    }
})

export default deleteBrand