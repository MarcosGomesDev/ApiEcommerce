import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import sendEmail from "../../../Utils/sendEmail";
import TokenForgotPassword from "../../Models/TokenForgotPassword";
import User from "../../Models/User";

const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(401).json('Usuário não encontrado');
    }

    try {
        const token = await TokenForgotPassword.findOne({ id: user._id });

        if (token !== null) {
            await TokenForgotPassword.findByIdAndDelete({ _id: token._id })
        }

        const sort = Math.floor(100000 + Math.random() * 900000).toString()
        
        const salt = await bcrypt.genSalt(12)
        const tokenHash = await bcrypt.hash(sort, salt)
        await TokenForgotPassword.create({
            id: user._id,
            token: tokenHash
        })

        await sendEmail(user.email, "Redefinir senha"
            , `Seu código de redefinição de senha é: ${sort}, Token válido por 5 minutos!`
        )

        return res.status(200).json("Token de redefinição de senha foi enviado ao email");

    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao enviar token, tente novamente mais tarde!')
    }
}

export default forgotPassword;