const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' })

//Bringing Connecting DB function
const connectToMongo = require('./db')

const app = express();
//DB connection making
connectToMongo()

const port = process.env.PORT

// JSON parser
app.use(express.json())

// Routes
app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require("./routes/notes"))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})