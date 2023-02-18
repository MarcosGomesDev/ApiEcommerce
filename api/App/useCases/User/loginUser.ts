import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import User from "../../Models/User";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(401).json('Usuário não existe!')
        }

        const checkPassword = bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(401).json('Senha inválida!')
        }

        const token = jwt.sign({
            id: user._id
        }, `${process.env.SECRET}`, { expiresIn: '1d' })

        const data = {
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            avatar: user.avatar,
            admin: user.admin,
            token: token,
        }

        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

export default loginUser;