// Import dotenv and configure its content
require("dotenv").config();

// Import express and cors
const express = require("express");
const cors = require("cors");

const app = express();

// Specify the port the server will listen to
const port = process.env.PORT || 5001;

// app.use is for middleware
app.use(cors());
app.use(express.json());

// Health check for API - see if server is working
app.use("/health", (req, res) => {
    res.status(200).json({message: "API is healthy"});
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});