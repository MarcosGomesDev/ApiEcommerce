import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'
import User from "../../Models/User"

const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { firstname, lastname, mobile, email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
        const newUser = await User.create({
            firstname,
            lastname,
            mobile,
            email,
            password
        })

        res.json(newUser)
    } else {
        throw new Error('User Already Exists')
    }
})

export default createUser