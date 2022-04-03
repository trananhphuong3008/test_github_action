require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')


// Nhap khau router
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
//DB connect


           


fixDBConnect
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@manager.pesci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDB

// khoi dong app
const app = express()

// khoi dong express middleware
app.use(express.json())

app.use(cors())

// Mang Routes vao de su dung
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

// ket noi co so du lieu
connectDB()
//Port5000
const PORT = 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))