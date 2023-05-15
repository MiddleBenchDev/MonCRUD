const mongoose = require("mongoose")
const express = require("express")
require("dotenv").config()
const cors = require("cors")

const userRouter = require("./routes/userRoutes.js")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
    process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

app.use(userRouter)

app.listen(3000, () => {
    console.log("Server is running...")
})