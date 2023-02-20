import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../../Models/User";
import Token from "../../Models/Token";

const verifyTokenIsValid = async (req: Request, res: Response) => {
    const {token} = req.body
    const {email} = req.query
    
    try {
        const user = await User.findOne({ email: email })
        
        if(!user) {
            return res.status(401).json('Token Inválido user')
        }

        const validToken = await Token.findOne({ userId: user?._id });

        if(!validToken) {
            return res.status(401).json('Token inválido!')
        }
        
        const checkToken = bcrypt.compare(token, validToken!.token)

        if (!checkToken) {
            return res.status(401).json('Token inválido token!')
        }

        return res.status(200).json('Token verificado!')
    } catch (error) {
        return res.status(500).json('Erro, tente novamente mais tarde')
    }
}

export default verifyTokenIsValid;