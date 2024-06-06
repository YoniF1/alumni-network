import { _all } from '../models/cohorts.m.js'
import dotenv from 'dotenv'
dotenv.config()

export const all = async(req, res) => {
    try {
        const cohorts = await _all()
        return res.json(cohorts)
    } catch {
        console.log("all", error)
        res.status(404).json({msg: "Cohorts not found"})
    }
}
