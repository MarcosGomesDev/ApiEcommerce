import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as dotenv from 'dotenv'

import connect from './Database';
import userRoutes from './Routes/userRoutes';
import bodyParser from 'body-parser';
import { errorHandler, notFound } from './Middlewares/errorHandler';
import productRoutes from './Routes/productRoutes';
import categoryRoutes from './Routes/categoryRoutes';
import brandRoutes from './Routes/brandRoutes';
import couponRoutes from './Routes/couponRoutes';

dotenv.config()

const app = express()

connect().then(() => {
    try {
        app.use(cors())
        app.use(morgan("dev"))
        app.use(express.json())
        app.use(cookieParser())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))

        app.use("/api/user", userRoutes)
        app.use("/api/product", productRoutes)
        app.use("/api/category", categoryRoutes)
        app.use("/api/brand", brandRoutes)
        app.use("/api/coupon", couponRoutes)

        app.use(notFound)
        app.use(errorHandler)

        app.get('/', (req, res) => {
            res.send("Welcome to my api")
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