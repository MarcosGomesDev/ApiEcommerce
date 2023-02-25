import asyncHandler from 'express-async-handler'
import User from '../../Models/User'
import validateId from '../../Utils/validateId'

const updatePassword = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {password} = req.body

    validateId(_id)

    const user = await User.findById(_id)

    if(password) {
        user!.password = password

        const updatedPassword = await user?.save()

        res.json(updatedPassword)
    } else {
        res.json(user)
    }

})

export default updatePassword