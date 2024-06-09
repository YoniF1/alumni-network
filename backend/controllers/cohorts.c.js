import { _all, _unverifiedRequests, _cohortPosts, _createCohortPost, _showCohortName } from '../models/cohorts.m.js'
import dotenv from 'dotenv'
dotenv.config()

export const all = async(req, res) => {
    try {
        const cohorts = await _all()
        return res.json(cohorts)
    } catch (error) {
        console.log("all", error)
        res.status(404).json({msg: "Cohorts not found"})
    }
}

export const unverifiedRequests = async(req, res) => {
    try {
        const unverifiedRequests = await _unverifiedRequests()
        return res.json(unverifiedRequests)
    } catch (error) {
        console.log("unverifiedRequests", error)
        res.status(404).json({msg: "Unverified cohort request not found"})
    }
}

export const cohortPosts = async(req, res) => {
    try {
        const { cohort_id } = req.params
        const cohortPosts = await _cohortPosts(cohort_id)
        return res.json(cohortPosts)
    } catch (error) {
        console.log("cohortPosts", error)
        res.status(404).json({msg: "Cohort posts were not found"})
    }
}

export const createCohortPost = async(req, res) => {
    try {
        const { cohort_id } = req.params
        const { title, content, user_id, time } = req.body

        const cohortPosts = await _createCohortPost(cohort_id, title, content, user_id, time)
        return res.json(cohortPosts)
    } catch (error) {
        console.log("createCohortPost", error)
        res.status(404).json({msg: "Failed to create cohort post"})
    }

}

export const showCohortName = async(req, res) => {
    try {
        const { cohort_id } = req.params

        const cohortName = await _showCohortName(cohort_id)
        return res.json(cohortName)
    } catch (error) {
        console.log("showCohortName", error)
        res.status(404).json({msg: 'Failed to show cohort name'})
    }
}