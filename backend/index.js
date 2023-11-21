const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' })

// Connecting DB
const connectToMongo = require('./db')

const app = express();
connectToMongo()
const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})