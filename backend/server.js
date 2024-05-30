import dotenv from 'dotenv'
import express from 'express';
import userrouter from '../backend/routes/users.r.js'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(userrouter)

app.listen(3000, () => {
        console.log(`running on port 3000`)
    }
)
