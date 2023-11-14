// Import dotenv and configure its content
require("dotenv").config();

// Connect to the database
require("./db/connection");

// Import express and cors
const express = require("express");
const cors = require("cors");

const app = express();

// Models
const User = require("./Users/model");

// Routes
const userRouter = require("./Users/routes");

// Specify the port the server will listen to
const port = process.env.PORT || 5001;

// app.use is for middleware
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

// Health check for API - see if server is working
app.use("/health", (req, res) => {
    res.status(200).json({message: "API is healthy"});
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});