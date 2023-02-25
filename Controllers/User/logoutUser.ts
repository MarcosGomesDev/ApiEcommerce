import asyncHandler from 'express-async-handler'
import User from '../../Models/User';

const logoutUser = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');

    const refreshToken = cookie.refreshToken
    
    const user = await User.findOne({ refreshToken })
    
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        })

        res.sendStatus(204)
    }

    const test = await User.findByIdAndUpdate(user?._id, {
        refreshToken: ""
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    })

    res.sendStatus(204)
})

export default logoutUser