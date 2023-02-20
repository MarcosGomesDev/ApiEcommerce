import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../../Models/User";
import Token from "../../Models/Token";

const verifyUser = async (req: Request, res: Response) => {
    const {id, token} = req.params
    
    try {
        const user = await User.findOne({ _id: id })

        if(!user) {
            return res.status(400).json('Invalid link')
        }

        const validToken = await Token.findOne({
            userId: user._id,
            token: token
        })
        console.log(validToken, 'token')
        if(!validToken) {
            return res.status(401).json('Token inválido!')
        }
        

        await User.findOneAndUpdate({_id: id}, {
            $set: {
                active: true
            }
        })
        
        await validToken.remove()

        return res.status(200).json("email verified sucessfully");
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}

export default verifyUser;