const mongoose = require('mongoose')

async function connectDB(url){
    return mongoose.connect(url + "/e-ticket")
}

module.exports = { connectDB }