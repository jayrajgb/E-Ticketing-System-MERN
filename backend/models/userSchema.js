const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: "0000000000",
        required: true
    },
    age: {
        type: Number,
        default: 18,
        required: true
    },
    gender: {
        type: String,
        default: "Not Selected",
        required: true
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel