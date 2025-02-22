const validator = require('validator')
const bcrypt = require('bcrypt')
const userModel = require('../models/userSchema')
const jwt = require('jsonwebtoken')

async function addUser(req, res) {
    try {
        const { name, email, password } = req.body
        // console.log({ name, email, password, phone, age, gender })
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Detials Incomplete!" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email!" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password!" })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const createUser = await userModel.create({
            name: name,
            email: email,
            password: hashed
        })

        const token = jwt.sign({ id: createUser._id }, process.env.JWT_SECRET)

        return res.json({ success: true, token })

    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User does not exist!" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            return res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


module.exports = {
    addUser,
    loginUser
}