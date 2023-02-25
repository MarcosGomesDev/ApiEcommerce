import asyncHandler from 'express-async-handler'
import User from '../../Models/User'

const addToWishList = asyncHandler(async (req, res) => {
    const {_id} = req.params
    const {prodId} = req.body

    try {
        const user = await User.findById(_id)

        const alreadyadded = user?.wishlist.find((id: any) => id.toString() === prodId)

        if(alreadyadded) {
            let user = await User.findByIdAndUpdate(_id, {
                $pull: {
                    wishlist: prodId
                }
            }, {new: true})

            res.json(user)
        } else {
            let user = await User.findByIdAndUpdate(_id, {
                $push: {
                    wishlist: prodId
                }
            }, {new: true})

            res.json(user)
        }
    } catch (error: any) {
        throw new Error(error);
        
    }
})

export default addToWishList