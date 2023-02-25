import asyncHandler from 'express-async-handler';
import Product from '../../Models/Product';

const listAllProducts = asyncHandler(async (req, res) => {
    try {
        //  Filtering
        const queryObj = { ...req.query }

        const excludeFields = ["page", "sort", "limit", "fields"]

        excludeFields.forEach((el) => delete queryObj[el])

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(get|gt|lte|lt)\b/g, (match) => `${match}`)

        let query = Product.find(JSON.parse(queryStr))

        // Sorting
        if (req.query.sort) {
            const sortBy = (<string>req.query.sort).split(',').join(" ")
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        // Limit the fields
        if (req.query.fields) {
            const fields = (<string>req.query.fields).split(',').join(" ")
            query = query.select(fields)
        } else {
            query = query.select("-__v")
        }

        // Pagination
        const page: any = req.query.page
        const limit: any = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)

        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if(skip >= productCount) throw new Error('This page does not exists')
        }

        const product = await query

        res.json(product)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default listAllProducts