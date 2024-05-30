import dotenv from 'dotenv'
import express from 'express';

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(process.env.PORT || 3000, () => {
        console.log(`running on ${process.env.PORT} || 3000`)
    }
)




