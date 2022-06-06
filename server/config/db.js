const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/realtime_chat");
        console.log("Success Connection")

    } catch {
        console.log("DB Connection Error")
    }
};

module.exports = connectDB;