const jwt = require('jsonwebtoken')

async function authUser (req, res, next) {
    try {
        const { token } = req.headers
        if(!token){
            return res.json({success: false, message:"Authorization Failed!"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = decoded.id
        
        next()
    } catch (error) {
        return res.json({success: false, message:err.message})
    }
}

module.exports = {
    authUser
}