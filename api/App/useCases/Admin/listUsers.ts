import { Request, Response } from 'express';
import Admin from '../../Models/Admin';

import User from '../../Models/User';

const listUsers = async (req: Request, res: Response) => {
    const { adminAuth } = req

    if (!adminAuth) {
        return res.status(401).json('Autorização inválida');
    }

    const admin = await Admin.findById(adminAuth)

    if (admin!.admin === false) {
        return res.status(401).json('Você não tem permissão para acessar!')
    }

    try {
        const users = await User.find();

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao retornar os usuários, tente novamente mais tarde')
    }
}

export default listUsers;