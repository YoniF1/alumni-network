import express from 'express'
import { register, login, logout, refresh, all, updateUser, showUser } from '../controllers/users.c.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.get('/users/:id', showUser)
router.put('/users/:id', updateUser)
router.get('/users/all', all)

router.get("/verify", verifyToken, (req, res) => {
    res.sendStatus(200)
})

router.post("/refresh", refresh)

export default router
