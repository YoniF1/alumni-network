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

export const _unverifiedRequests = async() => {
    try {
        const unverifiedRequests = await db('cohort').join('users', 'users.cohort_id', 'cohort.id').select('cohort.name', 'users.id', 'users.first_name', 'users.last_name', 'users.email').where('users.isverified', false)
        return unverifiedRequests || null
    } catch (error) {
        console.log("Error in fetching unverified cohort requests", error)
        throw new Error("Could not retrieve requests")
    }
}