import { _all, _unverifiedRequests } from '../models/cohorts.m.js'
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
