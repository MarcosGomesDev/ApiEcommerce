import express from 'express';
import upload from '../App/Middlewares/uploadImage';
import createUser from '../App/useCases/User/createUser';
import forgotPassword from '../App/useCases/User/forgotPassword';
import listUsers from '../App/useCases/User/listUser';
import uploadProfile from '../App/useCases/User/uploadProfile';
import verifyUser from '../App/useCases/User/verifyUser';
import verifyTokenIsValid from '../App/useCases/User/verifyValidToken';

const userRoutes = express.Router()

userRoutes.get('/user', listUsers)
userRoutes.get("/verify/:id/:token", verifyUser)
userRoutes.post('/sign-up/user', createUser)
userRoutes.post('/forgot-password/user', forgotPassword)
userRoutes.post('/verify-token', verifyTokenIsValid)

userRoutes.patch('/upload', upload.single('image'), uploadProfile)

export default userRoutes