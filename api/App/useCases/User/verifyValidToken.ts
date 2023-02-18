import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import TokenForgotPassword from "../../Models/TokenForgotPassword";
import User from "../../Models/User";

const verifyTokenIsValid = async (req: Request, res: Response) => {
    const {token} = req.body
    const {email} = req.params

    try {
        const user = await User.findOne({ email: email })

        if(!user) {
            return res.status(401).json('Token Inválido')
        }

        const validToken = await TokenForgotPassword.findOne({ id: user?._id });

        const checkToken = bcrypt.compare(token, validToken!.token)

        if (!checkToken) {
            return res.status(401).json('Token inválido!')
        }

        return res.status(200).json('Token verificado!')
    } catch (error) {
        return res.status(500).json('Erro, tente novamente mais tarde')
    }
}

export default verifyTokenIsValid;