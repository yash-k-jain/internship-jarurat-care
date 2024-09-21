const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require("dotenv");

const path = require("path");

//Bringing Connecting DB function
const connectToMongo = require("./db");

dotenv.config();

const app = express();
//DB connection making
connectToMongo();

// using cors middleware
app.use(cors())

// JSON parser
app.use(express.json());

// static folder
app.use(express.static(path.join(__dirname, "../build")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/service"));
app.use("/", require("./routes/contact"))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
