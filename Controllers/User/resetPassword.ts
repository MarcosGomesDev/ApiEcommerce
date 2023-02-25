import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import User from '../../Models/User'

const resetPassword = asyncHandler(async (req, res) => {
    const {password} = req.body
    const {token} = req.params

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now()}
    })

    if(!user) throw new Error("Token Expired, Please try again later")

    user.password = password
    user.passwordResetToken = ""
    user.passwordResetExpires = undefined

    await user.save()

    res.json(user)
})

export default resetPassword