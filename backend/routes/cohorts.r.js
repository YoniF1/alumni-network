import express from 'express'
import { all  } from '../controllers/cohorts.c.js'

const router = express.Router()

router.get('/cohorts/all', all)

export default router