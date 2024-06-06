import { db } from "../config/db.js"

export const _all = async() => {
    try {
        const cohorts = await db('cohort').select("id", 'name').orderBy("id")
        return cohorts
    } catch (error) {
        console.log("Error in get all cohorts in cohort model", error)
        throw new Error("Could not retrieve cohorts")
    }
}