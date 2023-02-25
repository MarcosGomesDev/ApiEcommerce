import asyncHandler from "express-async-handler";
import User from "../../Models/User";
import generateToken from "../../Config/jwtToken";
import generateRefreshToken from "../../Config/refreshToken";


const loginAdmin = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check if admin exists or not
    const admin = await User.findOne({email})

    if(admin!.role !== 'admin') throw new Error("Not Authorized");

    if(admin && (await admin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(admin?._id)
        const updateUser = await User.findByIdAndUpdate(admin._id, {
            refreshToken: refreshToken,
        }, {
            new: true
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 1000
        })

        res.json({
            _id: admin?._id,
            firstname: admin?.firstname,
            latname: admin?.lastname,
            email: admin?.email,
            mobile: admin?.mobile,
            token: generateToken(admin?._id)
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

export default loginAdmin