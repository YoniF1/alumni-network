import express from 'express'
import { all, unverifiedRequests, cohortPosts, createCohortPost, showCohortName } from '../controllers/cohorts.c.js'

const router = express.Router()

router.get('/cohorts/all', all)
router.get('/cohorts/unverified', unverifiedRequests)
router.get('/cohorts/:cohort_id/posts', cohortPosts)
router.post('/cohorts/:cohort_id/post', createCohortPost)
router.get('/cohorts/:cohort_id/name', showCohortName)
export default router