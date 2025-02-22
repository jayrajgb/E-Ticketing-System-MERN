const mongoose = require('mongoose')

const trainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timings: {
        type: new mongoose.Schema({
            startTime: {
                type: Number,
                required: true
            },
            intervals: {
                type: Number,
                required: true
            }
        }, { _id: false }),
        required: true
    },
    about: {
        type: String
    }
})

const trainModel = mongoose.model("train", trainSchema)

module.exports = trainModel