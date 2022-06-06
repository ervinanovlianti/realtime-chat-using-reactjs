const mongoose = require("mongoose");

const {
    isEmail
} = require("validator")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, "Invalid Email"],
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    created_at: {
        type: Date,
        default: new Date().toString(),
    },
    updated_at: {
        type: Date,
        default: new Date().toString(),
    },
});

module.exports = mongoose.model("User", userSchema);