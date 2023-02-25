import asyncHandler from 'express-async-handler'
import Product from '../../Models/Product'

const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, prodId, comment } = req.body

    try {
        const product = await Product.findById(prodId)

        let alreadyRated = product!.ratings.find((userId) => userId.postedby?.toString() === _id.toString())

        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment }
                },
                {
                    new: true
                }
            );
        } else {
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id
                    },
                },
            }, {
                new: true
            })
        }

        const getAllRatings = await Product.findById(prodId)

        let totalRating = getAllRatings!.ratings.length

        let ratingSum = getAllRatings?.ratings.map((item) => item.star).reduce(({ prev, curr }: any) => prev + curr, 0)

        let actualRating = Math.round(ratingSum / totalRating)

        let finalproduct = await Product.findByIdAndUpdate(
            prodId,
            {
                totalrating: actualRating,
            },
            { new: true }
        );

        res.json(finalproduct);
    } catch (error: any) {
        throw new Error(error);

    }
})

export default rating