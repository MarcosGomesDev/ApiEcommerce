import express from 'express';
import upload from '../App/Middlewares/uploadImage';
import createUser from '../App/useCases/User/createUser';
import listUsers from '../App/useCases/User/listUser';
import uploadProfile from '../App/useCases/User/uploadProfile';

const userRoutes = express.Router()

userRoutes.get('/user', listUsers)

userRoutes.post('/sign-up/user', createUser)

userRoutes.patch('/upload', upload.single('image'), uploadProfile)

export default userRoutes