import { _register, _login, _all, _storeRefreshToken, _findUser, _showUser } from "../models/users.m.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { db } from '../config/db.js'
dotenv.config()

const  { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env

export const register = async(req, res) => {
    const { email, password, first_name, last_name } = req.body
    try {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password + "", salt)
        const newUser = await _register(
            {
                email: email.toLowerCase(),
                password: encryptedPassword,
                first_name: first_name,
                last_name: last_name
            }
        )
        res.json(newUser)
    } catch (error) {    
        console.log("register", error)
        if (error.message === 'This email is already registered') {
            return res.status(409).json({msg: 'This email is already registered'})
        }
        res.status(404).json({msg: "Error with registering"})
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await _login(email.toLowerCase())
        if(!user) return res.status(404).json({msg: "Email not found"})
        const isMatch = bcrypt.compareSync(password + "", user.password)
        if (!isMatch) return res.status(404).json({msg: "Wrong password"})

        const accesstoken = jwt.sign(
            {id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY, 
            }
        )

        const refreshtoken = jwt.sign(
            {id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name},
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: REFRESH_TOKEN_EXPIRY,
            }

        )

        await _storeRefreshToken(user.id, refreshtoken)

        res.cookie("refreshToken", refreshtoken, {
            httpOnly: true,
            maxAge: 60 * 1000 * 60 * 24, //1 day
        })

        res.cookie("accessToken", accesstoken, {
            httpOnly: true,
            maxAge: 60 * 1000, // 1 minute
        })

        res.json({
            token: accesstoken,
            id: user.id,
            email: user.email, 
            first_name: user.first_name,
            last_name: user.last_name,
            isadmin: user.isadmin
        })
    } catch (error) {
        console.log("login=>", error)
        res.status(404).json({ msg: "Login failed" })
    }
}

export const logout = async(req, res) => {
    const { refreshToken } = req.cookies

    if(!refreshToken) return res.status(401).json({msg: 'Unauthorised'})

    try {
        const user = await _findUser(refreshToken)
        
        if(!user) {
            res.clearCookie('refreshToken', { httpOnly: true})
            res.clearCookie('accessToken',  { httpOnly: true})
            return res.sendStatus(204)
        }

        await db('users').where({ id: user.id }).update({ token: null });
    } catch(error) {
        console.log("Error logging out", error)
        res.sendStatus(500)
    }

    res.clearCookie('refreshToken', { httpOnly: true})
    res.clearCookie('accessToken',  { httpOnly: true})
    res.sendStatus(204)
}

export const refresh = async(req, res) => {
    const { refreshToken } = req.cookies

    if(!refreshToken) return res.status(401).json({msg: 'Unauthorised'})

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(403).json({msg: 'Forbidden'})

        const accesstoken = jwt.sign(
            {id: decode.id, email: decode.email, first_name: decode.first_name, last_name: decode.last_name },
            ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRY
        });

        res.cookie("accessToken", accesstoken, {
            httpOnly: true,
            maxAge: 60 * 1000, // 1 minute
        })

        return res.json({ accessToken, message: 'Token refreshed successfully' });
    })

    }

export const all = async(req, res) => {
    try {
        const users = await _all()
        return res.json(users)
    } catch (error) {
        console.log("all=>", error)
        res.status(404).json({msg: "Users not found"})
    }
}

export const showUser = async(req, res) => {
    try {
        const { id } = req.params
        const user = await _showUser(id)
        return res.json(user)
    } catch (error) {
        console.log("showUser", error)
        res.status(404).json({msg: "User not found"})
    }
}

export const updateUser = async(req, res) => {
    try {
        const { id } = req.params
        let updatedUser = {};
        console.log('hello')

        
        if (req.body.cohort) {
            const cohort = req.body.cohort
            await db('users').update({cohort_id: cohort}).where({id: id})
            updatedUser.cohort = cohort
        }

        if (req.body.step) {
            const step = req.body.step
            console.log(step)
            await db('users').update({step: step}).where({id: id})
            updatedUser.step = step
        }

        if (req.body.biography && req.body.profilePictureUrl) {
            const biography = req.body.biography
            const profile_picture = req.body.profilePictureUrl
            
            await db('users').update({ biography, profile_picture: profile_picture }).where({ id });
            updatedUser.profile_picture = profile_picture
            updatedUser.biography = biography
        }

        res.status(200).json(updatedUser);
    } catch(error) {
        console.log("updateUser", error)
        res.status(500).json({ msg: "Updating user failed" })
    }
}

