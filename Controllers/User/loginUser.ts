import asyncHandler from "express-async-handler";
import User from "../../Models/User";
import generateToken from "../../Config/jwtToken";
import generateRefreshToken from "../../Config/refreshToken";


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check if user exists or not
    const user = await User.findOne({email})

    if(user && (await user.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(user?._id)
        const updateUser = await User.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken,
        }, {
            new: true
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 1000
        })

        res.json({
            _id: user?._id,
            firstname: user?.firstname,
            latname: user?.lastname,
            email: user?.email,
            mobile: user?.mobile,
            token: generateToken(user?._id)
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

export default loginUser