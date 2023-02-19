import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import Admin from "../Models/Admin";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

const isAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decode = jwt.verify(token, `${process.env.SECRET}`);
            const { id } = decode as TokenPayload;
            const adminAuth = await Admin.findById(id);
            if (!adminAuth) {
                return res.status(401).json('Autorização inválida do usuário!');
            }

            req.adminAuth = id;
            return next();
        } catch (error: any) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json('Autorização inválida do usuário!');
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(413).json('Sessão expirada, por favor faça login');
            }
            return res.status(500).json('Internal Server Error');
        }
    } else {
        return res.status(400).json('Autorização inválida!');
    }
}

export default isAdminAuth;