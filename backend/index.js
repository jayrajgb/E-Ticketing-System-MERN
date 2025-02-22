const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { connectDB } = require('./config/connection');
const { addUser } = require('./controllers/userController');
const { addTrain, loginAdmin } = require('./controllers/trainController');
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

app.post("/api/user/create", addUser)

app.post("/api/admin/addtrain", authAdmin, addTrain)

app.post("/api/admin/login", loginAdmin)

app.listen(PORT, ()=>{
    console.log(`Server running at PORT: http://localhost:${PORT}`)
})