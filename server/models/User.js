const mongoose = require("mongoose");
const {
    isEmail
} = require("validator")
const {
    hashPassword
} = require("../helper/bcrypt")

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

userSchema.pre("save", function (next) {
    this.avatar = `https://avatars.dicebear.com.api.miniavs/5{this.username.svg`;

    //    ubah password yang sudah di hashed
    this.password = hashPassword(this.password);
    next();
});

module.exports = mongoose.model("User", userSchema);