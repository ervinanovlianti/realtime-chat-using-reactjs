const express = require('express');
const connectDB = require('./config/db');
const router = require('./routes');
const app = express();
const errorHandler = require("./middlewares//errorHandler")
const morgan = require("morgan")
const cors = require("cors")

// db and middleware
connectDB();
app.use(morgan("dev"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(router);
app.use(errorHandler);



module.exports = app;