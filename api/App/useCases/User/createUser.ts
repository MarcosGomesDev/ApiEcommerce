import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import moment from 'moment';
import crypto from 'crypto'

import User from '../../Models/User';
import sendEmail from '../../../Utils/sendEmail';
import Token from '../../Models/Token';

const date = moment().format('LLL')

const createUser = async (req: Request, res: Response) => {
    const { name, lastname, email, password } = req.body;

    if (!name) {
        return res.status(401).json('O nome é obrigatório!')
    }

    if (!email) {
        return res.status(401).json('O email é obrigatório!')
    }

    if (!password) {
        return res.status(401).json('A senha é obrigatória!')
    }

    // VERIFICA SE O USUÁRIO EXISTE
    const userExist = await User.findOne({ email: email })

    if (userExist) {
        return res.status(401).json('Este email já está sendo utilizado!')
    }

    // CRIPTOGRAFA A SENHA INSERIDA
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    try {
        // MÉTODO PARA SALVAR UM NOVO USUÁRIO
        let user = await User.create({
            name,
            lastname,
            email,
            password: passwordHash,
            active: false,
            admin: false,
            seller: false,
            createdAt: date
        });

        let token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        })

        const message = `${process.env.BASE_URL}/verify/${user._id}/${token.token}`;

        await sendEmail(user.email, "Verify Email", message)

        return res.status(201).json('An Email sent to your account please verify!')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao criar usuário, tente novamente mais tarde!')
    }
}

export default createUser;