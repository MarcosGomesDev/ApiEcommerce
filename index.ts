import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'

import connect from './api/App/Database';
import userRoutes from './api/Routes/userRoutes';
import adminRoutes from './api/Routes/adminRoutes';

dotenv.config()

const app = express()

connect().then(() => {
    try {
        app.use(cors())
        app.use(express.json())
        app.use(cookieParser())
        app.use(userRoutes)
        app.use(adminRoutes)

        app.listen(3003, () => {
            console.log('server on')
        })

        
    } catch (error) {
        console.log("Can't connect to the server")
    }
}).catch((error) => {
    console.log("Invalid Database Connection...!")
})