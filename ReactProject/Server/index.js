import express, { json } from 'express'
import { Route } from './Routes/ProjectRoute.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(json())
const port = process.env.port;

app.use('/', Route)
app.listen(port, () => {
    console.log(`Server is listenting to ${port}`);
})