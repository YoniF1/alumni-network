import express from 'express'
import { register, login, logout, refresh, all } from '../controllers/users.c.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

// router.get('/', (req, res) => {
//     res.send("Hello")
// })

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.get('/all', all)

//to see if im authorised, redirect to page
router.get("/verify", verifyToken, (req, res) => {
    // create new token - refreshes the token - if you dont click then it'll redirect to login page
    res.sendStatus(200)
})

router.post("/refresh", refresh)


export default router
