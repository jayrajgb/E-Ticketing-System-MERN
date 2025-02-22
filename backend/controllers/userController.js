const validator = require('validator')
const bcrypt = require('bcrypt')
const userModel = require('../models/userSchema')

async function addUser (req, res){
    try{
        const { name, email, password } = req.body
        // console.log({ name, email, password, phone, age, gender })
        if( !name || !email || !password ){
            return res.json({success:false, message:"Detials Incomplete!"})
        }

        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Please enter valid email!"})
        }

        if(password.length < 8){
            return res.json({success: false, message:"Please enter a strong password!"})
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const createUser = await userModel.create({
            name: name,
            email: email,
            password: hashed
        })

        return res.json({success: true, message:"User created successfully!"})

    }
    catch(err){
        return res.json({success: false, message:err.message})
    }
}

module.exports = {
    addUser,
}