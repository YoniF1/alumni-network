import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env

export const verifyToken = (req, res, next) => {
    const accesstoken = req.cookies.accessToken || req.headers['x-access-token']
    const refreshtoken = req.cookies.refreshToken || req.headers['x-refresh-token']

    if(!accesstoken && !refreshtoken) return res.status(401).json({msg: 'Unauthorized'})

    try {
        jwt.verify(accesstoken, ACCESS_TOKEN_SECRET, (err, decode) => {
        // set user info in the request
        req.userid = decode.id
        req.useremail = decode.email
        req.first_name = decode.first_name
        req.last_name = decode.last_name

        next()
    }) } catch (err) {
        if (!refreshtoken) {
            return res.status(401).json({msg: "No refresh token provided"})
        }

        try {
            jwt.verify(refreshtoken, REFRESH_TOKEN_SECRET, (err, decode) => {

                const accesstoken = jwt.sign(
                    {id: decode.id, email: decode.email, first_name: decode.first_name, last_name: decode.last_name },
                    ACCESS_TOKEN_SECRET, {
                    expiresIn: ACCESS_TOKEN_EXPIRY
                });
        
                res.cookie("accessToken", accesstoken, {
                    httpOnly: true,
                    maxAge: 60 * 1000, // 1 minute
                })

                req.userid = decode.id
                req.useremail = decode.email
                req.first_name = decode.first_name
                req.last_name = decode.last_name
        
                next()
            })
        } catch {
            return res.status(400).json('Invalid refresh token');
        }
    } 
}