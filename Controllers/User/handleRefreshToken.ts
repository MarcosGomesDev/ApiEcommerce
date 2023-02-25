import asyncHandler from 'express-async-handler'
import User from '../../Models/User';
import jwt from 'jsonwebtoken';
import generateToken from '../../Config/jwtToken';

const handlRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    
    if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');

    const refreshToken = cookie.refreshToken

    const user = await User.findOne({refreshToken})

    if (!user) throw new Error("No Refresh token present in db or not matched")

    jwt.verify(refreshToken, process.env.SECRET, (err: any, decoded: any) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token")
        }

        const accessToken = generateToken(user?._id)

        res.json({accessToken})
    })
})

export default handlRefreshToken