import express from 'express'
import { all, unverifiedRequests  } from '../controllers/cohorts.c.js'

const router = express.Router()

router.get('/cohorts/all', all)
router.get('/cohorts/unverified', unverifiedRequests)

export default router