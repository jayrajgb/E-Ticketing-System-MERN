const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { connectDB } = require('./config/connection');
const { addUser, loginUser } = require('./controllers/userController');
const { addTrain, loginAdmin, getAllTrains } = require('./controllers/trainController');
const { authAdmin } = require('./middlewares/authAdmin');

dotenv.config()

const PORT = process.env.PORT || 4000

connectDB(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connection Successfull!")
})
.catch((e)=>{
    console.log("Connection Failed! \n ", e);
})

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    return res.send("Hello")
})

app.post("/api/user/register", addUser)

app.post("/api/user/login", loginUser)

app.post("/api/admin/addtrain", authAdmin, addTrain)

app.post("/api/admin/login", loginAdmin)

app.get("/api/admin/trains", getAllTrains)



app.listen(PORT, ()=>{
    console.log(`Server running at PORT: http://localhost:${PORT}`)
})