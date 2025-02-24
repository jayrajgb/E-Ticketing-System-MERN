const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { connectDB } = require('./config/connection');
const { addUser, loginUser, getUser, updateUser, bookTicket, listBookings, cancelBooking, removeBooking } = require('./controllers/userController');
const { addTrain, loginAdmin, getAllTrains, getAllBookings } = require('./controllers/trainController');
const { authAdmin } = require('./middlewares/authAdmin');
const { authUser } = require('./middlewares/authUser');

dotenv.config()

const PORT = process.env.PORT || 4000

connectDB(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connection Successfull!")
    })
    .catch((e) => {
        console.log("Connection Failed! \n ", e);
    })

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    return res.send(`
        <html>
            <body>
                <div style="text-align: center;">
                    E-Ticketing-System Backend
                </div>
            </body>
        </html>
        `
    )
})

app.post("/api/user/register", addUser)

app.post("/api/user/login", loginUser)

app.get("/api/user/profile", authUser, getUser)

app.post("/api/user/update", authUser, updateUser)

app.post("/api/admin/addtrain", authAdmin, addTrain)

app.post("/api/admin/login", loginAdmin)

app.get("/api/admin/trains", getAllTrains)

app.post("/api/user/book", authUser, bookTicket)

app.get("/api/user/bookings", authUser, listBookings)

app.post("/api/user/bookings/cancel/:ticketId", authUser, cancelBooking)

app.delete("/api/user/bookings/remove/:ticketId", authUser, removeBooking)

app.get("/api/admin/bookings", getAllBookings);

app.listen(PORT, () => {
    console.log(`Server running at PORT: http://localhost:${PORT}`)
})