const jwt = require('jsonwebtoken')

async function authAdmin (req, res, next) {
    try {
        const { admintoken } = req.headers
        if(!admintoken){
            return res.json({success: false, message:"Authorization Failed!"})
        }
        const decoded = jwt.verify(admintoken, process.env.JWT_SECRET)
        if(decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message:"Unauthorized Admin!"})
        }
        next()
    } catch (error) {
        return res.json({success: false, message:err.message})
    }
}

module.exports = {
    authAdmin
}