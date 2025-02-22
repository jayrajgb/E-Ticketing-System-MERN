const trainModel = require('../models/trainSchema')
const jwt = require('jsonwebtoken')

async function addTrain (req, res){
    try{
        const { name, code, from, to, seats, price, timings  } = req.body

        if( !name || !code || !from || !to || !seats || !price || !timings ){
            return res.json({success:false, message:"Detials Incomplete!"})
        }

        const createTrain = await trainModel.create({
            name: name,
            code: code,
            from: from,
            to: to,
            seats: seats,
            price: price,
            timings: timings,
        })

        return res.json({success: true, message:"Train added successfully!"})
    }
    catch(err){
        return res.json({success: false, message:err.message})
    }
}

async function loginAdmin (req, res) {
    try {
        
        const { email, password } = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            }, process.env.JWT_SECRET)

            return res.json({success: true, token})

        }else{
            return res.json({success: false, message:"Invalid admin credentials!"})
        }

    } catch (error) {
        return res.json({success: false, message:err.message})
    }
}

async function getAllTrains(req, res) {
    try {
        const trains = await trainModel.find();
        return res.json({ success: true, trains });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}

module.exports = {
    addTrain,
    loginAdmin,
    getAllTrains
}