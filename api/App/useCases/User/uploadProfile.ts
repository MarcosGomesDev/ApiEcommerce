import { Request, Response } from "express";
import moment from "moment";
import fs from 'node:fs'
import User from "../../Models/User";


const date = moment().format('LLL')

const uploadProfile = async (req: Request, res: Response) => {
    const { userId } = req.body
    const image = req.file?.path
    // if (!userAuth) {
    //     return res.status(401).json("Acesso não autorizado")
    // }

    // const user = await User.findOne({ _id: userAuth })

    try {

        const convertBase64 = (path: any) => {
            // read binary data from file
            const bitmap = fs.readFileSync(path);
            // convert the binary data to base64 encoded string
            return bitmap.toString('base64');
        };
        const result = convertBase64(image)
        
        await User.findByIdAndUpdate(userId, {
            $set: {
                avatar: result,
                updatedAt: date
            }
        })
        

        return res.status(201).json('Imagem alterada com sucesso!')

    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro interno no servidor')
    }
}

export default uploadProfile;