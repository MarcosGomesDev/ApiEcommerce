import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateRefreshToken = (id: Types.ObjectId) => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '1d'})
}

export default generateRefreshToken