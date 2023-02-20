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

        app.get('/', (req, res) => {
            res.send("Welcome to my api")
        })

        app.get("*", (req, res) => {
            // res.sendFile(__dirname + "/api/Views/404.html")
            return res.status(404).json('Page not found')
        })

        app.listen(3003, () => {
            console.log('server on')
        })

        
    } catch (error) {
        console.log("Can't connect to the server")
        return express.response.status(500).json('Internal Server Error')
    }
}).catch((error) => {
    console.log("Invalid Database Connection...!")
    return express.response.status(500).json('Internal Server Error')
})