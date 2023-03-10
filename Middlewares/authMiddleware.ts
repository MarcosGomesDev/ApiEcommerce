import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../Models/User';

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]

        try {
            if(token) {
                const decoded: any = jwt.verify(token, process.env.SECRET)
                const user = await User.findById(decoded?.id)
                req.user = user
                next();
            }
        } catch (error) {
            throw new Error("Not Authorized token expired, Please Login again")
        }
    } else {
        throw new Error('There is no token attached to header')
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const {email} = req.user

    const adminUser = await User.findOne({email})

    if(adminUser!.role !== "admin") {
        throw new Error('You are not an admin')
    } else {
        next()
    }
})

export {
    authMiddleware,
    isAdmin
}