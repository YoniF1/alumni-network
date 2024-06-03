import { db } from '../config/db.js'

export const _register = async({email, password, first_name, last_name}) => {
    try {
        const [user] = await db('users').insert({email, password, first_name, last_name}, ["id", "email", "first_name", "last_name"])
        return user;
    } catch (error) {
        console.log(error)
        if (error.code === '23505') {
            console.log("Register", error)
            throw new Error('This email is already registered')
        }
        console.log('Error in registering in user model', error)
        throw new Error('Registration failed')
    }
}

export const _login = async (email) => {
    try {
        const user = await db('users').select('id', 'email', 'password', 'first_name', 'last_name')
        .where({email})
        .first()
        return user || null
    }
    catch(error) {
        console.error('Error in logging in user model', error)
        throw new Error('Login failed')
    }
}

export const _storeRefreshToken = async(id, token) => {
    try {
        await db('users').update({token}).where({id})
    } catch (error) {
        console.log('Error storing refresh token', error)
        throw new Error('Refresh token persistence failed')

    }
}

export const _findUser = async(token) => {
    try{
        const user = await db('users').select('id', 'email').where({token}).first()
        return user || null
    } catch (error){
        console.log('Error finding user with that refresh token', error)
        throw new Error("User not found")
    }
}

export const _all = async() => {
    try {
        const users = await db('users').select("id", "email", "first_name", "last_name").orderBy("id")
        return users
    } catch (error) {
        console.log("Error in get all users in users model", error)
        throw new Error("Could not retrieve users")
    }
}
