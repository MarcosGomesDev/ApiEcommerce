import asyncHandler from 'express-async-handler'
import User from '../../Models/User'

const getUser = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        const getUser = await User.findById( id )
        res.json(getUser)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default getUser