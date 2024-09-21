const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require("dotenv");
const PORT = 5000

//Bringing Connecting DB function
const connectToMongo = require("./db");

dotenv.config();

const app = express();
//DB connection making
connectToMongo();

// using cors middleware
app.use(cors())

// const port = process.env.PORT;
const port = PORT;

// JSON parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/service"));
app.use("/", require("./routes/contact"))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
