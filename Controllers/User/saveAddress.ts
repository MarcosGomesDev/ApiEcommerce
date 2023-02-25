import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'
import User from "../../Models/User"
import validateId from "../../Utils/validateId"

const saveAddress = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.user
    validateId(id)

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, {
                address: req?.body.address
            },
            {
                new: true
            }
        )

        res.json(updatedUser)
    } catch (error) {
        
    }
})

export default saveAddress