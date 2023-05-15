const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 12,
        required: true,
        trim: true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User