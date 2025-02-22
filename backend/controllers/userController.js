const validator = require('validator')
const bcrypt = require('bcrypt')
const userModel = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const trainModel = require('../models/trainSchema')
const ticketModel = require('../models/ticketSchema')

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

const getUser = async (req, res) => {
    try {
        
        const { userId } = req.body

        const userData = await userModel.findById(userId).select("-password")

        return res.json({ success: true, userData })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const updateUser = async (req, res) => {

    try {
        
        const { userId, name, phone, age, gender } = req.body

        if(!name || !phone || !age || !gender){
            return res.json({ success: false, message: "Data is missing!" })
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            age,
            gender
        })

        return res.json({ success: true, message: "Profile Updated!" })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const bookTicket = async (req, res) => {
    try {
        const { userId, trainId, slotDate, slotTime, passengers } = req.body;

        // Validate required fields
        if (!userId || !trainId || !slotDate || !slotTime || !passengers || !passengers.length) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Get train and user data
        const trainData = await trainModel.findById(trainId);
        if (!trainData) {
            return res.status(404).json({
                success: false,
                message: "Train not found"
            });
        }

        const userData = await userModel.findById(userId).select("-password");
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check seat availability
        const requestedSeats = passengers.length;
        if (trainData.availableSeats < requestedSeats) {
            return res.status(400).json({
                success: false,
                message: "Not enough seats available"
            });
        }

        // Calculate total amount
        const totalAmount = passengers.reduce((sum, passenger) => sum + passenger.price, 0);

        // Create new ticket
        const newTicket = new ticketModel({
            userId,
            trainId,
            trainInfo: {
                name: trainData.name,
                from: trainData.from,
                to: trainData.to,
                basePrice: trainData.price
            },
            slotDate: new Date(slotDate),
            slotTime,
            passengers,
            totalAmount,
            status: 'Booked'
        });

        // Save ticket
        const savedTicket = await newTicket.save();

        // Decrement available seats in the train model
        trainData.availableSeats -= requestedSeats;
        await trainData.save();

        return res.status(201).json({
            success: true,
            message: "Ticket booked successfully",
            data: savedTicket
        });

    } catch (error) {
        // console.error("Error in bookTicket:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error booking ticket"
        });
    }
};


const listBookings = async (req, res) => {
    try {
        const { userId } = req.body
        const bookings = await ticketModel.find({userId})

        return res.json({success: true, bookings})
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const cancelBooking = async (req, res) => {
    try {
        const { ticketId } = req.params; // Get ticketId from URL
        const { userId } = req.body; // User ID from request body

        // Find the booking by ticketId and userId
        const booking = await ticketModel.findOne({ _id: ticketId, userId });

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // Update booking status to 'cancelled'
        booking.status = "Cancelled";
        await booking.save();

        return res.json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const removeBooking = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { userId } = req.body;

        // Find the booking
        const booking = await ticketModel.findOne({ _id: ticketId, userId });

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // Permanently delete the booking
        await ticketModel.deleteOne({ _id: ticketId });

        return res.json({ success: true, message: "Booking removed successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = {
    addUser,
    loginUser,
    getUser,
    updateUser,
    bookTicket,
    listBookings,
    cancelBooking,
    removeBooking
}