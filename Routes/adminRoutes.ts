import express from 'express'
import isAdminAuth from '../App/Middlewares/authAdmin'
import createAdmin from '../App/useCases/Admin/createAdmin'
import listUsers from '../App/useCases/Admin/listUsers'
import loginAdmin from '../App/useCases/Admin/loginAdmin'

const adminRoutes = express.Router()

adminRoutes.get('/users', isAdminAuth, listUsers)
adminRoutes.post('/sign-up/admin', createAdmin)
adminRoutes.post('/sign-in/admin', loginAdmin)

export default adminRoutes