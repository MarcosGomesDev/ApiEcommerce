import asyncHandler from 'express-async-handler'
import User from '../../Models/User'

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default getAllUsers