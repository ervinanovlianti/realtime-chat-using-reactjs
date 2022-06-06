const express = require('express');
const connectDB = require('./config/db');
const router = require('./routes');
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(router)


module.exports = app;