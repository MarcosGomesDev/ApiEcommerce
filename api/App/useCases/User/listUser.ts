import { Request, Response } from 'express';

import User from '../../Models/User';

const listUsers = async (req: Request, res: Response) => {
    // const { userId } = req.body

    // if (!userAuth) {
    //     return res.status(401).json('Autorização inválida');
    // }

    const user = await User.findById('63eec48e9925fd12755b0506')

    // if (user!.admin === false) {
    //     return res.status(401).json('Você não tem permissão para acessar!')
    // }

    try {
        const image = user?.avatar


        return res.status(200).json(image)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao retornar os usuários, tente novamente mais tarde')
    }
}

export default listUsers;