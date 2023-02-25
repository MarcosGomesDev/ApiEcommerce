import asyncHandler from 'express-async-handler';
import User from '../../Models/User';
import sendEmail from '../emailController';


const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body

    const user = await User.findOne({email})

    if(!user) throw new Error("User not Found with this email")

    try {
        const token = await user.createPasswordResetToken()

        await user.save()

        const resetURL = `Hi, Please follow this link to reset Your password. This link is valid till 10 minutes from now. <a href='http://localhost:3003/api/user/reset-password/${token}'>Click Here</a>`

        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            htm: resetURL
        }

        sendEmail(data)

        res.json(token)
    } catch (error: any) {
        throw new Error(error)
    }
})

export default forgotPassword

