require("dotenv").config();

const express = require("express");
const cors = require("cors");

const contactRoute = require("./routes/contact");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoute);

module.exports = app;