import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import userrouter from '../backend/routes/users.r.js'
import cohortrouter from '../backend/routes/cohorts.r.js'
import filesrouter from '../backend/routes/files.r.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(userrouter)
app.use(cohortrouter)
app.use(filesrouter)

app.listen(3000, () => {
        console.log(`running on port 3000`)
    }
)
