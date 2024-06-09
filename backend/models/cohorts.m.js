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

export const _cohortPosts = async(cohort_id) => {
    try{
        const cohortPosts = await db('post')
                            .join('cohort', 'cohort.id', 'post.cohort_id')
                            .join('users', 'users.id', 'post.user_id')
                            .select('cohort.name', 'post.title', 'post.content', 'post.created_at', 'post.user_id', 'users.first_name', 'users.last_name')
                            .where('post.cohort_id', '=', cohort_id)

        return cohortPosts
    } catch (error) {
        console.log("Error in fetching cohort posts", error)
        throw new Error("Could not get all the cohort posts")
    }
}

export const _createCohortPost = async(cohort_id, title, content, user_id, created_at) => {
    try {
        const cohortPost = await db('post').insert({title, content, user_id, created_at, cohort_id}, ["id", "title", "content", "user_id", "created_at", "cohort_id"])
        return cohortPost
    } catch (error) {
        console.log("Error in creating a post", error)
        throw new Error("Could not create post")
    }
}


export const _showCohortName = async(cohort_id) => {
    try {
        const cohortName = await db('cohort').select('name').where({id: cohort_id}).first()
        return cohortName
    } catch (error) {
        console.log("Error in finding name of cohort", error)
        throw new Error("Could not find name")
    }
}