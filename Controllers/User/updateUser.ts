import asyncHandler from 'express-async-handler'
import User from '../../Models/User'

const updateUser = asyncHandler(async (req, res) => {
    const {id} = req.user

    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, {
            new: true
        })
        res.json(updateUser)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default updateUser