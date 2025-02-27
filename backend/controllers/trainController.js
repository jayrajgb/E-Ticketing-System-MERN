const trainModel = require('../models/trainSchema')
const ticketModel = require('../models/ticketSchema')
const jwt = require('jsonwebtoken')

async function addTrain(req, res) {
    try {
        const { name, code, from, to, seats, price, timings } = req.body

        if (!name || !code || !from || !to || !seats || !price || !timings) {
            return res.json({ success: false, message: "Detials Incomplete!" })
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

        return res.json({ success: true, message: "Train added successfully!" })
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}

async function loginAdmin(req, res) {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            }, process.env.JWT_SECRET)

            return res.json({ success: true, token })

        } else {
            return res.json({ success: false, message: "Invalid admin credentials!" })
        }

    } catch (error) {
        return res.json({ success: false, message: err.message })
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

async function getAllBookings (req, res) {
    try {
        const bookings = await ticketModel.find();
        res.status(200).json({ success: true, bookings });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
}

async function searchTrains (req, res) {
    try{
        const key = req.params.key;
        // console.log(req.params)
        const trains = await trainModel.find({
            $or:[
                { "name" : { $regex: key, $options: "i" }},
                { "code" : { $regex: key, $options: "i" }},
                { "from" : { $regex: key, $options: "i" }},
                { "to" : { $regex: key, $options: "i" }},
            ]
        })
        // console.log(`/${key}/`)
        return res.send({ success: true, trains })
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

async function searchBookings (req, res) {
    try{
        const key = req.params.key;
        // console.log(req.params)
        const bookings = await ticketModel.find(
                { "status" : { $regex: key, $options: "i" }}
        )
        // console.log(`/${key}/`)
        return res.send({ success: true, bookings })
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    addTrain,
    loginAdmin,
    getAllTrains,
    getAllBookings,
    searchTrains,
    searchBookings
}