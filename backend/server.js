import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import userrouter from '../backend/routes/users.r.js'
import cohortrouter from '../backend/routes/cohorts.r.js'
import filesrouter from '../backend/routes/files.r.js'
import cookieParser from 'cookie-parser'
import path from 'path'
const __dirname = import.meta.dirname;

dotenv.config()

const { FRONTEND_URL, PORT } = process.env

const app = express()

app.use(cors(
    {
        origin: FRONTEND_URL,
        credentials: true
    }
))

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(userrouter)
app.use(cohortrouter)
app.use(filesrouter)

const buildDirectory = path.join(__dirname, '../frontend/build');
app.use(express.static(buildDirectory));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildDirectory, 'index.html'));
});

app.listen(PORT || 3000, () => {
  console.log(`Server listening on ${PORT || 3000}`);
});

